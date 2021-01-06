export interface INewUserProps {
    pass: string;
    confirmPass: string;
    onChangePass: any;
    onChangeConfirmPass: any;
    onImport: () => void;
    onCreate: () => void;
    disabled: boolean;
    isReset: boolean;
    error: string;
}
