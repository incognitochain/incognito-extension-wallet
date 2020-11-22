import { createSelector } from 'reselect';
import { translateByLanguage } from 'src/i18n';
import { IRootState } from 'src/redux/interface';
import { IConfigsReducer } from './Configs.reducer';

export const configsSelector = createSelector(
  (state: IRootState) => state.configs,
  (configs: IConfigsReducer) => configs
);

export const translateSelector = createSelector(configsSelector, (configs) =>
  translateByLanguage(configs.language)
);

export const translateByFieldSelector = createSelector(
  configsSelector,
  (configs) => (field: string) => translateByLanguage(configs.language)[field]
);
