import {
  AccountInstance,
  PrivacyTokenInstance,
  TxHistoryModel,
} from 'incognito-js/build/web/browser';
import { Dispatch } from 'redux';
import { IRootState } from 'src/redux/interface';
import { defaultAccountSelector } from 'src/routes/Account';
import { ISelectedPrivacy } from '../../Token.interface';
import { selectedPrivacySelector } from '../../Token.selector';
import {
  ACTION_FETCHING_TX_HISTORIES,
  ACTION_FETCHED_TX_HISTORIES,
} from './History.constant';

export const actionFetchingTxHistories = () => ({
  type: ACTION_FETCHING_TX_HISTORIES,
});

export const actionFetchedTxHistories = (payload: {
  histories: TxHistoryModel[];
}) => ({
  type: ACTION_FETCHED_TX_HISTORIES,
  payload,
});

export const actionFetchHistory = () => async (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  let histories: any = [];
  const state = getState();
  const historyState = state.token.history;
  const account: AccountInstance = defaultAccountSelector(state);
  const selectedPrivacy: ISelectedPrivacy = selectedPrivacySelector(state);
  const { fetching } = historyState;
  if (fetching) {
    return;
  }
  try {
    dispatch(actionFetchingTxHistories());
    if (selectedPrivacy.isNativeToken) {
      histories = await account.nativeToken.getTxHistories();
      console.debug(histories);
    } else {
      const token:
        | PrivacyTokenInstance
        | any = await account.getFollowingPrivacyToken(
        selectedPrivacy?.tokenId
      );
      histories = [];
    }
  } catch (error) {
    throw error;
  } finally {
    dispatch(
      actionFetchedTxHistories({
        histories,
      })
    );
  }
};
