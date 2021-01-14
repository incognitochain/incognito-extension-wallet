import { BigNumber } from 'bignumber.js';
import { isMainnetSelector, apiURLSelector } from 'src/module/Preload/Preload.selector';
import { Dispatch } from 'redux';
import { IRootState } from 'src/redux/interface';
import { ILanguage } from 'src/i18n';
import { AccountInstance, PrivacyTokenInstance, WalletInstance } from 'incognito-js/build/web/browser';
import { actionSaveWallet, IWalletReducer, walletDataSelector, walletSelector } from 'src/module/Wallet';
import { defaultAccountSelector } from 'src/module/Account/Account.selector';
import { translateSelector } from 'src/module/Configs/Configs.selector';
import { cachePromise } from 'src/services';
import {
    ACTION_FETCHED_PTOKEN_LIST,
    ACTION_FETCHED_PCUSTOMTOKEN_LIST,
    ACTION_GET_BALANCE_TOKEN_FETCHING,
    ACTION_GET_BALANCE_TOKEN_FETCHED,
    ACTION_FOLLOWED_POPULAR_TOKEN,
    ACTION_SET_FOLLOWED_TOKENS,
    ACTION_SET_SELECTED_TOKEN,
    ACTION_RESET_FOLLOWED_POPULAR_TOKEN,
} from './Token.constant';
import { apiGetPTokenList, apiGetPCustomTokenList } from './Token.services';
import { IPToken, IFollowedToken, ISelectedPrivacy } from './Token.interface';
import {
    bridgeTokensSelector,
    chainTokensSelector,
    defaultTokensIdsSelector,
    followedTokensIdsSelector,
    getPrivacyDataByTokenIDSelector,
} from './Token.selector';

export const actionFetchedPTokenList = (payload: IPToken[]) => ({
    type: ACTION_FETCHED_PTOKEN_LIST,
    payload,
});

export const actionFetchPTokenList = (noCache = false) => async (dispatch: Dispatch, getState: () => IRootState) => {
    const state = getState();
    const apiURL = apiURLSelector(state);
    const pTokens = await apiGetPTokenList(apiURL, noCache);
    dispatch(actionFetchedPTokenList(pTokens));
};

export const actionFetchedPCustomTokenList = (payload: IPToken[]) => ({
    type: ACTION_FETCHED_PCUSTOMTOKEN_LIST,
    payload,
});

export const actionFetchPCustomTokenList = (noCache = false) => async (
    dispatch: Dispatch,
    getState: () => IRootState,
) => {
    const state = getState();
    const apiURL = apiURLSelector(state);
    const pCustomTokens = await apiGetPCustomTokenList(apiURL, noCache);
    dispatch(actionFetchedPCustomTokenList(pCustomTokens));
};

export const actionGetBalanceTokenFetching = (payload: { tokenId: string }) => ({
    type: ACTION_GET_BALANCE_TOKEN_FETCHING,
    payload,
});

export const actionGetBalanceTokenFetched = (payload: { tokenId: string; amount: number }) => ({
    type: ACTION_GET_BALANCE_TOKEN_FETCHED,
    payload,
});

export const actionGetBalanceToken = (token: PrivacyTokenInstance) => async (
    dispatch: Dispatch,
    getState: () => IRootState,
) => {
    const state: IRootState = getState();
    const translate: ILanguage = translateSelector(state);
    const tokenTranslate = translate.token;
    const tokenId = token?.tokenId;
    const account: AccountInstance = defaultAccountSelector(state);
    let amount;
    if (!tokenId) {
        throw new Error(tokenTranslate.error.tokenIdRequired);
    }
    dispatch(actionGetBalanceTokenFetching({ tokenId }));
    const totalBalance = await cachePromise(
        `token-balance-${tokenId}-${account.key.keySet.publicKeySerialized}`,
        () => token.getTotalBalance(tokenId),
        10000,
    );
    const amountStr = totalBalance || '0';
    amount = new BigNumber(amountStr).toNumber();
    dispatch(
        actionGetBalanceTokenFetched({
            tokenId,
            amount: amount || 0,
        }),
    );
    return amount;
};

export const actionFollowedPopularTokenIds = (payload: { mainnet: boolean }) => ({
    type: ACTION_FOLLOWED_POPULAR_TOKEN,
    payload,
});

export const actionSetFollowedTokens = (payload: { followed: IFollowedToken[] }) => ({
    type: ACTION_SET_FOLLOWED_TOKENS,
    payload,
});

export const actionFollowDefaultToken = (account: AccountInstance) => async (
    dispatch: Dispatch,
    getState: () => IRootState,
) => {
    try {
        if (!account) {
            return;
        }
        const state: IRootState = getState();
        const wallet: WalletInstance = walletDataSelector(state);
        const mainnet = isMainnetSelector(state);
        let defaultAccount = wallet.masterAccount.getAccountByName(account.name);
        const defaultTokens: string[] = defaultTokensIdsSelector(state);
        defaultTokens.map((tokenId) => defaultAccount.followTokenById(tokenId));
        dispatch(
            actionSetFollowedTokens({
                followed: defaultAccount.privacyTokenIds.map((t) => ({ tokenId: t, amount: 0 })),
            }),
        );
        dispatch(actionFollowedPopularTokenIds({ mainnet }));
    } catch (error) {
        throw error;
    }
};

export const actionResetFollowDefaultToken = (payload: boolean) => ({
    type: ACTION_RESET_FOLLOWED_POPULAR_TOKEN,
    payload,
});

export const actionGetPrivacyTokensBalance = (defaultAccount?: AccountInstance | undefined) => async (
    dispatch: Dispatch,
    getState: () => IRootState,
) => {
    const state: IRootState = getState();
    const followed = followedTokensIdsSelector(state)();
    const { loaded }: IWalletReducer = walletSelector(state);
    if (!followed || !loaded) {
        return;
    }
    const bridgeTokens = bridgeTokensSelector(state);
    const chainTokens = chainTokensSelector(state);
    const account: AccountInstance = defaultAccount || defaultAccountSelector(state);
    followed.map(async (tokenId: string) => {
        const token = await account.getPrivacyTokenById(tokenId, bridgeTokens, chainTokens);
        return actionGetBalanceToken(token)(dispatch, getState);
    });
};

export const actionSetSelectedToken = (payload: string) => ({
    type: ACTION_SET_SELECTED_TOKEN,
    payload,
});

export const actionGetBalanceByTokenId = (tokenId: string) => async (
    dispatch: Dispatch,
    getState: () => IRootState,
) => {
    try {
        if (!tokenId) {
            return;
        }
        const state = getState();
        const account: AccountInstance = defaultAccountSelector(state);
        const chainTokens = chainTokensSelector(state);
        const bridgeTokens = bridgeTokensSelector(state);
        const token = await account.getPrivacyTokenById(tokenId, bridgeTokens, chainTokens);
        actionGetBalanceToken(token)(dispatch, getState);
    } catch (error) {
        throw error;
    }
};

export const actionFollowTokenById = (tokenId: string) => async (dispatch: Dispatch, getState: () => IRootState) => {
    try {
        const state = getState();
        const account: AccountInstance = defaultAccountSelector(state);
        const token: ISelectedPrivacy = getPrivacyDataByTokenIDSelector(state)(tokenId);
        if (!token.isFollowed) {
            account.followTokenById(tokenId);
        }
    } catch (error) {
        throw error;
    } finally {
        actionSaveWallet()(dispatch, getState);
    }
};
