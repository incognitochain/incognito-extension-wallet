import { WalletInstance } from 'incognito-js/build/web/browser';
import { initIncognitoDB } from 'src/database/IncognitoDB';

export const TABLE_NAME = 'wallet';

export const createWallet = async (wallet: any) => {
    let stored;
    try {
        const incognitoDB = await initIncognitoDB();
        stored = await incognitoDB.addValue(TABLE_NAME, wallet);
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

export const updateWallet = async (wallet: WalletInstance, walletId: number, pass: string) => {
    let updated;
    try {
        const incognitoDB = await initIncognitoDB();
        const curWallet: IWallet = await incognitoDB.getValue(TABLE_NAME, walletId);
        curWallet.encryptWallet = wallet.backup(pass);
        updated = await incognitoDB.updateByKey(TABLE_NAME, curWallet);
    } catch (error) {
        throw error;
    }
    return updated;
};

export const removeWallet = async (walletId: number) => {
    let removed;
    try {
        const incognitoDB = await initIncognitoDB();
        removed = await incognitoDB.deleteValue(TABLE_NAME, walletId);
    } catch (error) {
        throw error;
    }
    return removed;
};
