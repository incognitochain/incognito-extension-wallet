import { BigNumber } from 'bignumber.js';
import { batch } from 'react-redux';
import toLower from 'lodash/toLower';
import { isMainnetSelector } from 'src/module/Preload/Preload.selector';
import { AccountInstance, WalletInstance } from 'incognito-js/build/web/browser';
import isEqual from 'lodash/isEqual';
import { Dispatch } from 'redux';
import { IRootState } from 'src/redux/interface';
import {
    IWalletReducer,
    loadWallet,
    actionLoadedWallet,
    actionSaveWallet,
    walletDataSelector,
    walletSelector,
    isMasterlessSelector,
    actionSwitchWallet,
} from 'src/module/Wallet';
import { actionFollowDefaultToken, actionGetPrivacyTokensBalance } from 'src/module/Token/Token.actions';
import { cachePromise } from 'src/services';
import { passwordSelector } from 'src/module/Password/Password.selector';
import { IAccountLanguage, IHDWalletLanguage } from 'src/i18n/interface';
import { actionToggleToast, TOAST_CONFIGS } from 'src/components/Core/Toast';
import { actionUpdateMasterKey } from 'src/module/HDWallet/HDWallet.actions';
import { translateByFieldSelector } from 'src/module/Configs/Configs.selector';
import { actionFreeHistory } from 'src/module/History/History.actions';
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
    ACTION_SET_SIGN_PUBLIC_KEY_ENCODE,
    ACTION_FETCH_FAIL_IMPORT_ACCOUNT,
    ACTION_FETCH_FAIL_CREATE_ACCOUNT,
    ACTION_FETCHING_REMOVE_ACCOUNT,
    ACTION_FETCHED_REMOVE_ACCOUNT,
    ACTION_FETCH_FAIL_REMOVE_ACCOUNT,
} from './Account.constant';
import {
    defaultAccountSelector,
    createAccountSelector,
    importAccountSelector,
    removeAccountSelector,
    isAccountSelectedSelector,
} from './Account.selector';

export const actionSetSignPublicKeyEncode = (payload: string) => ({ type: ACTION_SET_SIGN_PUBLIC_KEY_ENCODE, payload });

export const actionFetched = (payload: any) => ({
    type: ACTION_FETCHED,
    payload,
});

export const actionSelectAccount = (payload: string) => ({
    type: ACTION_SELECT_ACCOUNT,
    payload,
});

export const actionSetListAccount = (payload: AccountInstance[]) => ({
    type: ACTION_SET_LIST_ACCOUNT,
    payload,
});

// get account balance

export const actionGetAccountBalanceFetching = (payload: { accountName: string }) => ({
    type: ACTION_GET_ACCOUNT_BALANCE_FETCHING,
    payload,
});

export const actionGetAccountBalanceFetched = (payload: { accountName: string; amount: number }) => ({
    type: ACTION_GET_ACCOUNT_BALANCE_FETCHED,
    payload,
});

export const actionGetAccountBalance = (defaultAccount?: AccountInstance | undefined) => async (
    dispatch: Dispatch,
    getState: () => IRootState,
) => {
    const state: IRootState = getState();
    const account: AccountInstance = defaultAccount || defaultAccountSelector(state);
    const { loaded }: IWalletReducer = walletSelector(state);
    if (!account || !loaded) {
        return;
    }
    let accountBalance = 0;
    try {
        await dispatch(
            actionGetAccountBalanceFetching({
                accountName: account.name,
            }),
        );
        const accountBalanceStr = await cachePromise(
            `account-balance-${account.key.keySet.publicKeySerialized}`,
            async () => account?.nativeToken?.getTotalBalance(),
            30000,
        );
        accountBalance = new BigNumber(accountBalanceStr || '0').toNumber();
    } catch (error) {
        throw error;
    } finally {
        dispatch(
            actionGetAccountBalanceFetched({
                accountName: account.name,
                amount: accountBalance,
            }),
        );
    }
};

// switch account

export const actionSwitchAccountFetching = () => ({
    type: ACTION_SWITCH_ACCOUNT_FETCHING,
});

export const actionSwitchAccountFetched = () => ({
    type: ACTION_SWITCH_ACCOUNT_FETCHED,
});

export const actionSwitchAccount = (accountName: string) => async (dispatch: Dispatch, getState: () => IRootState) => {
    const state = getState();
    const wallet: WalletInstance = walletDataSelector(state);
    const account: AccountInstance = wallet.masterAccount.getAccountByName(accountName);
    const translate: IAccountLanguage = translateByFieldSelector(state)('account');
    const { error } = translate;
    try {
        if (!account) {
            throw new Error(error.keychainNotExisted);
        }
        await dispatch(actionSwitchAccountFetching());
        await dispatch(actionSelectAccount(account.name));
        const signPublicKeyEncode = await account.getSignPublicKey();
        batch(() => {
            dispatch(actionSetSignPublicKeyEncode(signPublicKeyEncode));
            actionGetAccountBalance(account)(dispatch, getState);
            actionGetPrivacyTokensBalance(account)(dispatch, getState);
            dispatch(actionFreeHistory());
        });
    } catch (error) {
        throw error;
    } finally {
        await dispatch(actionSwitchAccountFetched());
    }
    return account;
};

export const actionHandleSwitchAccount = (account: AccountInstance, walletId: number) => async (
    dispatch: Dispatch | any,
    getState: () => IRootState,
) => {
    try {
        if (!account || !walletId) {
            return;
        }
        const state = getState();
        const isSelected = isAccountSelectedSelector(state)(account);
        if (isSelected) {
            return;
        }
        await dispatch(actionSwitchWallet(walletId));
        await dispatch(actionSwitchAccount(account.name));
    } catch (error) {
        throw error;
    }
};

// create account

export const actionFetchingCreateAccount = () => ({
    type: ACTION_FETCHING_CREATE_ACCOUNT,
});

export const actionFetchedCreateAccount = (payload: AccountInstance) => ({
    type: ACTION_FETCHED_CREATE_ACCOUNT,
    payload,
});

export const actionFetchFailCreateAccount = () => ({
    type: ACTION_FETCH_FAIL_CREATE_ACCOUNT,
});

export const actionFetchCreateAccount = (accountName: string, walletId: number) => async (
    dispatch: Dispatch,
    getState: () => IRootState,
) => {
    try {
        const state = getState();
        const pass: string = passwordSelector(state);
        let wallet: WalletInstance | undefined = await loadWallet(walletId, pass);
        const create: boolean = createAccountSelector(state);
        const translate: IAccountLanguage = translateByFieldSelector(state)('account');
        const { error: errorHDWallet }: IHDWalletLanguage = translateByFieldSelector(state)('hdWallet');
        const { error, success } = translate;
        if (create || !accountName || !walletId || !pass) {
            return;
        }
        if (!wallet) {
            throw new Error(errorHDWallet.canNotFoundMasterKey);
        }
        await dispatch(actionFetchingCreateAccount());
        const listAccount: AccountInstance[] = wallet.masterAccount.getAccounts();
        const listAccountName = listAccount.map((item) => item.name);
        const isAccountExist = listAccountName.some((name: string) => isEqual(toLower(name), toLower(accountName)));
        if (isAccountExist) {
            throw new Error(error.keychainExisted);
        }
        const account = await wallet.masterAccount.addAccount(accountName);
        if (!account) {
            throw new Error(error.canNotCreate);
        }
        const mainnet: boolean = isMainnetSelector(state);
        await dispatch(actionLoadedWallet({ wallet, walletId, mainnet }));
        await actionSwitchAccount(accountName)(dispatch, getState);
        let task: any[] = [
            actionFollowDefaultToken(account)(dispatch, getState),
            dispatch(actionUpdateMasterKey({ walletId, wallet })),
        ];
        const isMasterless: boolean = isMasterlessSelector(state)(walletId);
        if (!isMasterless) {
            task.push(wallet.update());
        }
        await Promise.all(task);
        await actionSaveWallet()(dispatch, getState);
        dispatch(actionFetchedCreateAccount(account));
        dispatch(actionToggleToast({ toggle: true, value: success.create, type: TOAST_CONFIGS.success }));
    } catch (error) {
        dispatch(actionFetchFailCreateAccount());
        throw error;
    }
};

// import account

export const actionFetchingImportAccount = () => ({
    type: ACTION_FETCHING_IMPORT_ACCOUNT,
});

export const actionFetchedImportAccount = (payload: AccountInstance) => ({
    type: ACTION_FETCHED_IMPORT_ACCOUNT,
    payload,
});

export const actionFetchFailImportAccount = () => ({
    type: ACTION_FETCH_FAIL_IMPORT_ACCOUNT,
});

export const actionFetchImportAccount = ({
    accountName,
    privateKey,
    walletId,
}: {
    accountName: string;
    privateKey: string;
    walletId: number;
}) => async (dispatch: Dispatch, getState: () => IRootState) => {
    try {
        const state = getState();
        const importing = importAccountSelector(state);
        if (importing || !accountName || !privateKey) {
            return;
        }
        await dispatch(actionFetchingImportAccount());
        const pass = passwordSelector(state);
        const translate: IAccountLanguage = translateByFieldSelector(state)('account');
        const { error, success } = translate;
        let wallet: WalletInstance | undefined = await loadWallet(walletId, pass);
        if (!wallet) {
            throw new Error(error.canNotImport);
        }
        const listAccount: AccountInstance[] = wallet.masterAccount.getAccounts();
        const listAccountName = listAccount.map((item) => item.name);
        const listPrivateKey = listAccount.map((item) => item.key.keySet.privateKeySerialized);
        const isAccountExist =
            listAccountName.some((name: string) => isEqual(toLower(name), toLower(accountName))) ||
            listPrivateKey.some((privateKeySerialized) => isEqual(privateKeySerialized, privateKey));
        if (isAccountExist) {
            throw new Error(error.keychainExisted);
        }
        const account: AccountInstance = await wallet.masterAccount.importAccount(accountName, privateKey);
        if (!account) {
            throw new Error(error.canNotImport);
        }
        const mainnet: boolean = isMainnetSelector(state);
        await dispatch(actionLoadedWallet({ wallet, walletId, mainnet }));
        await actionSwitchAccount(accountName)(dispatch, getState);
        const accounts: AccountInstance[] = wallet.masterAccount.getAccounts();
        let task: any[] = [
            actionFollowDefaultToken(account)(dispatch, getState),
            dispatch(actionUpdateMasterKey({ walletId, wallet })),
            dispatch(actionSetListAccount(accounts)),
        ];
        const isMasterless: boolean = isMasterlessSelector(state)(walletId);
        if (!isMasterless) {
            task.push(wallet.update());
        }
        await Promise.all([...task]);
        await actionSaveWallet()(dispatch, getState);
        dispatch(actionFetchedImportAccount(account));
        dispatch(actionToggleToast({ toggle: true, value: success.import, type: TOAST_CONFIGS.success }));
    } catch (error) {
        dispatch(actionFetchFailImportAccount());
        throw error;
    }
};

// remove account

export const actionFetchingRemoveAccount = () => ({
    type: ACTION_FETCHING_REMOVE_ACCOUNT,
});

export const actionFetchedRemoveAccount = () => ({
    type: ACTION_FETCHED_REMOVE_ACCOUNT,
});

export const actionFetchFailRemoveAccount = () => ({
    type: ACTION_FETCH_FAIL_REMOVE_ACCOUNT,
});

export const actionFetchRemoveAccount = (accountName: string, walletId: number) => async (
    dispatch: Dispatch,
    getState: () => IRootState,
) => {
    const state: IRootState = getState();
    const pass: string = passwordSelector(state);
    const remove: boolean = removeAccountSelector(state);
    try {
        if (remove) {
            return;
        }
        await dispatch(actionFetchingRemoveAccount());
        let wallet = await loadWallet(walletId, pass);
        let accounts = wallet.masterAccount.getAccounts();
        const account: AccountInstance = wallet.masterAccount.getAccountByName(accountName);
        const translate: IAccountLanguage = translateByFieldSelector(state)('account');
        const { error: errorHDWallet }: IHDWalletLanguage = translateByFieldSelector(state)('hdWallet');
        const { error, success } = translate;
        if (!wallet) {
            throw new Error(errorHDWallet.canNotFoundMasterKey);
        }
        if (accounts.length === 1 || !account) {
            throw new Error(error.canNotRemove);
        }
        wallet.masterAccount.removeAccount(accountName);
        const mainnet: boolean = isMainnetSelector(state);
        await dispatch(actionLoadedWallet({ wallet, walletId, mainnet }));
        accounts = wallet.masterAccount.getAccounts();
        let defaultAccount: AccountInstance = accounts[0];
        let task: any[] = [
            dispatch(actionUpdateMasterKey({ walletId, wallet })),
            dispatch(actionSetListAccount(accounts)),
        ];
        if (defaultAccount) {
            task.push(actionSwitchAccount(defaultAccount?.name)(dispatch, getState));
        }
        const isMasterless: boolean = isMasterlessSelector(state)(walletId);
        if (!isMasterless) {
            task.push(wallet.update());
        }
        await Promise.all([...task]);
        await actionSaveWallet()(dispatch, getState);
        await dispatch(actionFetchedRemoveAccount());
        dispatch(actionToggleToast({ toggle: true, value: success.remove, type: TOAST_CONFIGS.success }));
    } catch (error) {
        await dispatch(actionFetchFailRemoveAccount());
        throw error;
    }
};
