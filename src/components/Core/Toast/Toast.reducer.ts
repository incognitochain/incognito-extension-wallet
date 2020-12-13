import Exception from 'src/http/exception/ex';
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
  value: any;
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
      let {
        type,
        toggle,
        value,
      }: {
        type: number;
        toggle: boolean;
        value: any;
      } = action.payload;
      if (type === TOAST_CONFIGS.error) {
        if (value instanceof Error) {
          value = value?.message || JSON.stringify(value);
        }
      }
      return {
        ...state,
        type,
        toggle,
        value,
      };
    }
    default:
      return state;
  }
};

export default reducer;
