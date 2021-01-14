export interface IProps {
    onChangeMasterKeyName: any;
    onChangeMnemonic: any;
    onAccept: () => void;
    onCreate: () => void;
    masterKeyName: string;
    mnemonic: string;
    onBack: () => void;
}
