import { WalletInstance } from 'incognito-js/build/web/browser';

export interface IWallet {
    init: boolean;
    ids: string[] | number[];
    walletId: number;
}

export interface IWalletReducer {
    mainnet: IWallet;
    testnet: IWallet;
    loaded: boolean;
    wallet: WalletInstance | any;
}

export interface IDataInitWallet {
    wallet: WalletInstance;
    walletId: number;
}

export interface IPayloadInitWallet extends IDataInitWallet {
    mainnet: boolean;
}
