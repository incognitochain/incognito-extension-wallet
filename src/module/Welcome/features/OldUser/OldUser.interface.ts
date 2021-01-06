export interface IOldUserProps {
    pass: string;
    confirmPass: string;
    onChangePass: any;
    onNext: () => void;
    onForgot: () => void;
    disabled: boolean;
    error: string;
}
