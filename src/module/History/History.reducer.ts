import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import {
    ACTION_FETCHED_CACHE_HISTORY,
    ACTION_FETCHING_CACHE_HISTORY,
    LIMIT_RECEIVE_HISTORY_ITEM,
    ACTION_FETCHING_RECEIVE_HISTORY,
    ACTION_FETCHED_RECEIVE_HISTORY,
    ACTION_FETCH_FAIL_RECEIVE_HISTORY,
    ACTION_FREE_HISTORY,
} from './History.constant';
import { IHistoryReducer } from './History.interface';

const initialState: IHistoryReducer = {
    cacheHistory: {
        fetching: false,
        histories: [],
    },
    receiveHistory: {
        isFetching: false,
        isFetched: false,
        data: [],
        oversize: false,
        page: 0,
        limit: LIMIT_RECEIVE_HISTORY_ITEM,
        refreshing: true,
        tokenId: '',
        notEnoughData: false,
    },
};

const historyReducer = (
    state = initialState,
    action: {
        type: string;
        payload: any;
    },
) => {
    switch (action.type) {
        case ACTION_FETCHING_CACHE_HISTORY: {
            return {
                ...state,
                cacheHistory: {
                    ...state.cacheHistory,
                    fetching: true,
                },
            };
        }
        case ACTION_FETCHED_CACHE_HISTORY: {
            const { histories } = action.payload;
            return {
                ...state,
                cacheHistory: {
                    ...state.cacheHistory,
                    fetching: false,
                    histories,
                },
            };
        }
        case ACTION_FETCHING_RECEIVE_HISTORY: {
            return {
                ...state,
                receiveHistory: {
                    ...state.receiveHistory,
                    isFetching: true,
                    refreshing: action?.payload?.refreshing || false,
                    notEnoughData: state.receiveHistory.notEnoughData,
                },
            };
        }
        case ACTION_FETCHED_RECEIVE_HISTORY: {
            const { nextPage, data, oversize, refreshing, notEnoughData } = action?.payload;
            return {
                ...state,
                receiveHistory: {
                    ...state.receiveHistory,
                    isFetching: false,
                    isFetched: true,
                    data: [...data],
                    page: refreshing ? state?.receiveHistory?.page : nextPage,
                    oversize,
                    refreshing: false,
                    notEnoughData,
                },
            };
        }
        case ACTION_FETCH_FAIL_RECEIVE_HISTORY: {
            return {
                ...state,
                receiveHistory: {
                    ...state.receiveHistory,
                    isFetching: false,
                    isFetched: false,
                    refreshing: false,
                    notEnoughData: false,
                },
            };
        }
        case ACTION_FREE_HISTORY: {
            return { ...initialState };
        }
        default:
            return state;
    }
};

const persistConfig = {
    key: 'history',
    storage,
    whitelist: [],
    stateReconciler: autoMergeLevel2,
};

export default persistReducer(persistConfig, historyReducer);
