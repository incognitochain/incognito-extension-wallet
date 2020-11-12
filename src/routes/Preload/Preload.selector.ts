import { createSelector } from 'reselect';
import { IRootState } from 'src/redux/interface';

export const preloadSelector = createSelector(
  (state: IRootState) => state.preload,
  (preload) => preload
);
