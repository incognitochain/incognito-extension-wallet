import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { IBridgeShieldReducer } from './BridgeShield.interface';
import BRIDGE_SHIELD_ACTION_NAME from './BridgeShield.actionsName';

const initialState: IBridgeShieldReducer = {
    shieldToken: undefined,
};

const bridgeReducer = (state = initialState, action: { type: string; payload: any }) => {
    switch (action.type) {
        case BRIDGE_SHIELD_ACTION_NAME.SELECT_SHIELD_TOKEN: {
            const { shieldToken } = action.payload;
            return { ...state, shieldToken };
        }
        default:
            return state;
    }
};

const persistConfig = {
    key: 'bridge-shield',
    storage,
    whitelist: [],
    stateReconciler: autoMergeLevel2,
};

export default persistReducer(persistConfig, bridgeReducer);
