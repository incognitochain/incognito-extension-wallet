interface IReducer {}

const initialState: IReducer = {};

const homeReducer = (
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

export default homeReducer;
