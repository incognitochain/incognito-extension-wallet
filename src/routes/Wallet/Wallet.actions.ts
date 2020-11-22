import { Dispatch } from 'redux';
import { IRootState } from 'src/redux/interface';
import { ACTION_FETCHED, ACTION_LOAD_WALLET } from './Wallet.constant';
import { IPreloadReducer, preloadSelector } from '../Preload';
import {
  MAINNET_WALLET_NAME,
  TESTNET_WALLET_NAME,
} from 'src/configs/walletConfigs';
import { initWallet, loadWallet } from './Wallet.utils';
import {
  AccountInstance,
  WalletInstance,
} from 'incognito-js/build/web/browser';
import { IWalletReducer } from './Wallet.reducer';
import {
  walletDataSelector,
  walletIdSelector,
  walletSelector,
} from './Wallet.selector';
import { updateWallet } from 'src/database/tables/wallet';
import {
  accountSelector,
  actionSetListAccount,
  actionSelectAccount,
  IAccountReducer,
} from 'src/routes/Account';
import { COINS } from 'src/constants';
import {
  actionFollowedPopularTokenIds,
  actionFollowPopularToken,
  findPTokenBySymbolSelector,
} from '../Token';

export interface IDataInitWallet {
  wallet: WalletInstance;
  walletId: number;
}

export interface IPayloadInitWallet extends IDataInitWallet {
  mainnet: boolean;
}

export const actionFetched = (payload: IDataInitWallet) => ({
  type: ACTION_FETCHED,
  payload,
});

export const actionLoadWallet = (payload: WalletInstance) => ({
  type: ACTION_LOAD_WALLET,
  payload,
});

export const actionInitWallet = () => async (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  let walletId;
  try {
    const state: IRootState = getState();
    const preload: IPreloadReducer = preloadSelector(state);
    const { mainnet } = preload.configs;
    let dataInit = await initWallet(
      mainnet ? MAINNET_WALLET_NAME : TESTNET_WALLET_NAME
    );
    walletId = dataInit.walletId;
    const { wallet } = dataInit;
    const payload: IPayloadInitWallet = {
      ...dataInit,
      mainnet,
    };
    const listAccount: AccountInstance[] = wallet.masterAccount.getAccounts();
    const defaultAccount: AccountInstance = listAccount && listAccount[0];
    dispatch(actionSetListAccount(listAccount));
    dispatch(actionSelectAccount(defaultAccount.name));
    dispatch(actionFetched(payload));
  } catch (error) {
    console.debug(error);
  }
  return walletId;
};

export const actionHandleLoadWallet = () => async (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  try {
    const state: IRootState = getState();
    const preload: IPreloadReducer = preloadSelector(state);
    const walletState: IWalletReducer = walletSelector(state);
    const accountState: IAccountReducer = accountSelector(state);
    const { defaultAccountName, list } = accountState;
    const { mainnet } = preload.configs;
    const field = mainnet ? 'mainnet' : 'testnet';
    let walletId = walletState[field].walletId;
    if (!walletId) {
      throw new Error(`Can't not found wallet id`);
    }
    const wallet = await loadWallet(walletId);
    let defaultAccount = wallet.masterAccount.getAccountByName(
      defaultAccountName
    );
    if (!defaultAccount) {
      defaultAccount = list[0];
    }
    dispatch(actionLoadWallet(wallet));
    dispatch(actionSelectAccount(defaultAccount.name));
    dispatch(actionSetListAccount(wallet.masterAccount.getAccounts()));
  } catch (error) {
    throw error;
  }
};

export const actionSaveWallet = () => async (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  const state = getState();
  const walletId = walletIdSelector(state);
  const wallet: WalletInstance = walletDataSelector(state);
  try {
    await updateWallet(wallet, walletId);
  } catch (error) {
    throw error;
  }
  await dispatch(actionSetListAccount(wallet.masterAccount.getAccounts()));
  return wallet;
};
