import isString from 'lodash/isString';
import { IObject } from 'src/utils';
import { toString } from 'lodash';
import { CHAIN_ERROR, SDK_ERROR, API_ERROR } from 'src/constants/error';
import { SDKError } from 'incognito-js/build/web/browser';
import { IToggleToast, IDefaultMessageToast } from './Toast.interface';
import { ACTION_TOGGLE_TOAST } from './Toast.constant';

export const TOAST_CONFIGS = {
    error: -1,
    success: 0,
    warning: 1,
    custom: 2,
};

export const TOAST_CONFIGS_CLASSNAME: IObject = {
    '-1': 'error',
    '0': 'success',
    '1': 'warning',
    '2': 'custom',
};

export interface IToastReducer {
    value: any;
    type: number;
    toggle: boolean;
}

const initialState: IToastReducer = {
    value: '',
    type: 0,
    toggle: false,
};

const getMessageError = (error: any, defaultMessage?: IDefaultMessageToast) => {
    let value = '';
    try {
        console.debug(error, error instanceof SDKError);
        if (error?.Code) {
            const code = toString(error?.Code);
            const errorMessage = error?.Message;
            const message = CHAIN_ERROR[code] || defaultMessage?.defaultChainErrorMsg || errorMessage;
            return `${message} ERROR_CODE(${code})`;
        }
        if (error instanceof SDKError || error?.code) {
            const code = error?.code;
            const errorMessage = error?.message;
            const message = SDK_ERROR[code] || defaultMessage?.defaultSDKErrorMsg || errorMessage;
            return `${message} SDK_ERROR_CODE(${code})`;
        }
        if (error?.response?.data?.Error) {
            // API ERROR
            const errorData = error?.response?.data?.Error;
            const code = toString(errorData?.Code);
            const errorMessage = errorData?.Message;
            const message = API_ERROR[code] || defaultMessage?.defaultApiErrorMsg || errorMessage;
            return `${message} API_ERROR_CODE(${code})`;
        }
        if (error instanceof Error) {
            return error?.message;
        }
        if (isString(error)) {
            return error;
        }
    } catch (e: any) {
        value = error?.message;
    }
    return value;
};

// eslint-disable-next-line no-unused-vars
const reducer: (state: IToastReducer, action: { type: string; payload: any }) => any = (
    state = initialState,
    action,
) => {
    switch (action.type) {
        case ACTION_TOGGLE_TOAST: {
            let { type, toggle, value, defaultMessage }: IToggleToast = action.payload;
            if (type === TOAST_CONFIGS.error) {
                value = getMessageError(value, defaultMessage);
            }
            return {
                ...state,
                type,
                toggle,
                value,
            };
        }
        default:
            return state;
    }
};

export default reducer;
