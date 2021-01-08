import uniqBy from 'lodash/uniqBy';
import { AccountInstance } from 'incognito-js/build/web/browser';
import { Dispatch } from 'redux';
import { IRootState } from 'src/redux/interface';
import { defaultAccountSelector } from 'src/module/Account';
import {
    selectedTokenIdSelector,
    bridgeTokensSelector,
    chainTokensSelector,
    selectedPrivacySelector,
    ISelectedPrivacy,
} from 'src/module/Token';
import BridgeHistoryModel from 'incognito-js/build/web/browser/src/models/bridge/bridgeHistory';
import { camelCaseKeys } from 'src/utils/object';
import toString from 'lodash/toString';
import {
    IReceiveHistoryToken,
    IReceiveHistoryTokenFetched,
    TxBridgeHistoryModel,
    TxHistoryReceiveModel,
} from './History.interface';
import { handleFilterHistoryReceiveByTokenId } from './History.utils';
import {
    ACTION_FETCHING_RECEIVE_HISTORY,
    ACTION_FETCHED_RECEIVE_HISTORY,
    ACTION_FETCH_FAIL_RECEIVE_HISTORY,
    ACTION_FETCHING_CACHE_HISTORY,
    ACTION_FETCHED_CACHE_HISTORY,
    ACTION_FREE_HISTORY,
    MAX_LIMIT_RECEIVE_HISTORY_ITEM,
    ACTION_FETCHING_BRIDGE_HISTORY,
    ACTION_FETCHED_BRIDGE_HISTORY,
    ACTION_FETCHING_ALL_HISTORY,
    ACTION_FETCHED_ALL_HISTORY,
} from './History.constant';
import {
    historyBridgeSelector,
    historyCacheSelector,
    receiveHistorySelector,
    historySelector,
    getHistoryBridgeByIdSelector,
} from './History.selector';

export const actionFreeHistory = () => ({
    type: ACTION_FREE_HISTORY,
});

// Cache history

export const actionFetchingCacheHistory = () => ({
    type: ACTION_FETCHING_CACHE_HISTORY,
});

export const actionFetchedCacheHistory = (payload: { histories: any[] }) => ({
    type: ACTION_FETCHED_CACHE_HISTORY,
    payload,
});

export const actionFetchCacheHistory = () => async (dispatch: Dispatch, getState: () => IRootState) => {
    let histories: any[] = [];
    const state = getState();
    const historyCache = historyCacheSelector(state);
    if (historyCache.fetching) {
        return;
    }
    try {
        const account: AccountInstance = defaultAccountSelector(state);
        const selectedPrivacy = selectedPrivacySelector(state);
        const bridgeTokens = bridgeTokensSelector(state);
        const chainTokens = chainTokensSelector(state);
        await dispatch(actionFetchingCacheHistory());
        if (selectedPrivacy.isNativeToken) {
            histories = await account.nativeToken.getTxHistories();
        } else {
            const token = await account.getPrivacyTokenById(selectedPrivacy.tokenId, bridgeTokens, chainTokens);
            histories = await token.getTxHistories();
        }
    } catch (error) {
        throw error;
    } finally {
        dispatch(
            actionFetchedCacheHistory({
                histories,
            }),
        );
    }
    return histories;
};

// Receive history

export const actionFetchingReceiveHistory = (payload = { refreshing: true }) => ({
    type: ACTION_FETCHING_RECEIVE_HISTORY,
    payload,
});

export const actionFetchedReceiveHistory = (payload: IReceiveHistoryTokenFetched) => ({
    type: ACTION_FETCHED_RECEIVE_HISTORY,
    payload,
});

export const actionFetchFailReceiveHistory = () => ({
    type: ACTION_FETCH_FAIL_RECEIVE_HISTORY,
});

export const actionFetchReceiveHistory = (refreshing = false) => async (
    dispatch: Dispatch,
    getState: () => IRootState,
) => {
    const state = getState();
    const selectedPrivacy: ISelectedPrivacy = selectedPrivacySelector(state);
    const bridgeTokens = bridgeTokensSelector(state);
    const chainTokens = chainTokensSelector(state);
    const account: AccountInstance = defaultAccountSelector(state);
    let data: TxHistoryReceiveModel[] = [];
    const receiveHistory: IReceiveHistoryToken = receiveHistorySelector(state);
    const { isFetching, oversize, page, limit, data: oldData } = receiveHistory;
    if (isFetching || (oversize && !refreshing) || !selectedPrivacy?.tokenId) {
        return [...oldData];
    }
    try {
        await dispatch(actionFetchingReceiveHistory({ refreshing }));
        const curPage = refreshing ? 0 : page;
        const curSkip = refreshing ? 0 : curPage * limit;
        const nextPage = curPage + 1;
        const curLimit = refreshing && page > 0 ? MAX_LIMIT_RECEIVE_HISTORY_ITEM : limit;
        let histories: any[] = [];
        let accountSerialNumbers: any[] = [];
        if (selectedPrivacy.isNativeToken) {
            histories = await account.nativeToken.getTransactionByReceiver({ skip: curSkip, limit: curLimit });
            const { serialNumberList } = await account.nativeToken.deriveSerialNumbers(selectedPrivacy.tokenId);
            accountSerialNumbers = [...serialNumberList];
        } else {
            const token = await account.getPrivacyTokenById(selectedPrivacy.tokenId, bridgeTokens, chainTokens);
            histories = await token.getTransactionByReceiver({ skip: curSkip, limit: curLimit });
            const { serialNumberList } = await token.deriveSerialNumbers(selectedPrivacy.tokenId);
            accountSerialNumbers = [...serialNumberList];
        }
        data = handleFilterHistoryReceiveByTokenId({
            tokenId: selectedPrivacy?.tokenId,
            histories,
            accountSerialNumbers,
        });
        data = refreshing ? [...data, ...oldData] : [...oldData, ...data];
        data = uniqBy(data, (h) => h?.txId) || [];
        const isOversize = histories?.length < curLimit;
        const notEnoughData = data?.length < 5;
        let payload = {
            nextPage,
            data,
            oversize: isOversize,
            refreshing,
            notEnoughData,
        };
        await dispatch(actionFetchedReceiveHistory(payload));
    } catch (error) {
        data = [];
        await dispatch(actionFetchFailReceiveHistory());
    }
    return data;
};

// Bridge history

export const actionFetchingBridgeHistory = () => ({
    type: ACTION_FETCHING_BRIDGE_HISTORY,
});

export const actionFetchedBridgeHistory = (payload: { histories: BridgeHistoryModel[] }) => ({
    type: ACTION_FETCHED_BRIDGE_HISTORY,
    payload,
});

export const actionFetchBridgeHistory = () => async (dispatch: Dispatch, getState: () => IRootState) => {
    let histories: any[] = [];
    const state = getState();
    const historyBridge = historyBridgeSelector(state);
    const account: AccountInstance = defaultAccountSelector(state);
    const selectedPrivacy = selectedPrivacySelector(state);
    const bridgeTokens = bridgeTokensSelector(state);
    const chainTokens = chainTokensSelector(state);
    if (historyBridge.fetching || !selectedPrivacy.isDeposable || !selectedPrivacy.isWithdrawable) {
        return;
    }
    try {
        await dispatch(actionFetchingBridgeHistory());
        const token = await account.getPrivacyTokenById(selectedPrivacy.tokenId, bridgeTokens, chainTokens);
        histories = await token.bridgeGetHistory();
    } catch (error) {
        throw error;
    } finally {
        await dispatch(
            actionFetchedBridgeHistory({
                histories: histories.map((data: any) => ({
                    ...camelCaseKeys(data),
                    id: toString(data.ID),
                })),
            }),
        );
    }
    return histories;
};

export const actionFetchingAllHistory = () => ({
    type: ACTION_FETCHING_ALL_HISTORY,
});

export const actionFetchedAllHistory = () => ({
    type: ACTION_FETCHED_ALL_HISTORY,
});

export const actionFetchAllHistory = () => async (dispatch: Dispatch, getState: () => IRootState) => {
    try {
        const state = getState();
        const history = historySelector(state);
        const { isFetching } = history;
        if (isFetching) {
            return;
        }
        await dispatch(actionFetchingAllHistory());
        await Promise.all([
            actionFetchBridgeHistory()(dispatch, getState),
            actionFetchReceiveHistory(true)(dispatch, getState),
            actionFetchCacheHistory()(dispatch, getState),
        ]);
    } catch (error) {
        throw error;
    } finally {
        dispatch(actionFetchedAllHistory());
    }
};

export const actionRetryShieldBridgeToken = (id: string) => async (dispatch: Dispatch, getState: () => IRootState) => {
    try {
        const state = getState();
        const account: AccountInstance = defaultAccountSelector(state);
        const bridgeTokens = bridgeTokensSelector(state);
        const chainTokens = chainTokensSelector(state);
        const tokenId: string = selectedTokenIdSelector(state);
        const token = await account.getPrivacyTokenById(tokenId, bridgeTokens, chainTokens);
        const history: TxBridgeHistoryModel | undefined = getHistoryBridgeByIdSelector(state)(id);
        if (!history || !history.canRetryExpiredShield) {
            return;
        }
        await token.bridgeRetryHistory({ ...history, id: Number(id) });
    } catch (error) {
        throw error;
    }
};

export const actionRemoveShieldBridgeToken = (id: string) => async (dispatch: Dispatch, getState: () => IRootState) => {
    try {
        const state = getState();
        const account: AccountInstance = defaultAccountSelector(state);
        const bridgeTokens = bridgeTokensSelector(state);
        const chainTokens = chainTokensSelector(state);
        const tokenId: string = selectedTokenIdSelector(state);
        const token = await account.getPrivacyTokenById(tokenId, bridgeTokens, chainTokens);
        const history: TxBridgeHistoryModel | undefined = getHistoryBridgeByIdSelector(state)(id);
        if (!history || !history.canRemoveExpiredOrPendingShield) {
            return;
        }
        return await token.bridgeRemoveHistory({ ...history, id: Number(id) });
    } catch (error) {
        throw error;
    }
};
