import { Dispatch } from 'redux';
import { IRootState } from 'src/redux/interface';
import { MAINNET_WALLET_NAME, TESTNET_WALLET_NAME } from 'src/configs/walletConfigs';
import { AccountInstance, WalletInstance } from 'incognito-js/build/web/browser';
import { updateWallet } from 'src/database/tables/wallet';
import { actionSetListAccount, actionSelectAccount, defaultAccountNameSelector } from 'src/module/Account';
import { apiURLSelector, IPreloadReducer, preloadSelector } from 'src/module/Preload';
import { actionChangePassword, actionCreatePassword, passwordSelector } from 'src/module/Password';
import { batch } from 'react-redux';
import { ACTION_FETCHED, ACTION_LOAD_WALLET, ACTION_UPDATE_WALLET } from './Wallet.constant';
import { importWallet, initWallet, loadWallet } from './Wallet.utils';
import { walletDataSelector, walletIdSelector, walletSelector } from './Wallet.selector';
import { IDataInitWallet, IPayloadInitWallet, IWalletReducer } from './Wallet.interface';
import { actionResetFollowDefaultToken } from '../Token';

export const actionSaveWallet = () => async (dispatch: Dispatch, getState: () => IRootState) => {
    const state = getState();
    const walletId = walletIdSelector(state);
    const wallet: WalletInstance = walletDataSelector(state);
    const pass = passwordSelector(state);
    await updateWallet(wallet, walletId, pass);
    await dispatch(actionSetListAccount(wallet.masterAccount.getAccounts()));
    return wallet;
};

export const actionFetched = (payload: IDataInitWallet) => ({
    type: ACTION_FETCHED,
    payload,
});

export const actionImportWallet = (walletName: string, mnemonic: string, pass: string) => async (
    dispatch: Dispatch,
    getState: () => IRootState,
) => {
    try {
        let walletId;
        const state: IRootState = getState();
        const preload: IPreloadReducer = preloadSelector(state);
        const { mainnet } = preload.configs;
        const dataImport = await importWallet(walletName, mnemonic, pass);
        walletId = dataImport.walletId;
        const { wallet } = dataImport;
        const payload: IPayloadInitWallet = {
            ...dataImport,
            mainnet,
        };
        const listAccount: AccountInstance[] = wallet.masterAccount.getAccounts();
        const defaultAccount: AccountInstance = listAccount && listAccount[0];

        batch(() => {
            dispatch(actionSetListAccount(listAccount));
            dispatch(actionSelectAccount(defaultAccount.name));
            dispatch(actionFetched(payload));
            dispatch(actionCreatePassword(''));
            dispatch(actionChangePassword(pass));
            dispatch(actionResetFollowDefaultToken(mainnet));
        });

        return walletId;
    } catch (error) {
        throw error;
    }
};

export const actionLoadWallet = (payload: WalletInstance) => ({
    type: ACTION_LOAD_WALLET,
    payload,
});

export const actionInitWallet = () => async (dispatch: Dispatch, getState: () => IRootState) => {
    try {
        let walletId;
        const state: IRootState = getState();
        const preload: IPreloadReducer = preloadSelector(state);
        const pass = passwordSelector(state);
        const { mainnet } = preload.configs;
        const dataInit = await initWallet(mainnet ? MAINNET_WALLET_NAME : TESTNET_WALLET_NAME, pass);
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

export const actionHandleLoadWallet = (accountName?: string) => async (
    dispatch: Dispatch,
    getState: () => IRootState,
) => {
    const state: IRootState = getState();
    const preload: IPreloadReducer = preloadSelector(state);
    const walletState: IWalletReducer = walletSelector(state);
    const apiUrl = apiURLSelector(state);
    const pass = passwordSelector(state);
    const defaultAccountName: string = accountName || defaultAccountNameSelector(state);
    const { mainnet } = preload.configs;
    const field = mainnet ? 'mainnet' : 'testnet';
    const { walletId } = walletState[field];
    if (!walletId) {
        throw new Error(`Can't not found wallet id`);
    }

    const wallet = await loadWallet(walletId, pass);
    const listAccount: AccountInstance[] = wallet.masterAccount.getAccounts();

    // const serverAccounts = await apiGetWalletAccounts(apiUrl, wallet);
    // const accountIds: number[] = [];
    //
    // for (const account of wallet.masterAccount.getAccounts()) {
    //     accountIds.push(account.getIndex());
    // }
    //
    // const newAccounts = serverAccounts.filter(
    //     (item: any) => !accountIds.includes(item.id) && !(wallet.masterAccount.deletedIndexes || []).includes(item.id),
    // );
    //
    // if (newAccounts.length > 0) {
    //     const newCreatedAccounts = [];
    //     for (const account of newAccounts) {
    //         try {
    //             // eslint-disable-next-line no-await-in-loop
    //             const newAccount = await wallet.masterAccount.addAccount(account.name, undefined, account.id);
    //             newCreatedAccounts.push(newAccount);
    //
    //             // eslint-disable-next-line no-await-in-loop
    //             await actionFollowDefaultToken(newAccount)(dispatch, getState);
    //         } catch {
    //             //
    //         }
    //     }
    //     actionSaveWallet()(dispatch, getState);
    // }

    const defaultAccount = wallet.masterAccount.getAccountByName(defaultAccountName) || listAccount[0];
    if (defaultAccount) {
        batch(() => {
            dispatch(actionSetListAccount(listAccount));
            dispatch(actionSelectAccount(defaultAccount.name));
            dispatch(actionLoadWallet(wallet));
        });
    }
};

export const actionUpdateWallet = (wallet: WalletInstance) => ({
    type: ACTION_UPDATE_WALLET,
    payload: wallet,
});
