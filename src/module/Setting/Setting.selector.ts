import { createSelector } from 'reselect';
import { IRootState } from 'src/redux/interface';

export const settingSelector = createSelector(
    (state: IRootState) => state.setting,
    (setting) => setting,
);

export const devSettingSelector = createSelector(settingSelector, (setting) => setting.dev);

export const decimalDigitsSelector = createSelector(settingSelector, (setting) => setting.decimalDigits);
