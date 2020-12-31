import { AccountInstance, WalletInstance } from 'incognito-js/build/web/browser';
import memoize from 'lodash/memoize';
import isEmpty from 'lodash/isEmpty';
import { createSelector } from 'reselect';
import { IRootState } from 'src/redux/interface';
import { walletDataSelector, walletSelector } from 'src/module/Wallet/Wallet.selector';
import { IWalletReducer } from 'src/module/Wallet';
import { IAccountReducer } from './Account.interface';

export const accountSelector = createSelector(
    (state: IRootState) => state.account,
    (account: IAccountReducer) => account,
);
export const listAccountSelector = createSelector(accountSelector, (account) => account?.list || []);

export const listAccountNameSelector = createSelector(
    listAccountSelector,
    (listAccount) => (listAccount && listAccount.map((account) => account.name)) || [],
);

export const defaultAccountNameSelector = createSelector(accountSelector, (account) => account.defaultAccountName);

export const defaultAccountSelector = createSelector(
    listAccountSelector,
    defaultAccountNameSelector,
    walletSelector,
    (list, defaultAccountName, walletState) => {
        const { loaded }: IWalletReducer = walletState;
        if (!loaded) {
            return {};
        }
        let account: any;
        try {
            const { wallet } = walletState;
            const defaultAccount: AccountInstance = wallet.masterAccount.getAccountByName(defaultAccountName);
            if (isEmpty(defaultAccount?.name)) {
                account = list && list[0];
            }
            account = defaultAccount;
        } catch (error) {
            throw error;
        }
        return account;
    },
);

export const isGettingAccountBalanceSelector = createSelector(
    accountSelector,
    defaultAccountSelector,
    (account: IAccountReducer, defaultAccount: AccountInstance | undefined) =>
        (defaultAccount && account.gettingBalance.includes(defaultAccount.name)) || false,
);

export const switchAccountSelector = createSelector(accountSelector, (account) => account?.switch || false);

export const createAccountSelector = createSelector(accountSelector, (account) => account?.create || false);

export const importAccountSelector = createSelector(accountSelector, (account) => account?.import || false);

export const getAccountByNameSelector = createSelector(walletDataSelector, (wallet: WalletInstance) =>
    memoize((accountName: string) => wallet.masterAccount.getAccountByName(accountName)),
);

export const accountBalanceSelector = createSelector(accountSelector, (account) => account.accountBalance || 0);

export const keySetAccountSelector = createSelector(
    defaultAccountSelector,
    (account: AccountInstance) => account && account.key.keySet,
);

export const paymentAddressSelector = createSelector(
    keySetAccountSelector,
    (keySet) => keySet.paymentAddressKeySerialized,
);
