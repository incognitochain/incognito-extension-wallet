import { ERROR_CODE } from 'src/constants/error';
import { IObject } from 'src/utils';
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

const getMessageError = (error: any) => {
    let value = '';
    try {
        if (error instanceof Error) {
            return error?.message;
        }
        const errorParse = JSON.parse(error);
        const errorCode = errorParse?.Code;
        if (errorCode) {
            return ERROR_CODE[errorCode];
        }
        value = errorParse?.Message || errorParse?.Code;
    } catch (e: any) {
        value = 'Error';
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
            let {
                type,
                toggle,
                value,
            }: {
                type: number;
                toggle: boolean;
                value: any;
            } = action.payload;
            if (type === TOAST_CONFIGS.error) {
                value = getMessageError(value);
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
