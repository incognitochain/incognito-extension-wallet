import { Dispatch } from 'redux';
import { IRootState } from 'src/redux/interface';
import {
  ACTION_FETCHED_PTOKEN_LIST,
  ACTION_FETCHED_PCUSTOMTOKEN_LIST,
  ACTION_GET_BALANCE_TOKEN_FETCHING,
  ACTION_GET_BALANCE_TOKEN_FETCHED,
  ACTION_FOLLOWED_POPULAR_TOKEN,
  ACTION_SET_FOLLOWED_TOKENS,
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
import { IPreloadReducer, preloadSelector } from '../Preload';
import {
  followedTokensIdsSelector,
  popularCoinIdsSeletor,
  tokenSelector,
} from './Token.selector';
import { IEnvToken, ITokenReducer } from './Token.reducer';
import { actionSaveWallet } from 'src/routes/Wallet';

export const actionFetchedPTokenList = (payload: IPToken[]) => ({
  type: ACTION_FETCHED_PTOKEN_LIST,
  payload,
});

export const actionFetchPTokenList = () => async (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  try {
    const pTokens = await apiGetPTokenList();
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
    const pCustomTokens = await apiGetPCustomTokenList();
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

export const actionFollowPopularToken = ({
  defaultAccount,
}: {
  defaultAccount: AccountInstance;
}) => async (dispatch: Dispatch, getState: () => IRootState) => {
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
    const popularCoinIds = popularCoinIdsSeletor(state);
    for (const [key, value] of Object.entries(popularCoinIds)) {
      console.log(`${key}: ${value}`);
    }
    Object.entries(popularCoinIds).map((coin) => {
      const [symbol, tokenId] = coin;
      defaultAccount.followTokenById(tokenId);
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
  const followed = followedTokensIdsSelector(state);
  if (!followed) {
    return;
  }
  try {
    const account: AccountInstance = defaultAccountSelector(state);
    const followed:
      | PrivacyTokenInstance[]
      | any = await account.getFollowingPrivacyToken('');
    followed.map((token: PrivacyTokenInstance) =>
      actionGetBalanceToken(token)(dispatch, getState)
    );
  } catch (error) {
    throw error;
  }
};
