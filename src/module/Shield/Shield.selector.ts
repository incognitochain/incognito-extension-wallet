import { IRootState } from 'src/redux/interface';
import { createSelector } from 'reselect';
import { availableTokensSelector } from 'src/module/Token/Token.selector';

export const shieldSelector = createSelector(
    (state: IRootState) => state.shield,
    (shield) => shield,
);

export const shieldDataSelector = createSelector(shieldSelector, (shield) => shield?.data);

export const shieldStorageSelector = createSelector(shieldSelector, (shield) => shield?.storage);

export const availableShieldTokens = createSelector(availableTokensSelector, (tokens) =>
    tokens.filter((token) => !!token.isDeposable),
);
