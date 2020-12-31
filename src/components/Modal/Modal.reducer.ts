import { ACTION_TOGGLE_MODAL, ACTION_TOGGLE_LOADING_MODAL } from './Modal.constant';

export interface IModalReducer {
    visible: boolean;
    data: any;
    isLoadingModal?: boolean;
}

const initialState: IModalReducer = {
    visible: false,
    data: null,
    isLoadingModal: false,
};

const reducer = (
    state = initialState,
    action: {
        type: string;
        payload: any;
    },
) => {
    switch (action.type) {
        case ACTION_TOGGLE_MODAL: {
            return {
                ...state,
                ...action.payload,
            };
        }
        case ACTION_TOGGLE_LOADING_MODAL: {
            return {
                ...state,
            };
        }
        default:
            return state;
    }
};

export default reducer;
