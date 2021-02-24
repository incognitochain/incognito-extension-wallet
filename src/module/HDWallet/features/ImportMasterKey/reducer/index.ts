import { IReducer } from '../ImportMasterKey.interface';

const initialState: IReducer = {
    masterKeyName: '',
    mnemonic: '',
};

const reducer = (
    state = initialState,
    action: {
        type: string;
        payload: any;
    },
) => {
    switch (action.type) {
        case '': {
            return {
                ...state,
            };
        }
        default:
            return state;
    }
};

export default reducer;
