import { WalletInstance } from 'incognito-js/build/web/browser';
import { cloneDeep } from 'lodash';
import { ENVS } from 'src/configs';
import { initIncognitoDB } from '../IncognitoDB';
export const TABLE_NAME = 'wallet';

export const createWallet = async (wallet: object) => {
  let stored;
  try {
    const incognitoDB = await initIncognitoDB();
    stored = await incognitoDB.addValue(TABLE_NAME, wallet);
    console.debug(`stored`, stored);
  } catch (error) {
    throw error;
  }
  return stored;
};

export const researchWallet = async (walletId: number) => {
  let wallet;
  try {
    const incognitoDB = await initIncognitoDB();
    wallet = await incognitoDB.getValue(TABLE_NAME, walletId);
  } catch (error) {
    throw error;
  }
  return wallet;
};

interface IWallet {
  encryptWallet: string;
  id: number;
  name: string;
}

export const updateWallet = async (
  wallet: WalletInstance,
  walletId: number
) => {
  let updated;
  console.debug(`walletId`, walletId);
  try {
    const incognitoDB = await initIncognitoDB();
    let curWallet: IWallet = await incognitoDB.getValue(TABLE_NAME, walletId);
    const encryptWallet = wallet.backup(ENVS.REACT_APP_PASSWORD_SECRET_KEY);
    curWallet.encryptWallet = encryptWallet;
    updated = await incognitoDB.updateByKey(TABLE_NAME, curWallet);
  } catch (error) {
    throw error;
  }
  return updated;
};

export const deleteWallet = async () => {
  try {
  } catch (error) {}
};
