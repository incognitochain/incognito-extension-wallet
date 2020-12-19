import { AccountInstance } from 'incognito-js/build/web/browser';
import { Dispatch } from 'redux';
import { IRootState } from 'src/redux/interface';
import { defaultAccountSelector } from 'src/module/Account';
import { bridgeTokensSelector, chainTokensSelector, selectedPrivacySelector } from 'src/module/Token';
import { ACTION_FETCHING_CACHE_HISTORY, ACTION_FETCHED_CACHE_HISTORY } from './History.constant';
import { historyCacheSelector } from './History.selector';

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
        }
        if (selectedPrivacy.isPrivacyToken) {
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
};
