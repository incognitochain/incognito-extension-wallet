import { createSelector } from 'reselect';
import { IRootState } from 'src/redux/interface';
import { preloadSelector } from '../Preload';
import { IWalletReducer } from './Wallet.reducer';

export const walletSelector = createSelector(
  (state: IRootState) => state.wallet,
  (wallet: IWalletReducer) => wallet
);

export const walletDataSelector = createSelector(
  walletSelector,
  (wallet) => wallet.wallet
);

export const walletIdSelector = createSelector(
  walletSelector,
  preloadSelector,
  (wallet, preload) => {
    const { mainnet } = preload.configs;
    const field = mainnet ? 'mainnet' : 'testnet';
    return wallet[field].walletId;
  }
);
