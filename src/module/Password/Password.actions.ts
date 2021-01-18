import { Dispatch } from 'redux';
import { IRootState } from 'src/redux/interface';
import { walletIdSelector } from 'src/module/Wallet';
import { loadWallet } from 'src/module/Wallet/Wallet.utils';
import { sendExtensionMessage } from 'src/utils/sendMessage';
import APP_CONSTANT from 'src/constants/app';
import { ACTION_CHANGE_PASSWORD, ACTION_CREATE_PASSWORD, ACTION_LOGIN, ACTION_LOGOUT } from './Password.events';
import { chainURLSelector } from '../Preload';

const loginEvent = (payload: string) => ({
    type: ACTION_LOGIN,
    payload,
});

export const actionCreatePassword = (newPass: string) => ({
    type: ACTION_CREATE_PASSWORD,
    payload: newPass,
});

export const actionLogin = (newPass: string) => async (dispatch: Dispatch, getState: () => IRootState) => {
    const state: IRootState = getState();
    const walletId = walletIdSelector(state);
    const chainURL = chainURLSelector(state);
    if (!walletId) {
        throw new Error(`Can't not found wallet id`);
    }

    await loadWallet(walletId, newPass);
    dispatch(loginEvent(newPass));
    await sendExtensionMessage(APP_CONSTANT.BACKGROUND_LISTEN.UPDATE_PASS_WORD, {
        password: newPass,
        chainURL,
    });
};

export const actionChangePassword = (newPass: string) => ({
    type: ACTION_CHANGE_PASSWORD,
    payload: newPass,
});

export const logoutEvent = () => ({
    type: ACTION_LOGOUT,
});

export const actionLogout = () => async (dispatch: Dispatch, getState: () => IRootState) => {
    const state: IRootState = getState();
    const chainURL = chainURLSelector(state);
    await sendExtensionMessage(APP_CONSTANT.BACKGROUND_LISTEN.UPDATE_PASS_WORD, {
        password: null,
        chainURL,
    });
    dispatch(logoutEvent());
};
