import { BigNumber } from 'bignumber.js';
import { AccountInstance, WalletInstance } from 'incognito-js/build/web/browser';
import { isEqual } from 'lodash';
import { Dispatch } from 'redux';
import { IRootState } from 'src/redux/interface';
import { actionHandleLoadWallet, actionSaveWallet, actionUpdateWallet, IWalletReducer } from 'src/module/Wallet';
import { walletDataSelector, walletSelector } from 'src/module/Wallet/Wallet.selector';
import { actionFollowDefaultToken } from 'src/module/Token';
import { actionFreeHistory } from 'src/module/History';
import { cachePromise } from 'src/services';
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
    createAccountSelector,
    importAccountSelector,
} from './Account.selector';

export const actionFetched = (payload: any) => ({
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
    getState: () => IRootState,
) => {
    try {
        const state = getState();
        const wallet: WalletInstance = walletDataSelector(state);
        const create = createAccountSelector(state);
        if (create) {
            return;
        }
        await dispatch(actionFetchingCreateAccount());
        const account = await wallet.masterAccount.addAccount(accountName);
        if (!account) {
            throw new Error(`Can't not create account`);
        }
        await dispatch(actionFetchedCreateAccount(account));
        await actionFollowDefaultToken(account)(dispatch, getState);
        await wallet.update();
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

export const actionFetchImportAccount = (accountName: string, privateKey: string) => async (
    dispatch: Dispatch,
    getState: () => IRootState,
) => {
    try {
        const state = getState();
        const wallet: WalletInstance = walletDataSelector(state);
        const importing = importAccountSelector(state);
        if (importing) {
            return;
        }
        await dispatch(actionFetchingImportAccount());
        const account = await wallet.masterAccount.importAccount(accountName, privateKey);
        if (!account) {
            throw new Error(`Can't not create account`);
        }
        await dispatch(actionFetchedImportAccount(account));
        await actionFollowDefaultToken(account)(dispatch, getState);
    } catch (error) {
        throw error;
    } finally {
        await actionSaveWallet()(dispatch, getState);
    }
};

export const actionSelectAccount = (payload: string) => ({
    type: ACTION_SELECT_ACCOUNT,
    payload,
});

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

export const actionSwitchAccount = (accountName: string) => async (dispatch: Dispatch, getState: () => IRootState) => {
    const state = getState();
    const wallet: WalletInstance = walletDataSelector(state);
    const defaultAccountName = defaultAccountNameSelector(state);
    const account: AccountInstance = wallet.masterAccount.getAccountByName(accountName);
    try {
        if (isEqual(account?.name, defaultAccountName)) {
            return account;
        }
        await dispatch(actionSwitchAccountFetching());
        if (!account) {
            throw new Error(`Account not found!`);
        }
        await dispatch(actionSelectAccount(account.name));
        await actionHandleLoadWallet()(dispatch, getState);
    } catch (error) {
        throw error;
    } finally {
        await dispatch(actionFreeHistory());
        await dispatch(actionSwitchAccountFetched());
    }
    return account;
};

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
            10000,
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

export const actionFetchRemoveAccount = (accountName: string) => async (
    dispatch: Dispatch,
    getState: () => IRootState,
) => {
    try {
        const state = getState();
        const wallet: WalletInstance = walletDataSelector(state);
        const defaultAccountName = defaultAccountNameSelector(state);

        if (defaultAccountName === accountName) {
            const accounts = wallet.masterAccount.getAccounts();
            const account = accounts.find((item) => item.name !== accountName);

            if (account) {
                await actionSwitchAccount(account.name);
            }
        }

        await wallet.masterAccount.removeAccount(accountName);
        await dispatch(actionUpdateWallet(wallet));
        await actionSaveWallet()(dispatch, getState);
    } catch (error) {
        throw error;
    } finally {
        actionHandleLoadWallet()(dispatch, getState);
    }
};
