import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { IBridgeReducer } from './Bridge.inteface';
import { TAB_SELECTOR } from './Bridge.constant';
import BRIDGE_ACTION_NAME from './Bridge.actionsName'; // defaults to localStorage for web

const initialState: IBridgeReducer = {
    tabSelect: TAB_SELECTOR.SHIELD,
    accountsMetamask: [],
};

const bridgeReducer = (state = initialState, action: { type: string; payload: any }) => {
    switch (action.type) {
        case BRIDGE_ACTION_NAME.CHANGE_HEADER_TAB: {
            const { tab } = action.payload;
            return {
                ...state,
                tabSelect: tab,
            };
        }
        case BRIDGE_ACTION_NAME.UPDATE_METAMASK_CONNECT_ACCOUNT: {
            const { accounts } = action.payload;
            return {
                ...state,
                accountsMetamask: accounts,
            };
        }
        default:
            return state;
    }
};

const persistConfig = {
    key: 'bridge',
    storage,
    whitelist: [],
    stateReconciler: autoMergeLevel2,
};

export default persistReducer(persistConfig, bridgeReducer);
