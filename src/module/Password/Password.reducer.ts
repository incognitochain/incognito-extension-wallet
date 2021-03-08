import {
    ACTION_CREATE_PASSWORD,
    ACTION_CHANGE_PASSWORD,
    ACTION_LOGIN,
    ACTION_LOGOUT,
} from 'src/module/Password/Password.events';
import { IPasswordReducers } from './Password.interface';

const initialState: IPasswordReducers = {
    pass: '',
    newPass: '',
};

export const passwordReducer = (
    state = initialState,
    action: {
        type: string;
        payload: string;
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
        default:
            return state;
    }
};

export default passwordReducer;
