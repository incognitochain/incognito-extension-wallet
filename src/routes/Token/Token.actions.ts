import { Dispatch } from 'redux';
import { IRootState } from 'src/redux/interface';
import { ACTION_FETCHED, ACTION_FETCHED_PTOKEN_LIST } from './Token.constant';
import { apiGetPTokenList } from './Token.services';
import { IPToken } from './Token.interface';

export const actionFetched = (payload: object) => ({
  type: ACTION_FETCHED,
  payload,
});

export const actionFetchedPTokenList = (payload: IPToken[]) => ({
  type: ACTION_FETCHED_PTOKEN_LIST,
  payload,
});

export const actionFetchPTokenList = () => async (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  try {
    let pTokens: IPToken[] = await apiGetPTokenList();
    dispatch(actionFetchedPTokenList(pTokens));
  } catch (error) {
    throw error;
  }
};
