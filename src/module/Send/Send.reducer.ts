import { COINS } from 'src/constants';
import { IFeeTypes, IUserFeesData } from './Send.interface';
import {
  ACTION_FETCHING_FEE,
  ACTION_FETCHED_FEE,
  ACTION_FETCH_FAIL_FEE,
  ACTION_ADD_FEE_TYPE,
  ACTION_CHANGE_FEE_TYPE,
  ACTION_FETCHED_PTOKEN_FEE,
  ACTION_FETCHED_MIN_PTOKEN_FEE,
  ACTION_CHANGE_FEE,
  ACTION_INIT,
  ACTION_INIT_FETCHED,
  ACTION_FETCHED_MAX_FEE_PRV,
  ACTION_FETCHED_MAX_FEE_PTOKEN,
  ACTION_FETCHED_VALID_ADDR,
  ACTION_FETCHED_USER_FEES,
  ACTION_FETCHING_USER_FEES,
  ACTION_TOGGLE_FAST_FEE,
  ACTION_REMOVE_FEE_TYPE,
  ACTION_FETCH_FAIL_USER_FEES,
} from './Send.constant';
import { hasMultiLevelUsersFee, MAX_FEE_PER_TX } from './Send.utils';
import { isEmpty } from 'lodash';

export interface ISendReducer {
  isFetching: boolean;
  isFetched: boolean;
  minFeePrv: number;
  minFeePrvText: string;
  feePrv: number;
  feePrvText: string;
  maxFeePrv: number;
  maxFeePrvText: string;
  feePToken: number;
  feePTokenText: string;
  feeBurnPToken: number;
  feeBurnPTokenText: string;
  minFeePToken: number;
  minFeePTokenText: string;
  maxFeePToken: number;
  maxFeePTokenText: string;
  amount: number;
  amountText: string;
  minAmount: number;
  minAmountText: string;
  init: boolean;
  screen: string;
  types: IFeeTypes[];
  actived: string;
  rate: number;
  isAddressValidated: boolean;
  isValidETHAddress: boolean;
  userFees: {
    isFetching: boolean;
    isFetched: boolean;
    data: IUserFeesData | any;
    hasMultiLevel: boolean;
    isMemoRequired: boolean;
  };
  isValidating: boolean;
  fast2x: boolean;
  totalFeePrv: number;
  totalFeePrvText: string;
  userFeePrv: number;
  totalFeePToken: number;
  totalFeePTokenText: string;
  userFeePToken: number;
}

const initialState: ISendReducer = {
  isFetching: false,
  isFetched: false,
  minFeePrv: 0,
  minFeePrvText: '',
  feePrv: 0,
  feePrvText: '',
  maxFeePrv: 0,
  maxFeePrvText: '',
  feePToken: 0,
  feePTokenText: '',
  feeBurnPToken: 0,
  feeBurnPTokenText: '',
  minFeePToken: 0,
  minFeePTokenText: '',
  maxFeePToken: 0,
  maxFeePTokenText: '',
  amount: 0,
  amountText: '',
  minAmount: 0,
  minAmountText: '',
  init: false,
  screen: '',
  types: [
    {
      tokenId: COINS.PRV.id,
      symbol: COINS.PRV.symbol,
    },
  ],
  actived: COINS.PRV.id,
  rate: 1,
  isAddressValidated: true,
  isValidETHAddress: true,
  userFees: {
    isFetching: false,
    isFetched: false,
    data: null,
    hasMultiLevel: false,
    isMemoRequired: false,
  },
  isValidating: false,
  fast2x: false,
  totalFeePrv: 0,
  totalFeePrvText: '',
  userFeePrv: 0,
  totalFeePToken: 0,
  totalFeePTokenText: '',
  userFeePToken: 0,
};

const sendReducer = (
  state = initialState,
  action: {
    type: string;
    payload: any;
  }
) => {
  switch (action.type) {
    case ACTION_INIT: {
      return {
        ...initialState,
      };
    }
    case ACTION_INIT_FETCHED: {
      return {
        ...state,
        ...action.payload,
        init: true,
      };
    }
    case ACTION_FETCHED_MIN_PTOKEN_FEE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case ACTION_FETCHING_FEE: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case ACTION_FETCHED_FEE: {
      return {
        ...state,
        isFetched: true,
        isFetching: false,
        ...action.payload,
      };
    }
    case ACTION_FETCH_FAIL_FEE: {
      return {
        ...state,
        isFetching: false,
        feePrv: MAX_FEE_PER_TX,
      };
    }
    case ACTION_ADD_FEE_TYPE: {
      const { tokenId } = action.payload;
      const isExisted = state.types.some((item) => item?.tokenId === tokenId);
      if (tokenId === COINS.PRV.id || isExisted) {
        return state;
      }
      return {
        ...state,
        types: [...initialState.types, action.payload],
      };
    }
    case ACTION_REMOVE_FEE_TYPE: {
      const { tokenId } = action.payload;
      if (tokenId === COINS.PRV.id) {
        return state;
      }
      return {
        ...state,
        types: [...state?.types.filter((item) => item?.tokenId !== tokenId)],
      };
    }
    case ACTION_CHANGE_FEE_TYPE: {
      return {
        ...state,
        actived: action.payload,
      };
    }
    case ACTION_FETCHED_PTOKEN_FEE: {
      console.debug(`aaaa`, action.payload);
      return {
        ...state,
        ...action.payload,
      };
    }
    case ACTION_CHANGE_FEE: {
      const { value, isUseTokenFee, valueOriginal } = action.payload;
      const field = isUseTokenFee ? 'feePTokenText' : 'feePrvText';
      const fieldOriginal = isUseTokenFee ? 'feePToken' : 'feePrv';
      // const valueToNumber = convert.toString({
      //   text: value,
      //   autoCorrect: true,
      //   toString: true,
      // });
      // const valueOriginal = convert.toOriginalAmount({
      //   humanAmount: valueToNumber,
      //   decimals: feePDecimals,
      //   round: false,
      // });
      return {
        ...state,
        [field]: value,
        [fieldOriginal]: valueOriginal,
      };
    }
    case ACTION_FETCHED_MAX_FEE_PRV: {
      const { maxFeePrv, maxFeePrvText } = action.payload;
      // const maxFeePrv = accountBalance;
      // const maxFeePrvText = format.formatAmount({
      //   originalAmount: maxFeePrv,
      //   decimalDigits: false,
      //   decimals: COINS.PRV.pDecimals,
      //   clipAmount: false,
      // });
      return {
        ...state,
        maxFeePrv,
        maxFeePrvText,
      };
    }
    case ACTION_FETCHED_MAX_FEE_PTOKEN: {
      const { amount, amountText } = action.payload;
      return {
        ...state,
        amount,
        amountText,
        maxFeePToken: amount,
        maxFeePTokenText: amountText,
      };
    }
    case ACTION_FETCHED_VALID_ADDR: {
      const { isAddressValidated, isValidETHAddress } = action.payload;
      return {
        ...state,
        isAddressValidated,
        isValidETHAddress,
      };
    }
    case ACTION_FETCHED_USER_FEES: {
      const data = action.payload;
      if (isEmpty(data)) {
        return {
          ...state,
          userFees: {
            ...state.userFees,
            fetching: false,
          },
        };
      }
      const hasMultiLevel = hasMultiLevelUsersFee(data);
      return {
        ...state,
        userFees: {
          ...state.userFees,
          isFetched: true,
          isFetching: false,
          data: { ...data },
          hasMultiLevel,
          isMemoRequired: false,
        },
      };
    }
    case ACTION_FETCHING_USER_FEES: {
      return {
        ...state,
        userFees: {
          ...state.userFees,
          isFetching: true,
        },
      };
    }
    case ACTION_FETCH_FAIL_USER_FEES: {
      const prevIsMemoRequired = state?.userFees?.isMemoRequired;
      return {
        ...state,
        userFees: {
          ...state.userFees,
          isFetching: false,
          isFetched: false,
          isMemoRequired: action?.payload || prevIsMemoRequired,
        },
      };
    }
    case ACTION_TOGGLE_FAST_FEE: {
      const {
        fast2x,
        totalFee,
        totalFeeText,
        userFee,
        isUsedPRVFee,
      } = action.payload;
      const totalFeeField = isUsedPRVFee ? 'totalFeePrv' : 'totalFeePToken';
      const totalFeeTextField = isUsedPRVFee
        ? 'totalFeePrvText'
        : 'totalFeePTokenText';
      const userFeeField = isUsedPRVFee ? 'userFeePrv' : 'userFeePToken';
      return {
        ...state,
        fast2x,
        [totalFeeField]: totalFee,
        [totalFeeTextField]: totalFeeText,
        [userFeeField]: userFee,
      };
    }
    default:
      return state;
  }
};

export default sendReducer;
