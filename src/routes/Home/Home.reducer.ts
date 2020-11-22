import { persistReducer } from 'redux-persist';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';
import localStorage from 'redux-persist/es/storage';
import { IAction } from 'src/redux/interface';
import {
  ACTION_FETCHING,
  ACTION_FETCHED,
  ACTION_FETCH_FAIL,
} from './Home.constant';

export interface IHomeReducer {
  isFetching: boolean;
  isFetched: boolean;
  configs: {
    categories: any[];
    headerTitle: string;
  };
  defaultConfigs: any;
  appVersion: any;
}

const initialState: IHomeReducer = {
  isFetching: false,
  isFetched: false,
  configs: {
    categories: [],
    headerTitle: '',
  },
  defaultConfigs: null,
  appVersion: {},
};

const homeReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case ACTION_FETCHING: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case ACTION_FETCHED: {
      const { configs, appVersion } = action.payload;
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        configs: { ...configs },
        defaultConfigs: { ...configs },
        appVersion: { ...appVersion },
      };
    }
    case ACTION_FETCH_FAIL: {
      return {
        ...state,
        isFetched: false,
        isFetching: false,
      };
    }
    default:
      return state;
  }
};

const persistConfig = {
  key: 'home',
  storage: localStorage,
  whitelist: ['defaultConfigs'],
  stateReconciler: autoMergeLevel1,
};

export default persistReducer(persistConfig, homeReducer);
