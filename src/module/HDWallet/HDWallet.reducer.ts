import cloneDeep from 'lodash/cloneDeep';
import { combineReducers } from 'redux';
import { createMasterKeyReducer } from './features/CreateMasterKey';
import { importMasterKeyReducer } from './features/ImportMasterKey';
import { ACTION_UPDATE_MASTER_KEY, ACTION_SET_ACTION_TYPE, ACTION_LOADED_LIST_MASTER_KEY } from './HDWallet.constant';
import { IRootReducer, IMasterKey } from './HDWallet.interface';

const initialState: IRootReducer = {
    actionType: -1,
    list: [],
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
        case ACTION_LOADED_LIST_MASTER_KEY: {
            const list: IMasterKey[] = action.payload;
            return {
                ...state,
                list: cloneDeep(list),
            };
        }
        case ACTION_UPDATE_MASTER_KEY: {
            const { list } = state;
            const { walletId, wallet } = action.payload;
            return {
                ...state,
                list: list.map((item: IMasterKey) => ({
                    ...item,
                    wallet: walletId === item.walletId ? cloneDeep(wallet) : item.wallet,
                })),
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
