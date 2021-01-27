import { BigNumber } from 'bignumber.js';
import { AccountInstance, WalletInstance } from 'incognito-js/build/web/browser';
import { isEqual } from 'lodash';
import { Dispatch } from 'redux';
import { IRootState } from 'src/redux/interface';
import { actionHandleLoadWallet, actionSaveWallet, actionUpdateWallet, IWalletReducer } from 'src/module/Wallet';
import { walletDataSelector, walletSelector } from 'src/module/Wallet/Wallet.selector';
import { actionFollowDefaultToken, actionGetPrivacyTokensBalance } from 'src/module/Token';
import { cachePromise } from 'src/services';
import { batch } from 'react-redux';
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
} from './Account.constant';
import {
    defaultAccountNameSelector,
    defaultAccountSelector,
    createAccountSelector,
    importAccountSelector,
    switchAccountSelector,
} from './Account.selector';
import { actionFreeHistory } from '../History';

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
    const switchAccount: boolean = switchAccountSelector(state);
    const defaultAccountName = defaultAccountNameSelector(state);
    const account: AccountInstance = wallet.masterAccount.getAccountByName(accountName);
    try {
        if (!account) {
            throw new Error(`Account not found!`);
        }
        if (isEqual(account?.name, defaultAccountName) || switchAccount) {
            return account;
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

// create account

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

// import account

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
        await actionSwitchAccount(accountName)(dispatch, getState);
        await actionFollowDefaultToken(account)(dispatch, getState);
        await dispatch(actionFetchedImportAccount(account));
    } catch (error) {
        throw error;
    } finally {
        await actionSaveWallet()(dispatch, getState);
    }
};

// remove account

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
