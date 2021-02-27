import { IWalletLanguage } from 'src/i18n';
import { translateByFieldSelector } from 'src/module/Configs/Configs.selector';
import { actionSetListMasterKey, actionUpdateMasterKey } from 'src/module/HDWallet/HDWallet.actions';
import { actionSetSignPublicKeyEncode } from 'src/module/Account/Account.actions';
import { Dispatch } from 'redux';
import { IRootState } from 'src/redux/interface';
import { MASTERLESS_WALLET_NAME } from 'src/configs/walletConfigs';
import { AccountInstance, WalletInstance } from 'incognito-js/build/web/browser';
import { updateWallet } from 'src/database/tables/wallet';
import { actionSetListAccount, actionSelectAccount, defaultAccountNameSelector } from 'src/module/Account';
import { IPreloadReducer } from 'src/module/Preload';
import { isMainnetSelector, preloadSelector } from 'src/module/Preload/Preload.selector';
import { actionChangePassword, actionCreatePassword } from 'src/module/Password/Password.actions';
import { passwordSelector } from 'src/module/Password/Password.selector';
import { batch } from 'react-redux';
import { actionFollowDefaultToken, actionResetFollowDefaultToken, IEnvToken, ITokenReducer } from 'src/module/Token';
import { tokenSelector } from 'src/module/Token/Token.selector';
import {
    ACTION_LOADED_WALLET,
    ACTION_UPDATE_WALLET,
    ACTION_INITED_MASTER_LESS,
    ACTION_TOGGLE_SWITCH_WALLET,
} from './Wallet.constant';
import { importWallet, initWallet, loadWallet } from './Wallet.utils';
import {
    isInitMasterlessSelector,
    walletDataSelector,
    walletIdSelector,
    walletSelector,
    isMasterlessSelector,
    switchingWalletSelector,
} from './Wallet.selector';
import { IWalletReducer } from './Wallet.interface';

export const actionSaveWallet = () => async (dispatch: Dispatch, getState: () => IRootState) => {
    const state = getState();
    const walletId = walletIdSelector(state);
    const wallet: WalletInstance = walletDataSelector(state);
    const pass = passwordSelector(state);
    await updateWallet(wallet, walletId, pass);
    await dispatch(actionSetListAccount(wallet.masterAccount.getAccounts()));
    return wallet;
};

export const actionLoadedWallet = (payload: { wallet: WalletInstance; mainnet: boolean; walletId: number }) => ({
    type: ACTION_LOADED_WALLET,
    payload,
});

export const actionUpdateWallet = (wallet: WalletInstance) => ({
    type: ACTION_UPDATE_WALLET,
    payload: wallet,
});

export const actionImportWallet = (walletName: string, mnemonic: string, pass: string) => async (
    dispatch: Dispatch,
    getState: () => IRootState,
) => {
    try {
        let walletId = -1;
        const state: IRootState = getState();
        const preload: IPreloadReducer = preloadSelector(state);
        const { mainnet } = preload.configs;
        const dataImport = await importWallet(walletName, mnemonic, pass);
        walletId = dataImport.walletId;
        const { wallet } = dataImport;
        const listAccount: AccountInstance[] = wallet.masterAccount.getAccounts();
        const defaultAccount: AccountInstance = listAccount && listAccount[0];
        batch(() => {
            dispatch(actionSetListAccount(listAccount));
            dispatch(actionSelectAccount(defaultAccount.name));
            dispatch(actionCreatePassword(''));
            dispatch(actionChangePassword(pass));
            dispatch(
                actionLoadedWallet({
                    wallet,
                    mainnet,
                    walletId,
                }),
            );
            dispatch(actionResetFollowDefaultToken(mainnet));
        });
        await actionSetListMasterKey()(dispatch, getState);
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
    const translate: IWalletLanguage = translateByFieldSelector(state)('wallet');
    const { error } = translate;
    if (!walletId) {
        throw new Error(error.walletIdNotFound);
    }
    const wallet = await loadWallet(walletId, pass);
    const listAccount: AccountInstance[] = [...wallet.masterAccount.getAccounts()];
    const isMasterless: boolean = isMasterlessSelector(state)(walletId);
    if (!isMasterless) {
        await wallet.sync();
    }
    const newList = wallet.masterAccount.getAccounts();
    const defaultAccount = wallet.masterAccount.getAccountByName(defaultAccountName) || listAccount[0];
    const signPublicKeyEncode = await defaultAccount.getSignPublicKey();
    if (defaultAccount) {
        batch(() => {
            dispatch(actionSetListAccount(newList));
            dispatch(actionSelectAccount(defaultAccount.name));
            dispatch(
                actionLoadedWallet({
                    wallet,
                    mainnet,
                    walletId,
                }),
            );
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

export const actionInitedMasterless = (payload: { mainnet: boolean; walletId: number }) => ({
    type: ACTION_INITED_MASTER_LESS,
    payload,
});

export const actionInitMasterless = () => async (dispatch: Dispatch, getState: () => IRootState) => {
    try {
        let walletId = -1;
        const state: IRootState = getState();
        const isInitMasterless = isInitMasterlessSelector(state);
        if (isInitMasterless) {
            return;
        }
        const mainnet = isMainnetSelector(state);
        const pass = passwordSelector(state);
        const dataInit = await initWallet(MASTERLESS_WALLET_NAME, pass);
        walletId = dataInit.walletId;
        const { wallet }: { wallet: WalletInstance } = dataInit;
        wallet.masterAccount.removeAccount('Anon');
        dispatch(
            actionInitedMasterless({
                mainnet,
                walletId,
            }),
        );
    } catch (error) {
        throw error;
    }
};

export const actionToggleSwitchWallet = (payload: boolean) => ({
    type: ACTION_TOGGLE_SWITCH_WALLET,
    payload,
});

export const actionSwitchWallet = (walletId: number) => async (dispatch: Dispatch, getState: () => IRootState) => {
    try {
        const state: IRootState = getState();
        const switchingWallet: boolean = switchingWalletSelector(state);
        const translate: IWalletLanguage = translateByFieldSelector(state)('wallet');
        const { error } = translate;
        if (!walletId) {
            throw new Error(error.walletIdNotFound);
        }
        if (switchingWallet) {
            return;
        }
        await dispatch(actionToggleSwitchWallet(true));
        const pass = passwordSelector(state);
        const wallet = await loadWallet(walletId, pass);
        const listAccount: AccountInstance[] = wallet.masterAccount.getAccounts();
        const defaultAccount: AccountInstance = listAccount && listAccount[0];
        const mainnet = isMainnetSelector(state);
        const isMasterless: boolean = isMasterlessSelector(state)(walletId);
        if (!isMasterless) {
            await wallet.sync();
        }
        batch(() => {
            dispatch(
                actionLoadedWallet({
                    wallet,
                    mainnet,
                    walletId,
                }),
            );
            dispatch(actionUpdateMasterKey({ walletId, wallet }));
            dispatch(actionSetListAccount(listAccount));
            dispatch(actionSelectAccount(defaultAccount.name));
        });
        return wallet;
    } catch (error) {
        throw error;
    } finally {
        await dispatch(actionToggleSwitchWallet(false));
    }
};
