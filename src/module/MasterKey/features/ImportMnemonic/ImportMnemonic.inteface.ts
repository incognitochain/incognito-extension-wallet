export interface IProps {
    masterKeyName: string;
    mnemonic: string;
    error: string;
    onChangeMnemonic: (e: any) => void;
    onChangeName: (e: any) => void;
    onVerify: () => void;
    isDisabled: boolean;
    onBack: () => void;
}
