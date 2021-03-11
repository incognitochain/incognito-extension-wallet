import { ACTION_INIT_APP_STATE } from 'src/redux/constants';
import { WalletInstance } from 'incognito-js/build/web/browser';
import cloneDeep from 'lodash/cloneDeep';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import {
    ACTION_LOADED_WALLET,
    ACTION_UPDATE_WALLET,
    ACTION_INITED_MASTER_LESS,
    ACTION_TOGGLE_SWITCH_WALLET,
    ACTION_FETCHING_REMOVE_MASTER_KEY,
    ACTION_FETCHED_REMOVE_MASTER_KEY,
    ACTION_FETCH_FAIL_REMOVE_MASTER_KEY,
    ACTION_REMOVE_MASTERLESS,
} from './Wallet.constant';
import { IWalletReducer } from './Wallet.interface';

const initialState: IWalletReducer = {
    mainnet: {
        ids: [],
        walletId: -1,
        masterlessId: -1,
    },
    testnet: {
        ids: [],
        walletId: -1,
        masterlessId: -1,
    },
    loaded: false,
    wallet: {},
    switch: false,
    remove: false,
    import: false,
};

const walletReducer = (
    state = initialState,
    action: {
        type: string;
        payload: any;
    },
) => {
    switch (action.type) {
        case ACTION_INIT_APP_STATE: {
            return { ...initialState };
        }
        case ACTION_LOADED_WALLET: {
            const { wallet, mainnet, walletId } = action.payload;
            const field = mainnet ? 'mainnet' : 'testnet';
            const walletIds = state[field].ids;
            return {
                ...state,
                [field]: {
                    ...state[field],
                    walletId,
                    ids: walletIds.includes(walletId) ? [...walletIds] : [...walletIds, walletId],
                },
                wallet: cloneDeep(wallet),
                loaded: true,
            };
        }
        case ACTION_UPDATE_WALLET: {
            const wallet: WalletInstance = action.payload;
            return {
                ...state,
                wallet,
            };
        }
        case ACTION_INITED_MASTER_LESS: {
            const { mainnet, walletId } = action.payload;
            const field = mainnet ? 'mainnet' : 'testnet';
            const walletState = state[field];
            return {
                ...state,
                [field]: {
                    ...walletState,
                    masterlessId: walletId,
                },
            };
        }
        case ACTION_TOGGLE_SWITCH_WALLET: {
            return {
                ...state,
                switch: action.payload,
            };
        }
        case ACTION_FETCHING_REMOVE_MASTER_KEY: {
            return {
                ...state,
                remove: true,
            };
        }
        case ACTION_FETCHED_REMOVE_MASTER_KEY: {
            const {
                walletId,
                mainnet,
                wallet,
                walletIdWillSwitch,
            }: {
                walletId: number;
                mainnet: boolean;
                walletIdWillSwitch: number;
                wallet: WalletInstance;
            } = action.payload;
            const field = mainnet ? 'mainnet' : 'testnet';
            const walletState = state[field];
            const { ids } = walletState;
            return {
                ...state,
                remove: false,
                [field]: {
                    ...walletState,
                    ids: [...ids].filter((item: number) => item !== walletId),
                    walletId: walletIdWillSwitch,
                },
                wallet: cloneDeep(wallet),
            };
        }
        case ACTION_FETCH_FAIL_REMOVE_MASTER_KEY: {
            return {
                ...state,
                remove: false,
            };
        }
        case ACTION_REMOVE_MASTERLESS: {
            const { mainnet } = action.payload;
            const field = mainnet ? 'mainnet' : 'testnet';
            const walletState = state[field];
            const { ids, masterlessId } = walletState;
            return {
                ...state,
                remove: false,
                [field]: {
                    ...walletState,
                    ids: [...ids].filter((item: number) => item !== masterlessId),
                    masterlessId: -1,
                },
            };
        }
        default:
            return state;
    }
};

const persistConfig = {
    key: 'wallet',
    storage,
    whitelist: ['mainnet', 'testnet'],
    stateReconciler: autoMergeLevel2,
};

export default persistReducer(persistConfig, walletReducer);
