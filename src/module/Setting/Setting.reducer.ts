import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { DEFAULT_THEME, ITheme, lightTheme, darkTheme } from 'src/styles';
import {
    ACTION_TOGGLE_HOME_CONFIGS,
    ACTION_TOGGLE_DECIMAL_DIGITS,
    ACTION_TOGGLE_DEV_MODE,
    ACTION_TOGGLE_MODE_SAVE_BURN_TX,
    ACTION_TOGGLE_MODE_SAVE_RAW_BURN_TX,
    ACTION_TOGGLE_DARK_MODE,
} from './Setting.constant';

export interface ISettingReducer {
    dev: {
        stagingHomeConfigs: boolean;
        toggleSaveBurnTx: boolean;
        toggleSaveRawBurnTx: boolean;
    };
    isDev: boolean;
    decimalDigits: boolean;
    darkMode: boolean;
    theme: ITheme;
}

const initialState: ISettingReducer = {
    dev: {
        stagingHomeConfigs: false,
        toggleSaveBurnTx: false,
        toggleSaveRawBurnTx: false,
    },
    decimalDigits: true,
    isDev: false,
    darkMode: true,
    theme: DEFAULT_THEME,
};

const settingReducer = (
    state = initialState,
    action: {
        type: string;
        payload: any;
    },
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
        case ACTION_TOGGLE_DECIMAL_DIGITS: {
            return {
                ...state,
                decimalDigits: !state?.decimalDigits,
            };
        }
        case ACTION_TOGGLE_DEV_MODE: {
            return {
                ...state,
                isDev: !state.isDev,
            };
        }
        case ACTION_TOGGLE_MODE_SAVE_BURN_TX: {
            return {
                ...state,
                dev: { ...state.dev, toggleSaveBurnTx: !state.dev.toggleSaveBurnTx },
            };
        }
        case ACTION_TOGGLE_MODE_SAVE_RAW_BURN_TX: {
            return {
                ...state,
                dev: { ...state.dev, toggleSaveRawBurnTx: !state.dev.toggleSaveRawBurnTx },
            };
        }
        case ACTION_TOGGLE_DARK_MODE: {
            return {
                ...state,
                darkMode: !state?.darkMode,
                theme: state?.darkMode ? lightTheme : darkTheme,
            };
        }
        default:
            return state;
    }
};

const persistConfig = {
    key: 'setting',
    storage,
    whitelist: ['dev', 'decimalDigits', 'darkMode', 'theme'],
    stateReconciler: autoMergeLevel2,
};

export default persistReducer(persistConfig, settingReducer);
