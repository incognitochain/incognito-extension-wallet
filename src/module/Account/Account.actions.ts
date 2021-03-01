import { BigNumber } from 'bignumber.js';
import { batch } from 'react-redux';
import toLower from 'lodash/toLower';
import { AccountInstance, WalletInstance } from 'incognito-js/build/web/browser';
import isEqual from 'lodash/isEqual';
import { Dispatch } from 'redux';
import { IRootState } from 'src/redux/interface';
import { IWalletReducer, loadWallet } from 'src/module/Wallet';
import {
    actionHandleLoadWallet,
    actionLoadedWallet,
    actionSaveWallet,
    actionUpdateWallet,
} from 'src/module/Wallet/Wallet.actions';
import { walletDataSelector, walletSelector, isMasterlessSelector } from 'src/module/Wallet/Wallet.selector';
import { actionFollowDefaultToken, actionGetPrivacyTokensBalance } from 'src/module/Token/Token.actions';
import { cachePromise } from 'src/services';
import { isMainnetSelector } from 'src/module/Preload/Preload.selector';
import { actionUpdateMasterKey } from 'src/module/HDWallet/HDWallet.actions';
import { passwordSelector } from 'src/module/Password/Password.selector';
import { IAccountLanguage } from 'src/i18n/interface';
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
} from './Account.constant';
import {
    defaultAccountNameSelector,
    defaultAccountSelector,
    createAccountSelector,
    importAccountSelector,
    switchAccountSelector,
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
        const wallet: WalletInstance = await loadWallet(walletId, pass);
        const create: boolean = createAccountSelector(state);
        if (create || !accountName || !walletId || !pass) {
            return;
        }
        await dispatch(actionFetchingCreateAccount());
        const translate: IAccountLanguage = translateByFieldSelector(state)('account');
        const { error } = translate;
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
        await dispatch(
            actionLoadedWallet({
                wallet,
                mainnet,
                walletId,
            }),
        );
        await Promise.all([
            wallet.update(),
            actionFollowDefaultToken(account)(dispatch, getState),
            dispatch(actionUpdateMasterKey({ walletId, wallet })),
        ]);
        dispatch(actionFetchedCreateAccount(account));
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
        const pass: string = passwordSelector(state);
        const wallet: WalletInstance = await loadWallet(walletId, pass);
        const translate: IAccountLanguage = translateByFieldSelector(state)('account');

        const { error } = translate;
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
        console.debug('ACCOUNT', account.name);
        if (!account) {
            throw new Error(error.canNotImport);
        }
        const mainnet: boolean = isMainnetSelector(state);
        await dispatch(
            actionLoadedWallet({
                wallet,
                mainnet,
                walletId,
            }),
        );
        let task: any[] = [
            actionFollowDefaultToken(account)(dispatch, getState),
            dispatch(actionUpdateMasterKey({ walletId, wallet })),
            actionSwitchAccount(accountName)(dispatch, getState),
        ];
        const isMasterless: boolean = isMasterlessSelector(state)(walletId);
        if (!isMasterless) {
            task.push(wallet.update());
        }
        await Promise.all([...task]);
        dispatch(actionFetchedImportAccount(account));
    } catch (error) {
        dispatch(actionFetchFailImportAccount());
        throw error;
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
