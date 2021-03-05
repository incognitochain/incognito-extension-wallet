import cloneDeep from 'lodash/cloneDeep';
import toLower from 'lodash/toLower';
import isEqual from 'lodash/isEqual';
import { listIdsWalletSelector } from 'src/module/Wallet';
import { IWalletLanguage, IHDWalletLanguage } from 'src/i18n';
import { translateByFieldSelector } from 'src/module/Configs/Configs.selector';
import {
    actionSetListMasterKey,
    actionUpdateMasterKey,
    actionRemoveMasterKey,
} from 'src/module/HDWallet/HDWallet.actions';
import { actionToggleToast, TOAST_CONFIGS } from 'src/components/Core/Toast';
import { actionSetSignPublicKeyEncode } from 'src/module/Account/Account.actions';
import { Dispatch } from 'redux';
import { IRootState } from 'src/redux/interface';
import { MASTERLESS_WALLET_NAME } from 'src/configs/walletConfigs';
import { AccountInstance, WalletInstance } from 'incognito-js/build/web/browser';
import { updateWallet, removeWallet } from 'src/database/tables/wallet';
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
    ACTION_FETCHING_REMOVE_MASTER_KEY,
    ACTION_FETCHED_REMOVE_MASTER_KEY,
    ACTION_FETCH_FAIL_REMOVE_MASTER_KEY,
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

export const actionLoadedWallet = (payload: { wallet: WalletInstance | any; mainnet: boolean; walletId: number }) => ({
    type: ACTION_LOADED_WALLET,
    payload,
});

export const actionUpdateWallet = (wallet: WalletInstance) => ({
    type: ACTION_UPDATE_WALLET,
    payload: wallet,
});

export const actionImportWallet = (walletName: string, mnemonic: string, pass: string, isImport = true) => async (
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
        const { success }: IHDWalletLanguage = translateByFieldSelector(state)('hdWallet');
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
        dispatch(
            actionToggleToast({
                toggle: true,
                value: isImport ? success.import : success.create,
                type: TOAST_CONFIGS.success,
            }),
        );
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
    let wallet: WalletInstance | undefined;
    let walletId = -1;
    try {
        const walletState: IWalletReducer = walletSelector(state);
        const tokenState: ITokenReducer = tokenSelector(state);
        const pass: string = passwordSelector(state);
        const defaultAccountName: string = accountName || defaultAccountNameSelector(state);
        const mainnet: boolean = isMainnetSelector(state);
        const field = mainnet ? 'mainnet' : 'testnet';
        const { walletId: walletIdFormState } = walletState[field];
        walletId = walletIdFormState;
        const envToken: IEnvToken = tokenState[field];
        const { followedPopularIds } = envToken;
        const translate: IWalletLanguage = translateByFieldSelector(state)('wallet');
        const { error } = translate;
        if (!walletId) {
            throw new Error(error.walletIdNotFound);
        }
        wallet = await loadWallet(walletId, pass);
        if (!wallet) {
            throw new Error(error.canNotLoadWallet);
        }
        const listAccount: AccountInstance[] = [...wallet.masterAccount.getAccounts()];
        const newList: AccountInstance[] = wallet.masterAccount.getAccounts();
        const defaultAccount: AccountInstance =
            wallet.masterAccount.getAccountByName(defaultAccountName) || listAccount[0];
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
                dispatch(actionUpdateMasterKey({ wallet, walletId }));
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
    } catch (error) {
        throw error;
    } finally {
        if (walletId > -1 && typeof wallet !== 'undefined') {
            const isMasterless: boolean = isMasterlessSelector(state)(walletId);
            if (!isMasterless) {
                wallet.sync();
            }
        }
    }
    return wallet;
};

export const actionInitedMasterless = (payload: { mainnet: boolean; walletId: number }) => ({
    type: ACTION_INITED_MASTER_LESS,
    payload,
});

export const actionInitMasterless = () => async (dispatch: Dispatch, getState: () => IRootState) => {
    let walletId = -1;
    let wallet: WalletInstance | undefined;
    try {
        const state: IRootState = getState();
        const isInitMasterless = isInitMasterlessSelector(state);
        const walletIds = listIdsWalletSelector(state);
        const pass = passwordSelector(state);
        let loadListWallet = walletIds.map((walletId: number) => loadWallet(walletId, pass));
        const listWallet: any[] = await Promise.all([loadListWallet]);
        const findIndex: number = listWallet.findIndex((wallet: WalletInstance) =>
            isEqual(toLower(wallet.name), toLower(MASTERLESS_WALLET_NAME)),
        );
        if (isInitMasterless || findIndex > -1) {
            return;
        }
        const mainnet = isMainnetSelector(state);
        const dataInit = await initWallet(MASTERLESS_WALLET_NAME, pass);
        const { error }: IHDWalletLanguage = translateByFieldSelector(state)('hdWallet');
        walletId = dataInit.walletId;
        wallet = cloneDeep(dataInit.wallet);
        if (typeof wallet === 'undefined') {
            throw new Error(error.canNotCreateMasterKey);
        }
        dispatch(actionUpdateMasterKey({ walletId, wallet, isMasterless: true }));
        dispatch(
            actionLoadedWallet({
                wallet,
                mainnet,
                walletId,
            }),
        );
        dispatch(
            actionInitedMasterless({
                mainnet,
                walletId,
            }),
        );
    } catch (error) {
        throw error;
    }
    return walletId;
};

export const actionToggleSwitchWallet = (payload: boolean) => ({
    type: ACTION_TOGGLE_SWITCH_WALLET,
    payload,
});

export const actionSwitchWallet = (walletId: number) => async (dispatch: Dispatch, getState: () => IRootState) => {
    const state: IRootState = getState();
    const isMasterless: boolean = isMasterlessSelector(state)(walletId);
    let wallet: WalletInstance | undefined;
    try {
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
        wallet = await loadWallet(walletId, pass);
        const mainnet = isMainnetSelector(state);
        if (!wallet) {
            throw new Error(error.canNotSwitchWallet);
        }
        const accounts: AccountInstance[] = wallet.masterAccount.getAccounts();
        await Promise.all([
            dispatch(
                actionLoadedWallet({
                    wallet,
                    mainnet,
                    walletId,
                }),
            ),
            dispatch(actionUpdateMasterKey({ walletId, wallet })),
            accounts.length > 0 && dispatch(actionSetListAccount(accounts)),
        ]);
    } catch (error) {
        throw error;
    } finally {
        await dispatch(actionToggleSwitchWallet(false));
        if (!isMasterless && wallet) {
            wallet.sync();
        }
    }
    return wallet;
};

export const actionFetchingRemoveMasterKey = () => ({
    type: ACTION_FETCHING_REMOVE_MASTER_KEY,
});

export const actionFetchedRemoveMasterKey = (payload: {
    walletId: number;
    mainnet: boolean;
    walletIdWillSwitch: number;
    wallet: WalletInstance;
}) => ({
    type: ACTION_FETCHED_REMOVE_MASTER_KEY,
    payload,
});

export const actionFetchFailRemoveMasterKey = () => ({
    type: ACTION_FETCH_FAIL_REMOVE_MASTER_KEY,
});

export const actionFetchRemoveMasterKey = () => async (dispatch: Dispatch, getState: () => IRootState) => {
    try {
        const state = getState();
        const walletId: number = walletIdSelector(state);
        const listWalletIds: number[] = listIdsWalletSelector(state);
        if (listWalletIds.length === 1) {
            return;
        }
        const { error }: IWalletLanguage = translateByFieldSelector(state)('wallet');
        const { success }: IHDWalletLanguage = translateByFieldSelector(state)('hdWallet');
        if (!walletId) {
            throw new Error(error.walletIdNotFound);
        }
        await dispatch(actionFetchingRemoveMasterKey());
        const mainnet: boolean = isMainnetSelector(state);
        const walletIdWillSwitch: number | undefined = listWalletIds.find((id: number) => id !== walletId);
        if (walletIdWillSwitch) {
            const pass = passwordSelector(state);
            const wallet = await loadWallet(walletIdWillSwitch, pass);
            if (!wallet) {
                throw new Error(error.canNotLoadWallet);
            }
            let removed = await removeWallet(walletId);
            if (removed) {
                await dispatch(
                    actionFetchedRemoveMasterKey({
                        mainnet,
                        walletId,
                        wallet,
                        walletIdWillSwitch,
                    }),
                );
                await dispatch(actionRemoveMasterKey({ walletId }));
                dispatch(actionToggleToast({ type: TOAST_CONFIGS.success, value: success.remove, toggle: true }));
            } else {
                throw new Error(error.canNotRemoveWallet);
            }
        }
    } catch (error) {
        await dispatch(actionFetchFailRemoveMasterKey());
        throw error;
    }
};
