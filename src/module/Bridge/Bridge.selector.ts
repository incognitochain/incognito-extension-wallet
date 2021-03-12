import { createSelector } from 'reselect';
import { IRootState } from 'src/redux/interface';
import { IBridgeReducer } from './Bridge.inteface';

export const bridgeSelector = createSelector(
    (state: IRootState) => state.bridge,
    (bridge: IBridgeReducer) => bridge,
);

export const tabSelector = createSelector(bridgeSelector, (bridge) => bridge.tabSelect);
export const accountsMetamaskSelector = createSelector(bridgeSelector, (bridge) => bridge.accountsMetamask);
