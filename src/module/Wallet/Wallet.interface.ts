import { WalletInstance } from 'incognito-js/build/web/browser';

export interface IWallet {
    ids: number[];
    walletId: number;
    masterlessId: number;
}

export interface IWalletReducer {
    mainnet: IWallet;
    testnet: IWallet;
    loaded: boolean;
    wallet: WalletInstance | any;
    switch: boolean;
}

export interface IDataInitWallet {
    wallet: WalletInstance;
    walletId: number;
}

export interface IPayloadInitWallet extends IDataInitWallet {
    mainnet: boolean;
}
