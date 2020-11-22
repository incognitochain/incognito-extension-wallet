import { WalletInstance } from 'incognito-js/build/web/browser';
import { ENVS } from 'src/configs';
import { createWallet, researchWallet } from 'src/database/tables/wallet';
import { IDataInitWallet } from './Wallet.actions';

export const initWallet = async (walletName: string) => {
  let wallet = new WalletInstance();
  let walletId;
  try {
    wallet = await wallet.init(
      ENVS.REACT_APP_PASSPHRASE_WALLET_DEFAULT,
      walletName
    );
    const encryptWallet = wallet.backup(ENVS.REACT_APP_PASSWORD_SECRET_KEY);
    if (!wallet) {
      throw new Error(`Can't create wallet`);
    }
    const data = {
      encryptWallet,
      name: wallet.name,
    };
    walletId = await createWallet(data);
    if (!walletId) {
      throw new Error(`Can't store wallet`);
    }
  } catch (error) {
    throw error;
  }
  const result: IDataInitWallet = {
    wallet,
    walletId,
  };
  return result;
};

export const loadWallet = async (walletId: number) => {
  let wallet;
  try {
    const walletData = await researchWallet(walletId);
    const { encryptWallet } = walletData;
    if (!encryptWallet) {
      throw new Error(`Can't not load wallet`);
    }
    wallet = await WalletInstance.restore(
      encryptWallet,
      ENVS.REACT_APP_PASSWORD_SECRET_KEY
    );
  } catch (error) {
    throw error;
  }
  return wallet;
};
