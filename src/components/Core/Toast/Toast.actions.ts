import { IToggleToast } from './Toast.interface';
import { ACTION_TOGGLE_TOAST } from './Toast.constant';

export const actionToggleToast = (
    payload: IToggleToast = {
        toggle: false,
        value: '',
        type: 0,
        defaultMessage: { defaultApiErrorMsg: '', defaultChainErrorMsg: '', defaultSDKErrorMsg: '' },
    },
) => ({
    type: ACTION_TOGGLE_TOAST,
    payload,
});
