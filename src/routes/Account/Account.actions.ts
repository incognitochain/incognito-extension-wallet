import {
  AccountInstance,
  WalletInstance,
} from 'incognito-js/build/web/browser';
import { Dispatch } from 'redux';
import { IRootState } from 'src/redux/interface';
import { actionSaveWallet, walletDataSelector } from 'src/routes//Wallet';
import {
  ACTION_FETCHED,
  ACTION_FETCHING_CREATE_ACCOUNT,
  ACTION_FETCHED_CREATE_ACCOUNT,
  ACTION_FETCHED_IMPORT_ACCOUNT,
  ACTION_FETCHING_IMPORT_ACCOUNT,
  ACTION_SELECT_ACCOUNT,
  ACTION_SET_LIST_ACCOUNT,
} from './Account.constant';

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
