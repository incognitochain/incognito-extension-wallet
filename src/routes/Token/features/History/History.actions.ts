import {
  AccountInstance,
  TxHistoryModel,
} from 'incognito-js/build/web/browser';
import { Dispatch } from 'redux';
import { IRootState } from 'src/redux/interface';
import { defaultAccountSelector } from 'src/routes/Account';
import {
  bridgeTokensSelector,
  selectedPrivacySelector,
  ISelectedPrivacy,
  chainTokensSelector,
} from 'src/routes/Token';
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
  const brideTokens = bridgeTokensSelector(state);
  const chainTokens = chainTokensSelector(state);
  const { fetching } = historyState;
  if (fetching || !selectedPrivacy?.tokenId) {
    return;
  }
  try {
    dispatch(actionFetchingTxHistories());
    if (selectedPrivacy.isNativeToken) {
      histories = await account.nativeToken.getTxHistories();
    }
    if (selectedPrivacy.isPrivacyToken) {
      const token = await account.getPrivacyTokenById(
        selectedPrivacy?.tokenId,
        brideTokens,
        chainTokens
      );
      histories = await token.getTxHistories();
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
