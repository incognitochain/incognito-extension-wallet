import { Dispatch } from 'redux';
import { IRootState } from 'src/redux/interface';
import { reloadApp } from 'src/utils/app';
import { walletIdSelector } from 'src/module/Wallet';
import { loadWallet } from 'src/module/Wallet/Wallet.utils';
import { sendExtensionMessage, sendPasswordToBackground } from 'src/utils/sendMessage';
import APP_CONSTANT from 'src/constants/app';
import { chainURLSelector } from 'src/module/Preload/Preload.selector';
import {
    ACTION_CHANGE_PASSWORD,
    ACTION_CREATE_PASSWORD,
    ACTION_LOGIN,
    ACTION_LOGOUT,
    ACTION_TOGGLE_FORGET_PASSWORD,
} from './Password.events';
import { isForgetPasswordSelector } from './Password.selector';

const loginEvent = (payload: string) => ({
    type: ACTION_LOGIN,
    payload,
});

export const actionToggleForgetPassword = (payload: boolean) => ({
    type: ACTION_TOGGLE_FORGET_PASSWORD,
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
    const isForgetPassword = isForgetPasswordSelector(state);
    if (!walletId) {
        throw new Error(`Can't not found wallet id`);
    }
    if (isForgetPassword) {
        await dispatch(actionToggleForgetPassword(false));
    }
    await loadWallet(walletId, newPass);
    dispatch(loginEvent(newPass));
    await sendPasswordToBackground(newPass, chainURL);
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
    await dispatch(logoutEvent());
    if (typeof window !== 'undefined') {
        reloadApp();
    }
};
