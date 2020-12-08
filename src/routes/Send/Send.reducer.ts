export interface ISendReducer {}

const initialState: ISendReducer = {};

const sendReducer = (
  state = initialState,
  action: {
    type: string;
    payload: object;
  }
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

export default sendReducer;
