import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { ACTION_TOGGLE_HOME_CONFIGS } from './Setting.constant';

export interface ISettingReducer {
  dev: {
    stagingHomeConfigs: boolean;
  };
}

const initialState: ISettingReducer = {
  dev: {
    stagingHomeConfigs: false,
  },
};

const settingReducer = (
  state = initialState,
  action: {
    type: string;
    payload: any;
  }
) => {
  switch (action.type) {
    case ACTION_TOGGLE_HOME_CONFIGS: {
      return {
        ...state,
        dev: {
          ...state.dev,
          stagingHomeConfigs: !state.dev.stagingHomeConfigs,
        },
      };
    }
    default:
      return state;
  }
};

const persistConfig = {
  key: 'setting',
  storage,
  whitelist: ['dev'],
  stateReconciler: autoMergeLevel2,
};

export default persistReducer(persistConfig, settingReducer);
