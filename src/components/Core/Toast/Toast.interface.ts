export interface IToggleToast {
    toggle: boolean;
    value?: string;
    type?: number;
    defaultMessage?: IDefaultMessageToast;
}

export interface IDefaultMessageToast {
    defaultApiErrorMsg?: string;
    defaultSDKErrorMsg?: string;
    defaultChainErrorMsg?: string;
}
