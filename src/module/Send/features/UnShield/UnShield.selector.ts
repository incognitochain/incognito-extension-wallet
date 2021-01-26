import { IRootState } from 'src/redux/interface';
import { createSelector } from 'reselect';

export const unShieldSelector = createSelector(
    (state: IRootState) => state.unShield,
    (unShield) => unShield,
);

export const unShieldStorageDataSelector = createSelector(unShieldSelector, (unShield) => unShield?.storage);
