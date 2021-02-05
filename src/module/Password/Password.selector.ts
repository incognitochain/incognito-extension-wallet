import { createSelector } from 'reselect';
import { IRootState } from 'src/redux/interface';
import { IPasswordReducers } from './Password.interface';

export const passwordSelector = createSelector(
    (state: IRootState) => state.password,
    (password: IPasswordReducers) => password.pass,
);

export const newPasswordSelector = createSelector(
    (state: IRootState) => state.password,
    (password: IPasswordReducers) => password.newPass,
);
