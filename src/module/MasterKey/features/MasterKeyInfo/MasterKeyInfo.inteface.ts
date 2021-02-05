import { AccountInstance, WalletInstance } from 'incognito-js/build/web/browser';

export interface IProps {
    onChangeMnemonic: any;
    onNext: () => void;
    onShowMnemonic: () => void;
    showMnemonic: boolean;
    error: string;
    masterKey: WalletInstance;
    onClickKey: (account: AccountInstance) => void;
}
