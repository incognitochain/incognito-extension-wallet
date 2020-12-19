import { Dispatch } from 'redux';
import { IRootState } from 'src/redux/interface';
import { ILanguage } from 'src/i18n';
import { AccountInstance, PrivacyTokenInstance } from 'incognito-js/build/web/browser';
import { actionSaveWallet, IWalletReducer, walletSelector } from 'src/module/Wallet';
import {
    ACTION_FETCHED_PTOKEN_LIST,
    ACTION_FETCHED_PCUSTOMTOKEN_LIST,
    ACTION_GET_BALANCE_TOKEN_FETCHING,
    ACTION_GET_BALANCE_TOKEN_FETCHED,
    ACTION_FOLLOWED_POPULAR_TOKEN,
    ACTION_SET_FOLLOWED_TOKENS,
    ACTION_SET_SELECTED_TOKEN,
} from './Token.constant';
import { apiGetPTokenList, apiGetPCustomTokenList } from './Token.services';
import { IPToken } from './Token.interface';
import { translateSelector } from '../Configs';
import { defaultAccountSelector } from '../Account';
import { apiURLSelector, IPreloadReducer, preloadSelector } from '../Preload';
import {
    bridgeTokensSelector,
    chainTokensSelector,
    followedTokensIdsSelector,
    popularCoinIdsSeletor,
    tokenSelector,
} from './Token.selector';
import { IEnvToken, ITokenReducer } from './Token.reducer';

export const actionFetchedPTokenList = (payload: IPToken[]) => ({
    type: ACTION_FETCHED_PTOKEN_LIST,
    payload,
});

export const actionFetchPTokenList = () => async (dispatch: Dispatch, getState: () => IRootState) => {
    const state = getState();
    const apiURL = apiURLSelector(state);
    const pTokens = await apiGetPTokenList(apiURL);
    dispatch(actionFetchedPTokenList(pTokens));
};

export const actionFetchedPCustomTokenList = (payload: IPToken[]) => ({
    type: ACTION_FETCHED_PCUSTOMTOKEN_LIST,
    payload,
});

export const actionFetchPCustomTokenList = () => async (dispatch: Dispatch, getState: () => IRootState) => {
    const state = getState();
    const apiURL = apiURLSelector(state);
    const pCustomTokens = await apiGetPCustomTokenList(apiURL);
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
    let amount;
    if (!tokenId) {
        throw new Error(tokenTranslate.error.tokenIdRequired);
    }
    dispatch(actionGetBalanceTokenFetching({ tokenId }));
    const totalBalance = await token.getTotalBalance(tokenId);
    amount = totalBalance.toNumber();
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

export const actionSetFollowedTokens = (payload: { followed: string[] }) => ({
    type: ACTION_SET_FOLLOWED_TOKENS,
    payload,
});

export const actionFollowPopularToken = () => async (dispatch: Dispatch, getState: () => IRootState) => {
    const state: IRootState = getState();
    const preload: IPreloadReducer = preloadSelector(state);
    const tokenState: ITokenReducer = tokenSelector(state);
    const { mainnet } = preload.configs;
    const field = mainnet ? 'mainnet' : 'testnet';
    const envToken: IEnvToken = tokenState[field];
    const { followedPopularIds } = envToken;
    if (followedPopularIds) {
        return;
    }
    const defaultAccount: AccountInstance = defaultAccountSelector(state);
    const popularCoinIds = popularCoinIdsSeletor(state);
    Object.entries(popularCoinIds).map((coin) => {
        const [, tokenId] = coin;
        defaultAccount.followTokenById(tokenId);
        return coin;
    });
    dispatch(actionFollowedPopularTokenIds({ mainnet }));
    await actionSaveWallet()(dispatch, getState);
};

export const actionGetPrivacyTokensBalance = () => async (dispatch: Dispatch, getState: () => IRootState) => {
    const state: IRootState = getState();
    const followed = followedTokensIdsSelector(state)();
    const { loaded }: IWalletReducer = walletSelector(state);
    if (!followed || !loaded) {
        return;
    }
    const bridgeTokens = bridgeTokensSelector(state);
    const chainTokens = chainTokensSelector(state);
    const account: AccountInstance = defaultAccountSelector(state);
    followed.map(async (tokenId: string) => {
        const token = await account.getPrivacyTokenById(tokenId, bridgeTokens, chainTokens);
        return actionGetBalanceToken(token)(dispatch, getState);
    });
};

export const actionSetSelectedToken = (payload: string) => ({
    type: ACTION_SET_SELECTED_TOKEN,
    payload,
});
