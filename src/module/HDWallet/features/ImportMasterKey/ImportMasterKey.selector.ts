import { IRootState } from 'src/redux/interface';
import { createSelector } from 'reselect';

export const importHDWalletSelector = createSelector(
    (state: IRootState) => state.hdWallet,
    (hdWallet) => hdWallet.import,
);
