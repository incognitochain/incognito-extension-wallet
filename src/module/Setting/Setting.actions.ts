import { ACTION_FETCHED, ACTION_TOGGLE_HOME_CONFIGS, ACTION_TOGGLE_DECIMAL_DIGITS } from './Setting.constant';

export const actionFetched = (payload: any) => ({
    type: ACTION_FETCHED,
    payload,
});

export const actionToggleHomeConfigs = () => ({
    type: ACTION_TOGGLE_HOME_CONFIGS,
});

export const actionToggleDecimalDigits = () => ({
    type: ACTION_TOGGLE_DECIMAL_DIGITS,
});
