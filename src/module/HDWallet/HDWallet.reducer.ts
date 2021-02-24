import { combineReducers } from 'redux';
import { createMasterKeyReducer } from './features/CreateMasterKey';
import { importMasterKeyReducer } from './features/ImportMasterKey';
import { ACTION_SET_ACTION_TYPE } from './HDWallet.constant';
import { IRootReducer } from './HDWallet.interface';

const initialState: IRootReducer = {
    actionType: -1,
};

const rootReducer = (
    state = initialState,
    action: {
        type: string;
        payload: any;
    },
) => {
    switch (action.type) {
        case ACTION_SET_ACTION_TYPE: {
            return {
                ...state,
                actionType: action.payload,
            };
        }
        default:
            return state;
    }
};

export default combineReducers({
    create: createMasterKeyReducer,
    import: importMasterKeyReducer,
    root: rootReducer,
});
