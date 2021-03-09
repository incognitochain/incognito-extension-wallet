import { AccountInstance, WalletInstance } from 'incognito-js/build/web/browser';
import { IReducer as ICreateMasterKeyReducer } from './features/CreateMasterKey';
import { IReducer as IImportReducer } from './features/ImportMasterKey';

export interface IMasterKey {
    wallet: WalletInstance;
    walletId: number;
    isMasterless: boolean;
}

export interface IMasterKeyWithKeychains {
    wallet: WalletInstance;
    walletId: number;
    isMasterless: boolean;
    listAccount: AccountInstance[];
}

export interface IRootReducer {
    actionType: number;
    list: IMasterKey[];
}

export interface IHdWalletReducer {
    create: ICreateMasterKeyReducer;
    import: IImportReducer;
    root: IRootReducer;
}
