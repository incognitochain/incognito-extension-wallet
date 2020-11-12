import {
  IHistoryReceiveToken,
  IHistoryToken,
  IPToken,
} from './Token.interface';

export const LIMIT_RECEIVE_HISTORY_ITEM = 20;
export const MAX_LIMIT_RECEIVE_HISTORY_ITEM = 50;

export interface ITokenReducer {
  followed: any[];
  pTokens: IPToken[];
  internalTokens: any[];
  gettingBalance: any[];
  following: any[];
  toggleUnVerified: boolean;
  history: IHistoryToken;
  receiveHistory: IHistoryReceiveToken;
}

const initialState: ITokenReducer = {
  followed: [],
  pTokens: [],
  internalTokens: [],
  gettingBalance: [],
  following: [],
  toggleUnVerified: false,
  history: {
    isFetching: false,
    isFetched: false,
    histories: [],
    refreshing: true,
  },
  receiveHistory: {
    isFetching: false,
    isFetched: false,
    data: [],
    oversize: false,
    page: 0,
    limit: LIMIT_RECEIVE_HISTORY_ITEM,
    refreshing: true,
    tokenId: '',
    notEnoughData: false,
  },
};

const reducer = (
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

export default reducer;
