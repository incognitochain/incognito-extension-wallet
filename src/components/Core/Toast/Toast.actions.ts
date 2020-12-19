import { ACTION_TOGGLE_TOAST } from './Toast.constant';

export const actionToggleToast = (
    payload: {
        toggle: boolean;
        value?: string;
        type?: number;
    } = { toggle: false, value: '', type: 0 },
) => ({
    type: ACTION_TOGGLE_TOAST,
    payload,
});
