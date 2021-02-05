import { actionSetSignPublicKeyEncode } from 'src/module/Account/Account.actions';
import { Dispatch } from 'redux';
import { IRootState } from 'src/redux/interface';
import { MAINNET_WALLET_NAME, TESTNET_WALLET_NAME } from 'src/configs/walletConfigs';
import { AccountInstance, WalletInstance } from 'incognito-js/build/web/browser';
import { updateWallet } from 'src/database/tables/wallet';
import { actionSetListAccount, actionSelectAccount, defaultAccountNameSelector } from 'src/module/Account';
import { IPreloadReducer, preloadSelector } from 'src/module/Preload';
import { actionChangePassword, actionCreatePassword, passwordSelector } from 'src/module/Password';
import { batch } from 'react-redux';
import { actionFollowDefaultToken, actionResetFollowDefaultToken, IEnvToken, ITokenReducer } from 'src/module/Token';
import { tokenSelector } from 'src/module/Token/Token.selector';
import { ACTION_FETCHED, ACTION_LOAD_WALLET, ACTION_UPDATE_WALLET } from './Wallet.constant';
import { importWallet, initWallet, loadWallet } from './Wallet.utils';
import { walletDataSelector, walletIdSelector, walletSelector } from './Wallet.selector';
import { IDataInitWallet, IPayloadInitWallet, IWalletReducer } from './Wallet.interface';

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
            dispatch(actionCreatePassword(''));
            dispatch(actionChangePassword(pass));
            dispatch(actionFetched(payload));
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
        const signPublicKeyEncode = await defaultAccount.getSignPublicKey();
        batch(() => {
            dispatch(actionSetListAccount(listAccount));
            dispatch(actionSelectAccount(defaultAccount.name));
            dispatch(actionSetSignPublicKeyEncode(signPublicKeyEncode));
            dispatch(actionFetched(payload));
        });
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
    const tokenState: ITokenReducer = tokenSelector(state);
    const pass = passwordSelector(state);
    const defaultAccountName: string = accountName || defaultAccountNameSelector(state);
    const { mainnet } = preload.configs;
    const field = mainnet ? 'mainnet' : 'testnet';
    const { walletId } = walletState[field];
    const envToken: IEnvToken = tokenState[field];
    const { followedPopularIds } = envToken;
    if (!walletId) {
        throw new Error(`Can't not found wallet id`);
    }
    const wallet = await loadWallet(walletId, pass);
    const listAccount: AccountInstance[] = [...wallet.masterAccount.getAccounts()];
    await wallet.sync();
    const newList = wallet.masterAccount.getAccounts();
    const defaultAccount = wallet.masterAccount.getAccountByName(defaultAccountName) || listAccount[0];
    const signPublicKeyEncode = await defaultAccount.getSignPublicKey();
    if (defaultAccount) {
        batch(() => {
            dispatch(actionSetListAccount(newList));
            dispatch(actionSelectAccount(defaultAccount.name));
            dispatch(actionLoadWallet(wallet));
            dispatch(actionSetSignPublicKeyEncode(signPublicKeyEncode));
        });
        if (!followedPopularIds) {
            await actionFollowDefaultToken(defaultAccount)(dispatch, getState);
        }
        if (listAccount.length !== newList.length) {
            for (const account of newList) {
                if (!listAccount.includes(account)) {
                    // eslint-disable-next-line no-await-in-loop
                    await actionFollowDefaultToken(account)(dispatch, getState);
                }
            }
        }
    }
};

export const actionUpdateWallet = (wallet: WalletInstance) => ({
    type: ACTION_UPDATE_WALLET,
    payload: wallet,
});
