import { createSelector } from 'reselect';

export const walletSelector = createSelector(
  (state: any) => state.wallet,
  (wallet) => wallet
);
