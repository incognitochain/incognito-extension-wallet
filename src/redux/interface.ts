import { IHomeReducer } from 'src/module/Home';
import { IPreloadReducer } from 'src/module/Preload';
import { ITokenReducer } from 'src/module/Token';
import { IWalletReducer } from 'src/module/Wallet';
import { IConfigsReducer } from 'src/module/Configs';
import { IAccountReducer } from 'src/module/Account';
import { IModalReducer } from 'src/components/Modal';
import { IToastReducer } from 'src/components';
import { ISettingReducer } from 'src/module/Setting';
import { ISendReducer } from 'src/module/Send';
import { IHistoryReducer } from 'src/module/History';

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
  toast: IToastReducer;
  setting: ISettingReducer;
  send: ISendReducer;
  history: IHistoryReducer;
}
