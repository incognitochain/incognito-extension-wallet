import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { ENVS } from 'src/configs';
import { MAIN_NET_SERVER, PRODUCTION_API } from 'src/services';
import { ACTION_FETCHING, ACTION_FETCHED } from './Preload.constant';

export interface IPreloadConfigs {
  chainURL: string;
  apiURL: string;
  mainnet: boolean;
  wasmPath: string;
}

export interface IPreloadReducer {
  isFetched: boolean;
  isFetching: boolean;
  configs: IPreloadConfigs;
  server: object;
}

const initialState: IPreloadReducer = {
  isFetching: false,
  isFetched: false,
  configs: {
    chainURL: MAIN_NET_SERVER.address,
    apiURL: PRODUCTION_API,
    mainnet: true,
    wasmPath: `${ENVS.REACT_APP_DOMAIN_URL}/privacy.wasm`,
  },
  server: MAIN_NET_SERVER,
};

const preloadReducer = (
  state = initialState,
  action: {
    type: string;
    payload: any;
  }
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
      };
    }
    default:
      return state;
  }
};

const persistConfig = {
  key: 'preload',
  storage,
  whitelist: ['configs', 'server'],
  stateReconciler: autoMergeLevel2,
};

export default persistReducer(persistConfig, preloadReducer);
