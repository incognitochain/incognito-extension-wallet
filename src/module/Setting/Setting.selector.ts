import { createSelector } from 'reselect';
import { IRootState } from 'src/redux/interface';
import { TESTNET_SERVER, MAINNET_SERVER, LOCAL_SERVER } from 'src/services';
import { isDev as isDevelop } from 'src/configs';

export const settingSelector = createSelector(
    (state: IRootState) => state.setting,
    (setting) => setting,
);

export const devSettingSelector = createSelector(settingSelector, (setting) => setting.dev);

export const decimalDigitsSelector = createSelector(settingSelector, (setting) => setting.decimalDigits);

export const isDevSelector = createSelector(settingSelector, (setting) => !!setting.isDev || !!isDevelop);

export const defaultListServerSelector = createSelector(isDevSelector, (isDev) => [
    LOCAL_SERVER,
    MAINNET_SERVER,
    ...(isDev ? [TESTNET_SERVER] : []),
]);

export const toggleSaveBurnTxSelector = createSelector(devSettingSelector, (dev) => dev.toggleSaveBurnTx);

export const toggleSaveRawBurnTxSelector = createSelector(devSettingSelector, (dev) => dev.toggleSaveRawBurnTx);

export const themeSelector = createSelector(settingSelector, (setting) => setting.theme);

export const darkModeSelector = createSelector(settingSelector, (setting) => setting.darkMode);
