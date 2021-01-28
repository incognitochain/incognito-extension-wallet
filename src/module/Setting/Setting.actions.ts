import {
    ACTION_FETCHED,
    ACTION_TOGGLE_HOME_CONFIGS,
    ACTION_TOGGLE_DECIMAL_DIGITS,
    ACTION_TOGGLE_DEV_MODE,
    ACTION_TOGGLE_MODE_SAVE_BURN_TX,
    ACTION_TOGGLE_MODE_SAVE_RAW_BURN_TX,
} from './Setting.constant';

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

export const actionToggleDevMode = () => ({
    type: ACTION_TOGGLE_DEV_MODE,
});

export const actionToggleModeSaveBurnTx = () => ({
    type: ACTION_TOGGLE_MODE_SAVE_BURN_TX,
});

export const actionToggleModeSaveRawBurnTx = () => ({
    type: ACTION_TOGGLE_MODE_SAVE_RAW_BURN_TX,
});
