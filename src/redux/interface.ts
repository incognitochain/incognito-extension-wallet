import { IUnshieldReducer } from 'src/module/Send/features/UnShield';
import { IShieldReducer } from 'src/module/Shield';
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
import { IAddressBookReducer } from 'src/module/AddressBook';
import { IHeaderReducer } from 'src/components/Header';
import { IPasswordReducers } from 'src/module/Password';
import { ITooltipReducer } from 'src/module/Tooltip';
import { IHdWalletReducer } from 'src/module/HDWallet';

export interface IAction {
    type: string;
    payload: any;
}

export interface IRootState {
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
    addressBook: IAddressBookReducer;
    header: IHeaderReducer;
    shield: IShieldReducer;
    password: IPasswordReducers;
    tooltip: ITooltipReducer;
    unShield: IUnshieldReducer;
    hdWallet: IHdWalletReducer;
}
