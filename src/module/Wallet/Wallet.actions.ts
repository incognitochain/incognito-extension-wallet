import { Dispatch } from 'redux';
import { IRootState } from 'src/redux/interface';
import { MAINNET_WALLET_NAME, TESTNET_WALLET_NAME } from 'src/configs/walletConfigs';
import { AccountInstance, WalletInstance } from 'incognito-js/build/web/browser';
import { updateWallet } from 'src/database/tables/wallet';
import { actionSetListAccount, actionSelectAccount, defaultAccountNameSelector } from 'src/module/Account';
import { IPreloadReducer, preloadSelector } from 'src/module/Preload';
import { ACTION_FETCHED, ACTION_LOAD_WALLET } from './Wallet.constant';
import { initWallet, loadWallet } from './Wallet.utils';
import { walletDataSelector, walletIdSelector, walletSelector } from './Wallet.selector';
import { IDataInitWallet, IPayloadInitWallet, IWalletReducer } from './Wallet.interface';

export const actionFetched = (payload: IDataInitWallet) => ({
    type: ACTION_FETCHED,
    payload,
});

export const actionLoadWallet = (payload: WalletInstance) => ({
    type: ACTION_LOAD_WALLET,
    payload,
});

export const actionInitWallet = () => async (dispatch: Dispatch, getState: () => IRootState) => {
    try {
        let walletId;
        const state: IRootState = getState();
        const preload: IPreloadReducer = preloadSelector(state);
        const { mainnet } = preload.configs;
        const dataInit = await initWallet(mainnet ? MAINNET_WALLET_NAME : TESTNET_WALLET_NAME);
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
        return walletId;
    } catch (error) {
        throw error;
    }
};

export const actionHandleLoadWallet = () => async (dispatch: Dispatch, getState: () => IRootState) => {
    const state: IRootState = getState();
    const preload: IPreloadReducer = preloadSelector(state);
    const walletState: IWalletReducer = walletSelector(state);
    const defaultAccountName: string = defaultAccountNameSelector(state);
    const { mainnet } = preload.configs;
    const field = mainnet ? 'mainnet' : 'testnet';
    const { walletId } = walletState[field];
    if (!walletId) {
        throw new Error(`Can't not found wallet id`);
    }
    const wallet = await loadWallet(walletId);
    const listAccount: AccountInstance[] = wallet.masterAccount.getAccounts();
    const defaultAccount = wallet.masterAccount.getAccountByName(defaultAccountName) || listAccount[0];
    if (defaultAccount) {
        dispatch(actionSetListAccount(listAccount));
        dispatch(actionSelectAccount(defaultAccount.name));
        dispatch(actionLoadWallet(wallet));
    }
};

export const actionSaveWallet = () => async (dispatch: Dispatch, getState: () => IRootState) => {
    const state = getState();
    const walletId = walletIdSelector(state);
    const wallet: WalletInstance = walletDataSelector(state);
    await updateWallet(wallet, walletId);
    await dispatch(actionSetListAccount(wallet.masterAccount.getAccounts()));
    return wallet;
};
