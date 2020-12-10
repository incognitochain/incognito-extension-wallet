import {
  AccountInstance,
  WalletInstance,
} from 'incognito-js/build/web/browser';
import { isEqual } from 'lodash';
import { Dispatch } from 'redux';
import { ILanguage } from 'src/i18n';
import { IRootState } from 'src/redux/interface';
import { actionSaveWallet, walletDataSelector } from 'src/routes//Wallet';
import { translateSelector } from '../Configs';
import {
  ACTION_FETCHED,
  ACTION_FETCHING_CREATE_ACCOUNT,
  ACTION_FETCHED_CREATE_ACCOUNT,
  ACTION_FETCHED_IMPORT_ACCOUNT,
  ACTION_FETCHING_IMPORT_ACCOUNT,
  ACTION_SELECT_ACCOUNT,
  ACTION_SET_LIST_ACCOUNT,
  ACTION_SWITCH_ACCOUNT_FETCHING,
  ACTION_SWITCH_ACCOUNT_FETCHED,
  ACTION_GET_ACCOUNT_BALANCE_FETCHING,
  ACTION_GET_ACCOUNT_BALANCE_FETCHED,
} from './Account.constant';
import {
  defaultAccountNameSelector,
  defaultAccountSelector,
} from './Account.selector';

export const actionFetched = (payload: object) => ({
  type: ACTION_FETCHED,
  payload,
});

export const actionFetchingCreateAccount = () => ({
  type: ACTION_FETCHING_CREATE_ACCOUNT,
});

export const actionFetchedCreateAccount = (payload: AccountInstance) => ({
  type: ACTION_FETCHED_CREATE_ACCOUNT,
  payload,
});

export const actionFetchCreateAccount = (accountName: string) => async (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  try {
    const state = getState();
    const wallet: WalletInstance = walletDataSelector(state);
    await dispatch(actionFetchingCreateAccount());
    const account = await wallet.masterAccount.addAccount(accountName);
    if (!account) {
      throw new Error(`Can't not create account`);
    }
    await dispatch(actionFetchedCreateAccount(account));
  } catch (error) {
    throw error;
  } finally {
    actionSaveWallet()(dispatch, getState);
  }
};

export const actionFetchingImportAccount = () => ({
  type: ACTION_FETCHING_IMPORT_ACCOUNT,
});

export const actionFetchedImportAccount = (payload: AccountInstance) => ({
  type: ACTION_FETCHED_IMPORT_ACCOUNT,
  payload,
});

export const actionFetchImportAccount = (
  accountName: string,
  privateKey: string
) => async (dispatch: Dispatch, getState: () => IRootState) => {
  try {
    const state = getState();
    const wallet: WalletInstance = walletDataSelector(state);
    await dispatch(actionFetchingImportAccount());
    const account = await wallet.masterAccount.importAccount(
      accountName,
      privateKey
    );
    if (!account) {
      throw new Error(`Can't not create account`);
    }
    await dispatch(actionFetchedImportAccount(account));
  } catch (error) {
    throw error;
  } finally {
    actionSaveWallet()(dispatch, getState);
  }
};

export const actionFetchRemoveAccount = (accountName: string) => async (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  try {
    const state = getState();
    const wallet: WalletInstance = walletDataSelector(state);
    await wallet.masterAccount.removeAccount(accountName);
  } catch (error) {
    throw error;
  } finally {
    actionSaveWallet()(dispatch, getState);
  }
};

export const actionSelectAccount = (payload: string) => ({
  type: ACTION_SELECT_ACCOUNT,
  payload,
});

export const actionFetchSelectAccount = (accountName: string) => async (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  try {
    dispatch(actionSelectAccount(accountName));
  } catch (error) {
    throw error;
  }
};

export const actionSetListAccount = (payload: AccountInstance[]) => ({
  type: ACTION_SET_LIST_ACCOUNT,
  payload,
});

export const actionSwitchAccountFetching = () => ({
  type: ACTION_SWITCH_ACCOUNT_FETCHING,
});

export const actionSwitchAccountFetched = () => ({
  type: ACTION_SWITCH_ACCOUNT_FETCHED,
});

export const actionSwitchAccount = (
  accountName: string,
  shouldLoadBalance?: boolean
) => async (dispatch: Dispatch, getState: () => IRootState) => {
  const state = getState();
  const wallet: WalletInstance = walletDataSelector(state);
  const defaultAccountName = defaultAccountNameSelector(state);
  const account: AccountInstance = wallet.masterAccount.getAccountByName(
    accountName
  );
  try {
    if (isEqual(account?.name, defaultAccountName)) {
      return account;
    }
    await dispatch(actionSwitchAccountFetching());
    if (!account) {
      throw new Error(`Account not found!`);
    }
    await dispatch(actionSelectAccount(account.name));
    // dispatch(actionReloadFollowingToken(shouldLoadBalance));
  } catch (error) {
    throw error;
  } finally {
    dispatch(actionSwitchAccountFetched());
  }
  return account;
};

export const actionGetAccountBalanceFetching = (payload: {
  accountName: string;
}) => ({
  type: ACTION_GET_ACCOUNT_BALANCE_FETCHING,
  payload,
});

export const actionGetAccountBalanceFetched = (payload: {
  accountName: string;
  amount: number;
}) => ({
  type: ACTION_GET_ACCOUNT_BALANCE_FETCHED,
  payload,
});

export const actionGetAccountBalance = () => async (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  const state: IRootState = getState();
  const translate: ILanguage = translateSelector(state);
  const accountTranslate = translate.account;
  const account: AccountInstance = defaultAccountSelector(state);
  let accountBalance = 0;
  try {
    if (!account) {
      throw new Error(accountTranslate.error.accountNotExisted);
    }
    dispatch(
      actionGetAccountBalanceFetching({
        accountName: account.name,
      })
    );
    accountBalance = await (
      await account.nativeToken.getTotalBalance()
    ).toNumber();
  } catch (error) {
    throw error;
  } finally {
    dispatch(
      actionGetAccountBalanceFetched({
        accountName: account.name,
        amount: accountBalance,
      })
    );
  }
};
