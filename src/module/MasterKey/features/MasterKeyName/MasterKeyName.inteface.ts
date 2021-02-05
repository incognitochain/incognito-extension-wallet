export interface IProps {
    onChangeMasterKeyName: any;
    onAccept: () => void;
    onNext: () => void;
    error: string;
    masterKeyName: string;
    agree: boolean;
    onAgree: () => void;
}
