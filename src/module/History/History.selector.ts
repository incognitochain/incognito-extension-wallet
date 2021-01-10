import memoize from 'lodash/memoize';
import { TxHistoryModelParam, CONSTANT } from 'incognito-js/build/web/browser';
import { createSelector } from 'reselect';
import { IRootState } from 'src/redux/interface';
import { selectedPrivacySelector } from 'src/module/Token';
import { decimalDigitsSelector } from 'src/module/Setting/Setting.selector';
import {
    getHistoryCacheData,
    getHistoryReceiveData,
    getHistoryBridgeData,
    handleCombineHistory,
} from './History.utils';
import { TxCacheHistoryModel, TxHistoryReceiveModel } from './History.interface';

const { TYPE } = CONSTANT.HISTORY;

export const historySelector = createSelector(
    (state: IRootState) => state,
    (state) => state.history,
);
// cache
export const historyCacheSelector = createSelector(historySelector, (history) => history.cacheHistory);

export const historyCacheDataSelector = createSelector(
    historyCacheSelector,
    selectedPrivacySelector,
    decimalDigitsSelector,
    (historyState, selectedPrivacy, decimalDigits) => {
        const { histories } = historyState;
        if (!histories) {
            return [];
        }
        const cacheHistory: TxCacheHistoryModel[] = histories.map((history) => ({
            ...getHistoryCacheData({ history, selectedPrivacy, decimalDigits }),
        }));
        return cacheHistory;
    },
);

export const getHistoryCacheDetailSelector = createSelector(
    selectedPrivacySelector,
    decimalDigitsSelector,
    (selectedPrivacy, decimalDigits) => (history: TxHistoryModelParam) => ({
        ...getHistoryCacheData({ history, selectedPrivacy, decimalDigits }),
    }),
);

export const getHistoryCacheByTxIdSelector = createSelector(
    (state: IRootState) => historyCacheDataSelector(state),
    (history) => memoize((txId: string) => history && history.find((h: TxCacheHistoryModel) => h.txId === txId)),
);
// receive
export const receiveHistorySelector = createSelector(historySelector, (history) => history.receiveHistory);

export const receiveHistoryDataSelector = createSelector(
    receiveHistorySelector,
    selectedPrivacySelector,
    decimalDigitsSelector,
    (historyReceive, selectedPrivacy, decimalDigits) => {
        let { data, accountSerialNumbers, isFetched, isFetching, oversize, refreshing } = historyReceive;
        const loadedData = !refreshing && !isFetching && isFetched && !oversize;
        const _data = data
            .filter((history) => {
                const receivedAmounts = history?.ReceivedAmounts;
                const isTokenExisted = Object.keys(receivedAmounts)?.includes(selectedPrivacy.tokenId);
                return isTokenExisted;
            })
            .map((history) =>
                getHistoryReceiveData({
                    history,
                    accountSerialNumbers,
                    selectedPrivacy,
                    decimalDigits,
                }),
            )
            .filter((history) => !!history.amount && history.typeCode === TYPE.RECEIVE);
        const shouldLoadmore = loadedData && _data.length >= 5;
        const notEnoughData = loadedData && _data.length < 5;
        return {
            ...historyReceive,
            data: [..._data],
            shouldLoadmore,
            notEnoughData,
        };
    },
);

export const getHistoryReceiveDetailSelector = createSelector(
    receiveHistorySelector,
    selectedPrivacySelector,
    decimalDigitsSelector,
    (historyReceive, selectedPrivacy, decimalDigits) => (history: any) => {
        let { accountSerialNumbers } = historyReceive;
        return getHistoryReceiveData({
            history,
            accountSerialNumbers,
            selectedPrivacy,
            decimalDigits,
        });
    },
);

export const getHistoryReceiveByTxIdSelector = createSelector(receiveHistoryDataSelector, (history) =>
    memoize((id: string) => history && history.data.find((h: TxHistoryReceiveModel) => h.id === id)),
);
// bridge
export const historyBridgeSelector = createSelector(historySelector, (history) => history.brideHistory);

export const historyBridgeDataSelector = createSelector(
    historyBridgeSelector,
    selectedPrivacySelector,
    decimalDigitsSelector,
    (historyBridge, selectedPrivacy, decimalDigits) => {
        return historyBridge.data.map((history) => ({
            ...getHistoryBridgeData({
                history,
                decimalDigits,
                selectedPrivacy,
            }),
        }));
    },
);

export const getHistoryBridgeDetailSelector = createSelector(
    selectedPrivacySelector,
    decimalDigitsSelector,
    (selectedPrivacy, decimalDigits) => (history: any) =>
        getHistoryBridgeData({
            history,
            decimalDigits,
            selectedPrivacy,
        }),
);

export const getHistoryBridgeByIdSelector = createSelector(historyBridgeDataSelector, (history) =>
    memoize((id: string) => history.find((h) => h.id === id)),
);

export const combineHistorySelector = createSelector(
    historyCacheDataSelector,
    receiveHistoryDataSelector,
    historyBridgeDataSelector,
    (cacheHistory, receiveHistory, bridgeHistory) =>
        handleCombineHistory({
            cacheHistory,
            receiveHistory: receiveHistory.data,
            bridgeHistory,
        }),
);
