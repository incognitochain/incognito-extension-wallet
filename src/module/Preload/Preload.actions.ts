import { Dispatch } from 'redux';
import { IRootState } from 'src/redux/interface';
import { goServices, setConfig, storageService } from 'incognito-js/build/web/browser';
import { actionHandleLoadWallet, actionInitWallet, IWalletReducer, walletSelector } from 'src/module/Wallet';
import { ENVS } from 'src/configs';
import { actionFetchPCustomTokenList, actionFetchPTokenList } from 'src/module/Token';
import { v4 } from 'uuid';
import { IServer } from 'src/services';
import { loadSeparator } from 'src/utils/separator';
import { preloadSelector } from './Preload.selector';
import { IPreloadConfigs, IPreloadReducer } from './Preload.reducer';
import {
    ACTION_FETCH_FAIL,
    ACTION_FETCHING,
    ACTION_FETCHED,
    ACTION_SET_SERVER,
    ACTION_SET_CONFIGS,
    ACTION_SET_LOGIN,
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

export const actionFetch = () => async (dispatch: Dispatch, getState: () => IRootState) => {
    const state: IRootState = getState();
    const preload: IPreloadReducer = preloadSelector(state);
    const walletState: IWalletReducer = walletSelector(state);
    const { configs } = preload;
    const { mainnet } = configs;
    const field = mainnet ? 'mainnet' : 'testnet';
    const { init } = walletState[field];
    try {
        await dispatch(actionFetching());
        loadSeparator();
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
        const { deviceId, deviceToken } = await actionLogin()(dispatch, getState);
        setConfig({
            ...configs,
            wasmPath: `${ENVS.REACT_APP_DOMAIN_URL}/privacy.wasm`,
            logMethod: (message: string) => console.debug(`MESSAGE`, message),
            deviceId,
            deviceToken,
        });
        await goServices.implementGoMethodUseWasm();
        let task: any[] = [
            actionFetchPTokenList()(dispatch, getState),
            actionFetchPCustomTokenList()(dispatch, getState),
        ];
        if (!init) {
            task = [...task, actionInitWallet()(dispatch, getState)];
        } else {
            task = [...task, actionHandleLoadWallet()(dispatch, getState)];
        }
        await Promise.all(task);
        await dispatch(actionFetched({}));
    } catch (error) {
        dispatch(actionFetchFail(error));
        throw error;
    }
};
