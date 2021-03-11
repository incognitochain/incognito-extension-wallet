import { WalletInstance } from 'incognito-js/build/web/browser';
import { createWallet, researchWallet, clearAllWallet } from 'src/database/tables/wallet';
import toString from 'lodash/toString';
import { IDataInitWallet } from './Wallet.interface';

const clearStorageData = async () => {
    try {
        localStorage.clear();
        return await clearAllWallet();
    } catch (error) {
        throw error;
    }
};

export const initWallet = async (walletName: string, pass: string) => {
    let wallet = new WalletInstance();
    let walletId;
    wallet = await wallet.init(walletName);
    const encryptWallet = wallet.backup(pass);
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
    const result: IDataInitWallet = {
        wallet,
        walletId,
    };
    return result;
};

export const loadWallet = async (walletId: number, pass: string) => {
    let wallet;
    const walletData = await researchWallet(walletId);
    const { encryptWallet } = walletData;
    if (!encryptWallet) {
        throw new Error(`Can't not load wallet`);
    }
    wallet = await WalletInstance.restore(encryptWallet, pass);
    return wallet;
};

export const importWallet = async ({
    walletName,
    mnemonic,
    pass,
    autoImportAnonAccount = true,
    isForgetPassword,
}: {
    walletName: string;
    mnemonic: string;
    pass: string;
    autoImportAnonAccount?: boolean;
    isForgetPassword?: boolean;
}) => {
    let wallet = new WalletInstance();
    let walletId;
    await wallet.import(walletName, mnemonic);
    if (autoImportAnonAccount) {
        await wallet.masterAccount.addAccount('Anon');
    }
    const encryptWallet = wallet.backup(pass);
    if (!wallet || !encryptWallet) {
        throw new Error(`Can't create wallet`);
    }
    const data = {
        encryptWallet,
        name: wallet.name,
        createdAt: toString(new Date().getTime()),
        updatedAt: '',
    };
    if (isForgetPassword) {
        await clearStorageData();
    }
    walletId = await createWallet(data);
    if (!walletId) {
        throw new Error(`Can't store wallet`);
    }

    const result: IDataInitWallet = {
        wallet,
        walletId,
    };
    return result;
};
