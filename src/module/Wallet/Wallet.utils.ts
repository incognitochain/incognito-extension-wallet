import { WalletInstance } from 'incognito-js/build/web/browser';
import { createWallet, researchWallet } from 'src/database/tables/wallet';
import { IDataInitWallet } from './Wallet.interface';

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

export const importWallet = async (
    walletName: string,
    mnemonic: string,
    pass: string,
    autoImportAnonAccount = true,
) => {
    let wallet = new WalletInstance();
    let walletId;
    await wallet.import(walletName, mnemonic);
    if (autoImportAnonAccount) {
        await wallet.masterAccount.addAccount('Anon');
    }
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
