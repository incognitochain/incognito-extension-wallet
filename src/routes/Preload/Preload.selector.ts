import { createSelector } from 'reselect';
import { IRootState } from 'src/redux/interface';

export const preloadSelector = createSelector(
  (state: IRootState) => state.preload,
  (preload) => preload
);

export const apiURLSelector = createSelector(
  preloadSelector,
  (preload) => preload.configs.apiURL
);

export const chainURLSelector = createSelector(
  preloadSelector,
  (preload) => preload.configs.chainURL
);

export const isMainnetSelector = createSelector(
  preloadSelector,
  (preload) => preload.configs.mainnet
);
