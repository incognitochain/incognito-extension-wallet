import cloneDeep from 'lodash/cloneDeep';
import toLower from 'lodash/toLower';
import isEqual from 'lodash/isEqual';
import { listIdsWalletSelector } from 'src/module/Wallet';
import { IWalletLanguage, IHDWalletLanguage } from 'src/i18n';
import { translateByFieldSelector } from 'src/module/Configs/Configs.selector';
import { actionUpdateMasterKey, actionRemoveMasterKey } from 'src/module/HDWallet/HDWallet.actions';
import { actionToggleToast, TOAST_CONFIGS } from 'src/components/Core/Toast';
import { Dispatch } from 'redux';
import { IRootState } from 'src/redux/interface';
import { MASTERLESS_WALLET_NAME } from 'src/configs/walletConfigs';
import { AccountInstance, WalletInstance } from 'incognito-js/build/web/browser';
import { updateWallet, removeWallet } from 'src/database/tables/wallet';
import { actionSetListAccount, defaultAccountNameSelector, actionSwitchAccount } from 'src/module/Account';
import { isMainnetSelector } from 'src/module/Preload/Preload.selector';
import { passwordSelector } from 'src/module/Password/Password.selector';
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

export const actionHandleLoadWallet = (accountName?: string, defaultWalletId?: number) => async (
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
        if (!pass) {
            return;
        }
        const defaultAccountName: string = accountName || defaultAccountNameSelector(state);
        const mainnet: boolean = isMainnetSelector(state);
        const field = mainnet ? 'mainnet' : 'testnet';
        const { walletId: walletIdFormState } = walletState[field];
        walletId = defaultWalletId || walletIdFormState;
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
        if (walletId > -1 && typeof wallet !== 'undefined') {
            const isMasterless: boolean = isMasterlessSelector(state)(walletId);
            if (!isMasterless) {
                await wallet.sync();
            }
        }
        const newList: AccountInstance[] = [...wallet.masterAccount.getAccounts()];
        let defaultAccount: AccountInstance =
            wallet.masterAccount.getAccountByName(defaultAccountName) || listAccount[0];
        if (!defaultAccount) {
            defaultAccount = await wallet.masterAccount.addAccount('Anon');
        }
        await dispatch(
            actionLoadedWallet({
                wallet,
                mainnet,
                walletId,
            }),
        );
        await dispatch(actionSetListAccount(newList));
        await actionSwitchAccount(defaultAccount.name)(dispatch, getState);
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
        wallet = await loadWallet(walletId, pass);
        await dispatch(actionUpdateWallet(wallet));
        await dispatch(actionUpdateMasterKey({ wallet, walletId }));
    } catch (error) {
        throw error;
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
    let wallet: WalletInstance | undefined;
    try {
        const translate: IWalletLanguage = translateByFieldSelector(state)('wallet');
        const { error } = translate;
        if (!walletId) {
            throw new Error(error.walletIdNotFound);
        }
        await dispatch(actionToggleSwitchWallet(true));
        await actionHandleLoadWallet('', walletId)(dispatch, getState);
    } catch (error) {
        throw error;
    } finally {
        await dispatch(actionToggleSwitchWallet(false));
    }
    return wallet;
};

export const actionImportWallet = (
    walletName: string,
    mnemonic: string,
    pass: string,
    isImport = true,
    showToast?: boolean,
) => async (dispatch: Dispatch | any, getState: () => IRootState) => {
    try {
        let walletId = -1;
        const state: IRootState = getState();
        const mainnet: boolean = isMainnetSelector(state);
        const dataImport = await importWallet(walletName, mnemonic, pass);
        walletId = dataImport.walletId;
        let { wallet } = dataImport;
        const listAccount: AccountInstance[] = wallet.masterAccount.getAccounts();
        const defaultAccount: AccountInstance = listAccount && listAccount[0];
        const { success }: IHDWalletLanguage = translateByFieldSelector(state)('hdWallet');
        if (!defaultAccount) {
            wallet.masterAccount.addAccount('Anon');
        }
        await dispatch(actionResetFollowDefaultToken(mainnet));
        await dispatch(actionLoadedWallet({ wallet, walletId, mainnet }));
        await dispatch(actionHandleLoadWallet(defaultAccount.name, walletId));
        if (showToast) {
            dispatch(
                actionToggleToast({
                    toggle: true,
                    value: isImport ? success.import : success.create,
                    type: TOAST_CONFIGS.success,
                }),
            );
        }
        return walletId;
    } catch (error) {
        throw error;
    }
};

// create master key

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
                await actionHandleLoadWallet('', walletIdWillSwitch)(dispatch, getState);
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
