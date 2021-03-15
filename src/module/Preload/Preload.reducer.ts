import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { ENVS } from 'src/configs';
import { IServer, MAINNET_SERVER, PRODUCTION_API } from 'src/services';
import {
    ACTION_FETCHING,
    ACTION_FETCHED,
    ACTION_SET_CONFIGS,
    ACTION_SET_SERVER,
    ACTION_FETCH_FAIL,
    ACTION_SET_LOGIN,
    ACTION_FETCHED_SDK_CONFIG,
    ACTION_UPDATE_REQUEST_FROM_DAPP,
    ACTION_CLEAR_REQUEST_FROM_DAPP,
    ACTION_SET_CAMERA_PERMISSION,
    ACTION_CHANGE_MODE,
} from './Preload.constant';

export interface IPreloadConfigs {
    chainURL: string;
    apiURL: string;
    mainnet: boolean;
    wasmPath?: string;
    deviceId?: string;
    deviceToken?: string;
}

export interface IRequestDApp {
    name?: string;
    origin?: string;
}

export interface IPreloadReducer {
    isFetchedSdk: boolean;
    isFetched: boolean;
    isFetching: boolean;
    configs: IPreloadConfigs;
    server: IServer;
    error: string;
    requestDApp: IRequestDApp | null;
    hasCameraPermission: boolean;
    mode: number;
}

const initialState: IPreloadReducer = {
    isFetchedSdk: false,
    isFetching: true,
    isFetched: false,
    error: '',
    configs: {
        chainURL: MAINNET_SERVER.address,
        apiURL: PRODUCTION_API,
        mainnet: true,
        wasmPath: `${ENVS.REACT_APP_DOMAIN_URL}/privacy.wasm`,
        deviceId: '',
        deviceToken: '',
    },
    server: MAINNET_SERVER,
    requestDApp: null,
    hasCameraPermission: false,
    mode: -1,
};

const preloadReducer = (
    state = initialState,
    action: {
        type: string;
        payload: any;
    },
) => {
    switch (action.type) {
        case ACTION_FETCHING: {
            return {
                ...state,
                isFetching: true,
            };
        }
        case ACTION_FETCHED: {
            return {
                ...state,
                isFetching: false,
                isFetched: true,
            };
        }
        case ACTION_FETCH_FAIL: {
            const error = action.payload;
            return {
                ...state,
                isFetching: false,
                isFetched: false,
                error: error?.message || JSON.stringify(error),
            };
        }
        case ACTION_SET_CONFIGS: {
            const configs = action.payload;
            return {
                ...state,
                configs: {
                    ...state.configs,
                    ...configs,
                },
            };
        }
        case ACTION_SET_SERVER: {
            const server = action.payload;
            return {
                ...state,
                server,
            };
        }
        case ACTION_SET_LOGIN: {
            return {
                ...state,
                configs: {
                    ...state.configs,
                    ...action.payload,
                },
            };
        }
        case ACTION_FETCHED_SDK_CONFIG: {
            return {
                ...state,
                isFetching: false,
                isFetchedSdk: true,
            };
        }
        case ACTION_UPDATE_REQUEST_FROM_DAPP: {
            const { payload } = action;
            return {
                ...state,
                requestDApp: payload,
            };
        }
        case ACTION_CLEAR_REQUEST_FROM_DAPP: {
            return {
                ...state,
                requestDApp: null,
            };
        }
        case ACTION_SET_CAMERA_PERMISSION: {
            return {
                ...state,
                hasCameraPermission: true,
            };
        }
        case ACTION_CHANGE_MODE: {
            return {
                ...state,
                mode: action.payload,
            };
        }
        default:
            return state;
    }
};

const persistConfig = {
    key: 'preload',
    storage,
    whitelist: ['configs', 'server'],
    stateReconciler: autoMergeLevel2,
};

export default persistReducer(persistConfig, preloadReducer);
