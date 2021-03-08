import { IRootState } from 'src/redux/interface';
import { createSelector } from 'reselect';

export const profileSelector = createSelector(
    (state: IRootState) => state.profile,
    (profile) => profile,
);
