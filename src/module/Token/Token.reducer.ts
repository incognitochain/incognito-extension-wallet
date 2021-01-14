import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { uniq } from 'lodash';
import { IFollowedToken, IPTokenFromApi, IPCustomTokenFromApi } from './Token.interface';
import {
    ACTION_FETCHED_PTOKEN_LIST,
    ACTION_FETCHED_PCUSTOMTOKEN_LIST,
    ACTION_FOLLOWED_POPULAR_TOKEN,
    ACTION_SET_FOLLOWED_TOKENS,
    ACTION_FOLLOW_TOKEN_BY_ID,
    ACTION_GET_BALANCE_TOKEN_FETCHING,
    ACTION_GET_BALANCE_TOKEN_FETCHED,
    ACTION_SET_SELECTED_TOKEN,
    ACTION_RESET_FOLLOWED_POPULAR_TOKEN,
} from './Token.constant';

export interface IEnvToken {
    followedPopularIds: boolean;
}

export interface ITokenReducer {
    followed: IFollowedToken[];
    pTokens: IPTokenFromApi[];
    pCustomTokens: IPCustomTokenFromApi[];
    gettingBalance: string[];
    following: any[];
    toggleUnVerified: boolean;
    mainnet: IEnvToken;
    testnet: IEnvToken;
    selectedTokenId: string;
}

const initialState: ITokenReducer = {
    followed: [],
    pTokens: [],
    pCustomTokens: [],
    gettingBalance: [],
    following: [],
    toggleUnVerified: false,
    mainnet: {
        followedPopularIds: false,
    },
    testnet: {
        followedPopularIds: false,
    },
    selectedTokenId: '',
};

const tokenReducer = (
    state = initialState,
    action: {
        type: string;
        payload: any;
    },
) => {
    switch (action.type) {
        case ACTION_FETCHED_PTOKEN_LIST: {
            return {
                ...state,
                pTokens: action.payload,
            };
        }
        case ACTION_FETCHED_PCUSTOMTOKEN_LIST: {
            return {
                ...state,
                pCustomTokens: action.payload,
            };
        }
        case ACTION_FOLLOWED_POPULAR_TOKEN: {
            const { mainnet } = action.payload;
            const field = mainnet ? 'mainnet' : 'testnet';
            const stateField: IEnvToken = state[field];
            return {
                ...state,
                [field]: {
                    ...stateField,
                    followedPopularIds: true,
                },
            };
        }
        case ACTION_RESET_FOLLOWED_POPULAR_TOKEN: {
            const mainnet = action.payload;
            const field = mainnet ? 'mainnet' : 'testnet';
            const stateField: IEnvToken = state[field];
            return {
                ...state,
                [field]: {
                    ...stateField,
                    followedPopularIds: false,
                },
            };
        }
        case ACTION_SET_FOLLOWED_TOKENS: {
            return {
                ...state,
                followed: [...action.payload?.followed] || [],
            };
        }
        case ACTION_GET_BALANCE_TOKEN_FETCHING: {
            const { tokenId } = action.payload;
            return {
                ...state,
                gettingBalance: uniq([...state.gettingBalance, tokenId]),
            };
        }
        case ACTION_GET_BALANCE_TOKEN_FETCHED: {
            const token: IFollowedToken = action.payload;
            return {
                ...state,
                followed: [...state.followed].map((t) => (t.tokenId !== token?.tokenId ? t : token)),
                gettingBalance: [...state.gettingBalance].filter((tokenId: string) => tokenId !== token?.tokenId),
            };
        }
        case ACTION_SET_SELECTED_TOKEN: {
            return { ...state, selectedTokenId: action.payload };
        }

        case ACTION_FOLLOW_TOKEN_BY_ID: {
            return state;
        }
        default:
            return state;
    }
};

const persistConfig = {
    key: 'token',
    storage,
    whitelist: ['mainnet', 'testnet'],
    stateReconciler: autoMergeLevel2,
};

export default persistReducer(persistConfig, tokenReducer);
