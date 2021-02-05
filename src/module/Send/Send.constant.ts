export const ACTION_FETCHING_FEE = '[send] Fetching fee';
export const ACTION_FETCHED_EST_NATIVE_FEE = '[send] Fetched est native fee';
export const ACTION_FETCH_FAIL_FEE = '[send] Fetch fail fee';
export const ACTION_ADD_FEE_TYPE = '[send] Add fee type';
export const ACTION_CHANGE_FEE_TYPE = '[send] Change fee type';
export const ACTION_FETCHED_PTOKEN_FEE = '[send] Fetched est pToken fee';
export const ACTION_INIT = '[send] Init data';
export const ACTION_INIT_FETCHED = '[send] Fetched init data';
export const ACTION_FETCHED_MIN_PTOKEN_FEE = '[send] Fetched min pToken fee';
export const ACTION_CHANGE_FEE = '[send] Change fee';
export const ACTION_FETCHED_MAX_FEE_PRV = '[send] Fetched max fee prv';
export const ACTION_FETCHED_MAX_FEE_PTOKEN = '[send] Fetched max fee pToken';
export const ACTION_USE_FEE_MAX = '[send] Use fee max';
export const ACTION_FETCHED_VALID_ADDR = '[send] Fetched valid address';
export const ACTION_FETCHED_USER_FEES = '[send] Fetched user fees';
export const ACTION_FETCHING_USER_FEES = '[send] Fetching user fees';
export const ACTION_FETCH_FAIL_USER_FEES = '[send] Fetch fail user fees';
export const ACTION_TOGGLE_FAST_FEE = '[send] Toggle fast fee';
export const ACTION_REMOVE_FEE_TYPE = '[send] Remove fee type';
export const FORM_CONFIGS = {
    formName: 'form-send',
    amount: 'amount',
    toAddress: 'toAddress',
    fee: 'fee',
    memo: 'memo',
};

export const FORCE_SEND_FORM_CONFIGS = {
    formName: 'force-send-form-send',
    amount: 'amount',
    toAddress: 'toAddress',
    fee: 'fee',
    memo: 'memo',
};
export const ACTION_SET_SENDING = '[send] Toggle sending tx';
export const ACTION_UPDATE_DATA_FORCE_SEND = '[send] Update data force send';
export const ACTION_SET_ERROR_MESSAGE = '[send] Set form error message';
