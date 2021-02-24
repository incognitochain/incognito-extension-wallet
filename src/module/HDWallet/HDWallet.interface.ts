import { IReducer as ICreateMasterKeyReducer } from './features/CreateMasterKey';
import { IReducer as IImportReducer } from './features/ImportMasterKey';

export interface IRootReducer {
    actionType: number;
}

export interface IHdWalletReducer {
    create: ICreateMasterKeyReducer;
    import: IImportReducer;
    root: IRootReducer;
}
