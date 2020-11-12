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
