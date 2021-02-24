import {
    ACTION_SET_MNEMONIC,
    ACTION_TOGGLE_AGREE,
    ACTION_SET_MASTER_KEY_NAME,
    ACTION_SET_STEP,
    ACTION_INIT_CREATE,
    ACTION_TOGGLE_SELECTED_WORD_INDEX,
} from './CreateMasterKey.constant';

export const actionInitCreate = () => ({
    type: ACTION_INIT_CREATE,
});

export const actionToggleAgree = () => ({
    type: ACTION_TOGGLE_AGREE,
});

export const actionSetMasterKeyName = (payload: string) => ({
    type: ACTION_SET_MASTER_KEY_NAME,
    payload,
});

export const actionSetStep = (payload: number) => ({
    type: ACTION_SET_STEP,
    payload,
});

export const actionSetMnemonic = (payload: string) => ({
    type: ACTION_SET_MNEMONIC,
    payload,
});

export const actionToggleSelectedWordIndex = (payload: number) => ({
    type: ACTION_TOGGLE_SELECTED_WORD_INDEX,
    payload,
});
