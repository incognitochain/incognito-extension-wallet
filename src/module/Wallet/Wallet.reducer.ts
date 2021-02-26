import { WalletInstance } from 'incognito-js/build/web/browser';
import cloneDeep from 'lodash/cloneDeep';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { ACTION_LOADED_WALLET, ACTION_UPDATE_WALLET, ACTION_INITED_MASTER_LESS } from './Wallet.constant';
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
};

const walletReducer = (
    state = initialState,
    action: {
        type: string;
        payload: any;
    },
) => {
    switch (action.type) {
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
            const { ids } = walletState;
            return {
                ...state,
                [field]: {
                    ...walletState,
                    ids: [...ids, walletId],
                    masterlessId: walletId,
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
