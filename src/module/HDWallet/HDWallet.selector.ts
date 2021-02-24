import { createSelector } from 'reselect';
import { IRootState } from 'src/redux/interface';

export const hdWalletSelector = createSelector(
    (state: IRootState) => state.hdWallet,
    (hdWallet) => hdWallet,
);

export const rootHDWalletSelector = createSelector(hdWalletSelector, (hdWallet) => hdWallet.root);

export const actionTypeHDWalletSelector = createSelector(rootHDWalletSelector, (root) => root.actionType);
