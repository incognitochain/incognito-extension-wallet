import { Dispatch } from 'redux';
import { IRootState } from 'src/redux/interface';
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
import { ILanguage } from 'src/i18n';
import { translateSelector } from '../Configs';
import { defaultAccountSelector } from '../Account';
import {
  AccountInstance,
  PrivacyTokenInstance,
} from 'incognito-js/build/web/browser';
import { apiURLSelector, IPreloadReducer, preloadSelector } from '../Preload';
import {
  bridgeTokensSelector,
  chainTokensSelector,
  followedTokensIdsSelector,
  popularCoinIdsSeletor,
  tokenSelector,
} from './Token.selector';
import { IEnvToken, ITokenReducer } from './Token.reducer';
import { actionSaveWallet } from 'src/module/Wallet';

export const actionFetchedPTokenList = (payload: IPToken[]) => ({
  type: ACTION_FETCHED_PTOKEN_LIST,
  payload,
});

export const actionFetchPTokenList = () => async (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  try {
    const state = getState();
    const apiURL = apiURLSelector(state);
    const pTokens = await apiGetPTokenList(apiURL);
    dispatch(actionFetchedPTokenList(pTokens));
  } catch (error) {
    throw error;
  }
};

export const actionFetchedPCustomTokenList = (payload: IPToken[]) => ({
  type: ACTION_FETCHED_PCUSTOMTOKEN_LIST,
  payload,
});

export const actionFetchPCustomTokenList = () => async (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  try {
    const state = getState();
    const apiURL = apiURLSelector(state);
    const pCustomTokens = await apiGetPCustomTokenList(apiURL);
    dispatch(actionFetchedPCustomTokenList(pCustomTokens));
  } catch (error) {
    throw error;
  }
};

export const actionGetBalanceTokenFetching = (payload: {
  tokenId: string;
}) => ({
  type: ACTION_GET_BALANCE_TOKEN_FETCHING,
  payload,
});

export const actionGetBalanceTokenFetched = (payload: {
  tokenId: string;
  amount: number;
}) => ({
  type: ACTION_GET_BALANCE_TOKEN_FETCHED,
  payload,
});

export const actionGetBalanceToken = (token: PrivacyTokenInstance) => async (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  const state: IRootState = getState();
  const translate: ILanguage = translateSelector(state);
  const tokenTranslate = translate.token;
  const tokenId = token?.tokenId;
  let amount;
  if (!tokenId) {
    throw new Error(tokenTranslate.error.tokenIdRequired);
  }
  try {
    dispatch(actionGetBalanceTokenFetching({ tokenId }));
    const totalBalance = await token.getTotalBalance(tokenId);
    amount = totalBalance.toNumber();
  } catch (e) {
    throw e;
  } finally {
    dispatch(
      actionGetBalanceTokenFetched({
        tokenId,
        amount: amount || 0,
      })
    );
  }
  return amount;
};

export const actionFollowedPopularTokenIds = (payload: {
  mainnet: boolean;
}) => ({
  type: ACTION_FOLLOWED_POPULAR_TOKEN,
  payload,
});

export const actionSetFollowedTokens = (payload: { followed: string[] }) => ({
  type: ACTION_SET_FOLLOWED_TOKENS,
  payload,
});

export const actionFollowPopularToken = () => async (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  const state: IRootState = getState();
  const preload: IPreloadReducer = preloadSelector(state);
  const tokenState: ITokenReducer = tokenSelector(state);
  const { mainnet } = preload.configs;
  try {
    const field = mainnet ? 'mainnet' : 'testnet';
    const envToken: IEnvToken = tokenState[field];
    const { followedPopularIds } = envToken;
    if (followedPopularIds) {
      return;
    }
    const defaultAccount: AccountInstance = defaultAccountSelector(state);
    const popularCoinIds = popularCoinIdsSeletor(state);
    for (const [key, value] of Object.entries(popularCoinIds)) {
      console.log(`${key}: ${value}`);
    }
    Object.entries(popularCoinIds).map((coin) => {
      const [symbol, tokenId] = coin;
      defaultAccount.followTokenById(tokenId);
      return coin;
    });
    dispatch(actionFollowedPopularTokenIds({ mainnet }));
    await actionSaveWallet()(dispatch, getState);
  } catch (error) {
    throw error;
  }
};

export const actionGetPrivacyTokensBalance = () => async (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  const state: IRootState = getState();
  const followed = followedTokensIdsSelector(state)();
  if (!followed) {
    return;
  }
  const bridgeTokens = bridgeTokensSelector(state);
  const chainTokens = chainTokensSelector(state);
  try {
    const account: AccountInstance = defaultAccountSelector(state);
    followed.map(async (tokenId: string) => {
      const token = await account.getPrivacyTokenById(
        tokenId,
        bridgeTokens,
        chainTokens
      );
      return actionGetBalanceToken(token)(dispatch, getState);
    });
  } catch (error) {
    throw error;
  }
};

export const actionSetSelectedToken = (payload: string) => ({
  type: ACTION_SET_SELECTED_TOKEN,
  payload,
});
