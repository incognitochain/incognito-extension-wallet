import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { IShieldReducer } from './Shield.interface';
import {
    ACTION_FETCHING,
    ACTION_FETCHED,
    ACTION_FETCH_FAIL,
    ACTION_TOGGLE_GUIDE,
    ACTION_FREE_SHIELD,
} from './Shield.constant';

const initialState: IShieldReducer = {
    isFetching: false,
    isFetched: false,
    data: {
        min: '0',
        max: '0',
        address: '',
    },
    storage: {
        guide: false,
    },
};

const shieldReducer = (
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
                data: { ...action.payload },
            };
        }
        case ACTION_FETCH_FAIL: {
            return {
                ...state,
                isFetched: false,
                isFetching: false,
            };
        }
        case ACTION_TOGGLE_GUIDE: {
            return {
                ...state,
                storage: {
                    ...state.storage,
                    guide: true,
                },
            };
        }
        case ACTION_FREE_SHIELD: {
            return initialState;
        }
        default:
            return state;
    }
};

const persistConfig = {
    key: 'shield',
    storage,
    whitelist: ['storage'],
    stateReconciler: autoMergeLevel2,
};

export default persistReducer(persistConfig, shieldReducer);
