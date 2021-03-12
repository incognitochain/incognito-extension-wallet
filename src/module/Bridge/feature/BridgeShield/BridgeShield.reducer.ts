import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { IBridgeShieldReducer } from './BridgeShield.interface';

const initialState: IBridgeShieldReducer = {};

const bridgeReducer = (state = initialState, action: { type: string; payload: any }) => {
    switch (action.type) {
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
