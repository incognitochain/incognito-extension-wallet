import { COINS } from 'src/constants';
import { isEmpty } from 'lodash';
import { ISendReducer } from './Send.interface';
import {
    ACTION_FETCHING_FEE,
    ACTION_FETCHED_EST_NATIVE_FEE,
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
    ACTION_SET_SENDING,
    ACTION_UPDATE_DATA_FORCE_SEND,
    ACTION_SET_ERROR_MESSAGE,
} from './Send.constant';
import { hasMultiLevelUsersFee, MAX_FEE_PER_TX } from './Send.utils';

const defaultState: ISendReducer = {
    isFetching: false,
    isFetched: false,
    minFeePrv: 0,
    minFeePrvText: '0',
    feePrv: 0,
    feePrvText: '0',
    maxFeePrv: 0,
    maxFeePrvText: '0',
    feePToken: 0,
    feePTokenText: '0',
    feeBurnPToken: 0,
    feeBurnPTokenText: '0',
    minFeePToken: 0,
    minFeePTokenText: '0',
    maxFeePToken: 0,
    maxFeePTokenText: '0',
    amount: 0,
    amountText: '0',
    minAmount: 0,
    minAmountText: '0',
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
    totalFeePrvText: '0',
    userFeePrv: '0',
    totalFeePToken: 0,
    totalFeePTokenText: '0',
    userFeePToken: '0',
    sending: false,
    errorMessage: '',
};

const initialState: ISendReducer = {
    ...defaultState,
    defaultForceSend: undefined,
};

const sendReducer = (
    state = { ...initialState },
    action: {
        type: string;
        payload: any;
    },
) => {
    switch (action.type) {
        case ACTION_SET_SENDING: {
            return {
                ...state,
                sending: !!action.payload,
            };
        }
        case ACTION_INIT: {
            return {
                ...state,
                ...defaultState,
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
        case ACTION_FETCHED_EST_NATIVE_FEE: {
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
                types: [...defaultState.types, action.payload],
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
            return {
                ...state,
                ...action.payload,
            };
        }
        case ACTION_CHANGE_FEE: {
            const { value, isUseTokenFee, valueOriginal } = action.payload;
            const field = isUseTokenFee ? 'feePTokenText' : 'feePrvText';
            const fieldOriginal = isUseTokenFee ? 'feePToken' : 'feePrv';
            return {
                ...state,
                [field]: value,
                [fieldOriginal]: valueOriginal,
            };
        }
        case ACTION_FETCHED_MAX_FEE_PRV: {
            const { maxFeePrv, maxFeePrvText } = action.payload;
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
            return {
                ...state,
                fast2x: !state.fast2x,
            };
        }
        case ACTION_UPDATE_DATA_FORCE_SEND: {
            const { payload } = action;
            return {
                ...state,
                defaultForceSend: payload,
            };
        }
        case ACTION_SET_ERROR_MESSAGE: {
            return {
                ...state,
                errorMessage: action.payload,
            };
        }
        default:
            return state;
    }
};

export default sendReducer;
