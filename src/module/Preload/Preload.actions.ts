import { Dispatch } from 'redux';
import { IRootState } from 'src/redux/interface';
import { goServices, setConfig, storageService } from 'incognito-js/build/web/browser';
import { actionFetchProfile } from 'src/module/Profile';
import { v4 } from 'uuid';
import { actionHandleLoadWallet } from 'src/module/Wallet';
import { actionSetListMasterKey } from 'src/module/HDWallet';
import { actionFetchPCustomTokenList, actionFetchPTokenList } from 'src/module/Token';
import { IServer } from 'src/services';
import { loadSeparator } from 'src/utils/separator';
import { ENVS } from 'src/configs';
import { preloadSelector } from './Preload.selector';
import { IPreloadConfigs, IPreloadReducer, IRequestDApp } from './Preload.reducer';
import {
    ACTION_FETCH_FAIL,
    ACTION_FETCHING,
    ACTION_FETCHED,
    ACTION_SET_SERVER,
    ACTION_SET_CONFIGS,
    ACTION_SET_LOGIN,
    ACTION_FETCHED_SDK_CONFIG,
    ACTION_UPDATE_REQUEST_FROM_DAPP,
    ACTION_CLEAR_REQUEST_FROM_DAPP,
    ACTION_SET_CAMERA_PERMISSION,
} from './Preload.constant';

export const actionSetConfigs = (payload: IPreloadConfigs) => ({
    type: ACTION_SET_CONFIGS,
    payload,
});

export const actionSetServer = (payload: IServer) => ({
    type: ACTION_SET_SERVER,
    payload,
});

export const actionFetching = () => ({
    type: ACTION_FETCHING,
});

export const actionFetched = (payload: any) => ({
    type: ACTION_FETCHED,
    payload,
});

export const actionFetchFail = (error: any) => ({
    type: ACTION_FETCH_FAIL,
    payload: error,
});

export const actionSetLogin = (payload: { deviceId: string; deviceToken: string }) => ({
    type: ACTION_SET_LOGIN,
    payload,
});

export const actionLogin = () => async (dispatch: Dispatch, getState: () => IRootState) => {
    const state = getState();
    const preload: IPreloadReducer = preloadSelector(state);
    const { configs } = preload;
    let payload = {
        deviceId: configs.deviceId || '',
        deviceToken: configs.deviceToken || '',
    };
    try {
        if (!configs.deviceId || !configs.deviceToken) {
            let deviceId = v4();
            payload = {
                deviceId,
                deviceToken: deviceId,
            };
            await dispatch(actionSetLogin(payload));
        }
    } catch (error) {
        throw error;
    }
    return payload;
};

export const actionFetch = (accountName?: string) => async (dispatch: Dispatch, getState: () => IRootState) => {
    try {
        await dispatch(actionFetching());
        loadSeparator();
        let task: any[] = [actionHandleLoadWallet(accountName)(dispatch, getState)];
        await Promise.all([...task]);
        await actionSetListMasterKey()(dispatch, getState);
        await dispatch(actionFetched({}));
    } catch (error) {
        dispatch(actionFetchFail(error));
        throw error;
    }
};

export const actionFetchedSdkConfig = (payload: any) => ({
    type: ACTION_FETCHED_SDK_CONFIG,
    payload,
});

export const actionFetchSdkConfig = () => async (dispatch: Dispatch, getState: () => IRootState) => {
    const state: IRootState = getState();
    const preload: IPreloadReducer = preloadSelector(state);
    const { configs } = preload;
    try {
        await dispatch(actionFetching());
        storageService.implement({
            setMethod: async (key: string, data: any) => {
                return localStorage.setItem(key, data);
            },
            getMethod: async (key: string) => {
                return localStorage.getItem(key);
            },
            removeMethod: async (key: string) => localStorage.removeItem(key),
            namespace: 'EXTENSION_WALLET',
        });
        let task = [
            actionLogin()(dispatch, getState),
            goServices.implementGoMethodUseWasm(),
            actionFetchPTokenList()(dispatch, getState),
            actionFetchPCustomTokenList()(dispatch, getState),
        ];
        const [loginData] = await Promise.all(task);
        const { deviceId, deviceToken } = loginData;
        setConfig({
            ...configs,
            wasmPath: `${ENVS.REACT_APP_DOMAIN_URL}/privacy.wasm`,
            logMethod: (message: string) => console.debug(`MESSAGE`, message),
            deviceId,
            deviceToken,
        });
        await actionFetchProfile()(dispatch, getState);
        await dispatch(actionFetchedSdkConfig({}));
    } catch (error) {
        dispatch(actionFetchFail(error));
        throw error;
    }
};

export const actionUpdateRequestFromDApp = (payload: IRequestDApp | null) => ({
    type: ACTION_UPDATE_REQUEST_FROM_DAPP,
    payload,
});

export const actionClearRequestFromDApp = () => ({
    type: ACTION_CLEAR_REQUEST_FROM_DAPP,
});

export const actionSetCameraPermission = () => ({
    type: ACTION_SET_CAMERA_PERMISSION,
});
