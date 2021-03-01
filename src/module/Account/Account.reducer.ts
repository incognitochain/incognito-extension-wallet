import { AccountInstance } from 'incognito-js/build/web/browser';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import {
    ACTION_FETCHING_CREATE_ACCOUNT,
    ACTION_FETCHED_CREATE_ACCOUNT,
    ACTION_FETCH_FAIL_CREATE_ACCOUNT,
    ACTION_FETCHING_IMPORT_ACCOUNT,
    ACTION_FETCHED_IMPORT_ACCOUNT,
    ACTION_FETCH_FAIL_IMPORT_ACCOUNT,
    ACTION_SELECT_ACCOUNT,
    ACTION_SET_LIST_ACCOUNT,
    ACTION_SWITCH_ACCOUNT_FETCHING,
    ACTION_SWITCH_ACCOUNT_FETCHED,
    ACTION_GET_ACCOUNT_BALANCE_FETCHING,
    ACTION_GET_ACCOUNT_BALANCE_FETCHED,
    ACTION_SET_SIGN_PUBLIC_KEY_ENCODE,
} from './Account.constant';
import { IAccountReducer } from './Account.interface';

const initialState: IAccountReducer = {
    list: [],
    defaultAccountName: '',
    gettingBalance: [],
    switch: false,
    create: false,
    import: false,
    accountBalance: 0,
    signPublicKeyEncode: '',
};

const accountReducer = (
    state = initialState,
    action: {
        type: string;
        payload: any;
    },
) => {
    switch (action.type) {
        case ACTION_SET_SIGN_PUBLIC_KEY_ENCODE: {
            return {
                ...state,
                signPublicKeyEncode: action.payload,
            };
        }
        case ACTION_FETCHING_CREATE_ACCOUNT: {
            return {
                ...state,
                create: true,
            };
        }
        case ACTION_FETCHED_CREATE_ACCOUNT: {
            const account: AccountInstance = action.payload;
            return {
                ...state,
                create: false,
                defaultAccountName: account.name,
            };
        }
        case ACTION_FETCH_FAIL_CREATE_ACCOUNT: {
            return {
                ...state,
                create: false,
            };
        }
        case ACTION_FETCHING_IMPORT_ACCOUNT: {
            return {
                ...state,
                import: true,
            };
        }
        case ACTION_FETCH_FAIL_IMPORT_ACCOUNT: {
            return {
                ...state,
                import: false,
            };
        }
        case ACTION_FETCHED_IMPORT_ACCOUNT: {
            const account: AccountInstance = action.payload;
            return {
                ...state,
                import: false,
                defaultAccountName: account.name,
            };
        }
        case ACTION_SELECT_ACCOUNT: {
            const defaultAccountName = action.payload;
            return {
                ...state,
                defaultAccountName,
            };
        }
        case ACTION_SET_LIST_ACCOUNT: {
            return {
                ...state,
                list: [...action.payload],
            };
        }
        case ACTION_SWITCH_ACCOUNT_FETCHING: {
            return {
                ...state,
                switch: true,
            };
        }
        case ACTION_SWITCH_ACCOUNT_FETCHED: {
            return {
                ...state,
                switch: false,
            };
        }
        case ACTION_GET_ACCOUNT_BALANCE_FETCHING: {
            const { accountName } = action.payload;
            return {
                ...state,
                gettingBalance: [...state.gettingBalance, accountName],
            };
        }
        case ACTION_GET_ACCOUNT_BALANCE_FETCHED: {
            const { accountName, amount } = action.payload;
            return {
                ...state,
                gettingBalance: state.gettingBalance.filter((name) => name !== accountName),
                accountBalance: amount,
            };
        }
        default:
            return state;
    }
};

const persistConfig = {
    key: 'account',
    storage,
    whitelist: ['defaultAccountName'],
    stateReconciler: autoMergeLevel2,
};

export default persistReducer(persistConfig, accountReducer);
