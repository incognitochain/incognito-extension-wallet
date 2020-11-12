import { IHomeReducer } from 'src/routes/Home';
import { IPreloadReducer } from 'src/routes/Preload';
import { ITokenReducer } from 'src/routes/Token';
import { IWalletReducer } from 'src/routes/Wallet';
import { IConfigsReducer } from 'src/routes/Configs';
import { IAccountReducer } from 'src/routes/Account';
import { IModalReducer } from 'src/components/Modal';

export interface IAction {
  type: string;
  payload: any;
}

export interface IRootState {
  home: IHomeReducer;
  wallet: IWalletReducer;
  preload: IPreloadReducer;
  token: ITokenReducer;
  configs: IConfigsReducer;
  account: IAccountReducer;
  modal: IModalReducer;
}
