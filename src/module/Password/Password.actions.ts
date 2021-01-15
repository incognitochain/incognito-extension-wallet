import { Dispatch } from 'redux';
import { IRootState } from 'src/redux/interface';
import { walletIdSelector } from 'src/module/Wallet';
import { loadWallet } from 'src/module/Wallet/Wallet.utils';
import { sendExtensionMessage } from 'src/utils/sendMessage';
import { isDev } from 'src/configs';
import APP_CONSTANT from 'src/constants/app';
import { ACTION_CHANGE_PASSWORD, ACTION_CREATE_PASSWORD, ACTION_LOGIN } from './Password.events';

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

    if (!walletId) {
        throw new Error(`Can't not found wallet id`);
    }

    await loadWallet(walletId, newPass);
    dispatch(loginEvent(newPass));
    if (isDev) return;
    await sendExtensionMessage(APP_CONSTANT.BACKGROUND_LISTEN.UPDATE_PASS_WORK, {
        password: newPass,
    });
};

export const actionChangePassword = (newPass: string) => ({
    type: ACTION_CHANGE_PASSWORD,
    payload: newPass,
});
