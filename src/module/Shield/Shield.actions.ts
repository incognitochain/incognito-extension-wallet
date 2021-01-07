import { shieldSelector } from 'src/module/Shield/Shield.selector';
import { AccountInstance, PrivacyTokenInstance } from 'incognito-js/build/web/browser';
import { defaultAccountSelector } from 'src/module/Account/Account.selector';
import { IRootState } from 'src/redux/interface';
import { Dispatch } from 'redux';
import { actionFollowTokenById } from 'src/module/Token';
import { format } from 'src/utils';
import toString from 'lodash/toString';
import { getPrivacyDataByTokenIDSelector, bridgeTokensSelector, chainTokensSelector } from '../Token/Token.selector';
import {
    ACTION_FREE_SHIELD,
    ACTION_FETCHING,
    ACTION_FETCHED,
    ACTION_FETCH_FAIL,
    ACTION_TOGGLE_GUIDE,
} from './Shield.constant';

export const actionFetching = () => ({
    type: ACTION_FETCHING,
});

export const actionFetched = (payload: { min: string; max: string; address: string }) => ({
    type: ACTION_FETCHED,
    payload,
});

export const actionFetchFail = () => ({
    type: ACTION_FETCH_FAIL,
});

export const actionFetch = ({ tokenId }: { tokenId: string }) => async (
    dispatch: Dispatch,
    getState: () => IRootState,
) => {
    try {
        const state = getState();
        const account: AccountInstance = defaultAccountSelector(state);
        const selectedPrivacy = getPrivacyDataByTokenIDSelector(state)(tokenId);
        const brideTokens = bridgeTokensSelector(state);
        const chainTokens = chainTokensSelector(state);
        const shieldState = shieldSelector(state);
        const { isFetching } = shieldState;
        if (!selectedPrivacy || !selectedPrivacy.isDeposable || isFetching) {
            return;
        }
        await dispatch(actionFetching());
        const token: PrivacyTokenInstance = await account.getPrivacyTokenById(tokenId, brideTokens, chainTokens);
        const data: {
            address: string;
            minAmount: number;
            maxAmount: number;
        } = await token.bridgeGenerateDepositAddress();
        await dispatch(
            actionFetched({
                address: data?.address,
                min: format.toFixed({ number: Math.max(0, data?.minAmount), decimals: selectedPrivacy.pDecimals }),
                max: toString(data?.maxAmount),
            }),
        );
    } catch (error) {
        await dispatch(actionFetchFail());
        throw error;
    } finally {
        actionFollowTokenById(tokenId)(dispatch, getState);
    }
};

export const actionToggleGuide = () => ({
    type: ACTION_TOGGLE_GUIDE,
});

export const actionFreeShield = () => ({
    type: ACTION_FREE_SHIELD,
});
