import { WalletInstance } from 'incognito-js/build/web/browser';
import cloneDeep from 'lodash/cloneDeep';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { ACTION_FETCHED, ACTION_LOAD_WALLET, ACTION_UPDATE_WALLET } from './Wallet.constant';
import { IPayloadInitWallet, IWalletReducer } from './Wallet.interface';

const initialState: IWalletReducer = {
    mainnet: {
        init: false,
        ids: [],
        walletId: -1,
    },
    testnet: {
        init: false,
        ids: [],
        walletId: -1,
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
        case ACTION_FETCHED: {
            const { mainnet, wallet, walletId }: IPayloadInitWallet = action.payload;
            const field = mainnet ? 'mainnet' : 'testnet';
            return {
                ...state,
                [field]: {
                    ...state[field],
                    init: true,
                    walletId,
                    ids: [...state[field].ids, walletId],
                },
                wallet: cloneDeep(wallet),
                loaded: true,
            };
        }
        case ACTION_LOAD_WALLET: {
            const wallet: WalletInstance = action.payload;
            return {
                ...state,
                loaded: true,
                wallet,
            };
        }
        case ACTION_UPDATE_WALLET: {
            const wallet: WalletInstance = action.payload;
            return {
                ...state,
                wallet,
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
