export interface IReducer {}

const initialState: IReducer = {};

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
