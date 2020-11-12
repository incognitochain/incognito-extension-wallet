import { AccountInstance } from 'incognito-js/build/web/browser';
import memoize from 'lodash/memoize';
import isEmpty from 'lodash/isEmpty';
import { createSelector } from 'reselect';
import { IRootState } from 'src/redux/interface';
import { IAccount, IAccountReducer } from './Account.interface';

export const accountSelector = createSelector(
  (state: IRootState) => state.account,
  (account: IAccountReducer) => account
);
export const listAccountSelector = createSelector(
  accountSelector,
  (account) => account.list || []
);

export const listAccountNameSelector = createSelector(
  listAccountSelector,
  (listAccount) => listAccount.map((account) => account.name)
);

export const defaultAccountNameSelector = createSelector(
  accountSelector,
  (account) => account.defaultAccountName
);

export const defaultAccountSelector = createSelector(
  listAccountSelector,
  defaultAccountNameSelector,
  (state: IRootState) => state.wallet,
  (list, defaultAccountName, walletState) => {
    let account;
    const { loaded } = walletState;
    if (!loaded) {
      return null;
    }
    try {
      const { wallet } = walletState;
      account = wallet.masterAccount.getAccountByName(defaultAccountName);
    } catch (error) {
      console.debug('ERROR', error);
    }
    if (isEmpty(account?.name)) {
      account = list && list[0];
    }
    return account;
  }
);

export const isGettingAccountBalanceSelector = createSelector(
  accountSelector,
  (account) => account.isGettingBalance.length !== 0
);

export const defaultAccountBalanceSelector = createSelector(
  defaultAccountSelector,
  (account: IAccount & any) => account.value || 0
);

export const switchAccountSelector = createSelector(
  accountSelector,
  (account) => account?.switch || false
);

export const createAccountSelector = createSelector(
  accountSelector,
  (account) => account?.create || false
);

export const importAccountSelector = createSelector(
  accountSelector,
  (account) => account?.import || false
);

export const getAccountByNameSelector = createSelector(
  listAccountSelector,
  (accounts) =>
    memoize((accountName: string) =>
      accounts.find((account: AccountInstance) => account?.name === accountName)
    )
);
