import { ACTION_FETCHED, ACTION_FETCH_FAIL } from './Profile.constant';

export interface IProfileReducer {
    data: any;
    fetching: boolean;
}

const initialState: IProfileReducer = {
    data: {},
    fetching: true,
};

const reducer = (
    state = initialState,
    action: {
        type: string;
        payload: any;
    },
) => {
    switch (action.type) {
        case ACTION_FETCH_FAIL: {
            return {
                ...state,
                fetching: false,
            };
        }
        case ACTION_FETCHED: {
            return {
                ...state,
                fetching: false,
                data: { ...action.payload },
            };
        }
        default:
            return state;
    }
};

export default reducer;
