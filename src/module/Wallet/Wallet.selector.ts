import isEqual from 'lodash/isEqual';
import { createSelector } from 'reselect';
import { IRootState } from 'src/redux/interface';
import { isMainnetSelector } from 'src/module/Preload';
import { IWalletReducer } from './Wallet.interface';

export const walletSelector = createSelector(
    (state: IRootState) => state.wallet,
    (wallet: IWalletReducer) => wallet,
);

export const walletDataSelector = createSelector(walletSelector, (wallet) => wallet.wallet);

export const walletMnemonicSelector = createSelector(walletDataSelector, (wallet) => wallet.mnemonic);

export const rootWalletSelector = createSelector(walletSelector, isMainnetSelector, (wallet, mainnet) => {
    const field = mainnet ? 'mainnet' : 'testnet';
    return wallet[field];
});

export const masterlessIdSelector = createSelector(rootWalletSelector, (wallet) => wallet.masterlessId);

export const isInitMasterlessSelector = createSelector(masterlessIdSelector, (masterlessId) => masterlessId > -1);

export const listIdsWalletSelector = createSelector(rootWalletSelector, (wallet) => wallet.ids);

export const walletIdSelector = createSelector(rootWalletSelector, (wallet) => wallet.walletId);

export const isInitWalletSelector = createSelector(walletIdSelector, (walletId) => walletId > -1);

export const isMasterlessSelector = createSelector(masterlessIdSelector, (masterlessId) => (masterKeyId: number) =>
    isEqual(masterKeyId, masterlessId),
);
