import { IObject } from 'src/utils';
import { ACTION_TOGGLE_TOAST } from './Toast.constant';

export const TOAST_CONFIGS = {
  error: -1,
  success: 0,
  warning: 1,
  custom: 2,
};

export const TOAST_CONFIGS_CLASSNAME: IObject = {
  '-1': 'error',
  '0': 'success',
  '1': 'warning',
  '2': 'custom',
};

export interface IToastReducer {
  value: string;
  type: number;
  toggle: boolean;
}

const initialState: IToastReducer = {
  value: '',
  type: 0,
  toggle: false,
};

const reducer = (
  state = initialState,
  action: {
    type: string;
    payload: any;
  }
) => {
  switch (action.type) {
    case ACTION_TOGGLE_TOAST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;
