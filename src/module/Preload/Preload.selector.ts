import { createSelector } from 'reselect';
import { IRootState } from 'src/redux/interface';

export const preloadSelector = createSelector(
  (state: IRootState) => state.preload,
  (preload) => preload
);

export const chainURLSelector = createSelector(
  preloadSelector,
  (preload) => preload.configs.chainURL
);

export const isMainnetSelector = createSelector(
  preloadSelector,
  (preload) => preload.configs.mainnet
);

export const serverSelector = createSelector(
  preloadSelector,
  (preload) => preload.server || {}
);

export const apiURLSelector = createSelector(
  serverSelector,
  (server) => server.apiURL
);

export const apiURL2Selector = createSelector(
  serverSelector,
  (server) => server.api2URL
);
