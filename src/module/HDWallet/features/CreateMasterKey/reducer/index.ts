import shuffle from 'lodash/shuffle';
import { IReducer } from '../CreateMasterKey.interface';
import {
    ACTION_SET_MNEMONIC,
    ACTION_TOGGLE_AGREE,
    ACTION_SET_MASTER_KEY_NAME,
    ACTION_SET_STEP,
    ACTION_INIT_CREATE,
    ACTION_TOGGLE_SELECTED_WORD_INDEX,
} from '../CreateMasterKey.constant';

const initialState: IReducer = {
    masterKeyName: '',
    mnemonic: '',
    agree: false,
    step: -1,
    randomWords: [],
    selectedWordsIndex: [],
};

const reducer = (
    state = initialState,
    action: {
        type: string;
        payload: any;
    },
) => {
    switch (action.type) {
        case ACTION_TOGGLE_AGREE: {
            return {
                ...state,
                agree: !state.agree,
            };
        }
        case ACTION_SET_MASTER_KEY_NAME: {
            return {
                ...state,
                masterKeyName: action.payload,
            };
        }
        case ACTION_SET_STEP: {
            return {
                ...state,
                step: action.payload,
            };
        }
        case ACTION_SET_MNEMONIC: {
            const mnemonic = action.payload;
            return {
                ...state,
                mnemonic,
                randomWords: shuffle(mnemonic.split(' ')),
            };
        }
        case ACTION_INIT_CREATE: {
            return { ...initialState };
        }
        case ACTION_TOGGLE_SELECTED_WORD_INDEX: {
            const { selectedWordsIndex } = state;
            const index = action.payload;
            return {
                ...state,
                selectedWordsIndex: selectedWordsIndex.includes(index)
                    ? [...selectedWordsIndex].filter((item) => item !== index)
                    : [...selectedWordsIndex, index],
            };
        }
        default:
            return state;
    }
};

export default reducer;
