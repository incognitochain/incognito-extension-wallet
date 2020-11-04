import { IObject } from 'src/utils/interface';

interface IReducer {
  data: IObject;
  init: boolean;
}

const initialState: IReducer = {
  data: {},
  init: false,
};

const walletReducer = (
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

export default walletReducer;
