import { createSelector } from 'reselect';
import { IRootState } from 'src/redux/interface';
import { IToastReducer } from './Toast.reducer';

export const toastSelector = createSelector(
    (state: IRootState) => state.toast,
    (toast: IToastReducer) => toast,
);
