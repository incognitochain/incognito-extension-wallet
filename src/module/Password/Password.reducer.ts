import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import {
    ACTION_CREATE_PASSWORD,
    ACTION_CHANGE_PASSWORD,
    ACTION_LOGIN,
    ACTION_LOGOUT,
    ACTION_TOGGLE_FORGET_PASSWORD,
} from 'src/module/Password/Password.events';
import { IPasswordReducers } from './Password.interface';

const initialState: IPasswordReducers = {
    pass: '',
    newPass: '',
    forgetPassword: false,
};

export const passwordReducer = (
    state = initialState,
    action: {
        type: string;
        payload: any;
    },
) => {
    switch (action.type) {
        case ACTION_CREATE_PASSWORD: {
            return {
                ...state,
                newPass: action.payload,
            };
        }
        case ACTION_CHANGE_PASSWORD:
        case ACTION_LOGIN: {
            return {
                ...state,
                pass: action.payload,
            };
        }
        case ACTION_LOGOUT: {
            return {
                ...state,
                pass: '',
                newPass: '',
            };
        }
        case ACTION_TOGGLE_FORGET_PASSWORD: {
            return {
                ...state,
                forgetPassword: action.payload,
            };
        }
        default:
            return state;
    }
};

const persistConfig = {
    key: 'password',
    storage,
    whitelist: ['forgetPassword'],
    stateReconciler: autoMergeLevel2,
};

export default persistReducer(persistConfig, passwordReducer);
