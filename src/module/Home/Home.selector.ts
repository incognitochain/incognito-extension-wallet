import { createSelector } from 'reselect';
import { IRootState } from 'src/redux/interface';
import { IHomeReducer } from './Home.reducer';

export const homeSelector = createSelector(
  (state: IRootState) => state.home,
  (home: IHomeReducer) => ({
    ...home,
    categories: home?.configs?.categories || [],
    headerTitle: home?.configs?.headerTitle || '',
  })
);

export const homeAppVersionSelector = createSelector(
  (state: IRootState) => state?.home,
  (home: IHomeReducer) => home.appVersion || ''
);
