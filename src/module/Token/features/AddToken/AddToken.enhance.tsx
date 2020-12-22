import React from 'react';
import { compose } from 'recompose';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { withLayout } from 'src/components/Layout';
import {
    withAllListToken,
    getPrivacyDataByTokenIDSelector,
    actionSetFollowedTokens,
    ISelectedPrivacy,
} from 'src/module/Token';
import { defaultAccountSelector } from 'src/module/Account';
import { AccountInstance } from 'incognito-js/build/web/browser';
import { actionToggleToast, TOAST_CONFIGS } from 'src/components';
import { actionSaveWallet } from 'src/module/Wallet';

import { useDispatch, useSelector } from 'react-redux';

export interface TInner {
    handleToggleFollowTokenById: () => void;
}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
    const defaultAccount: AccountInstance = useSelector(defaultAccountSelector);
    const getPrivacyDataByTokenID = useSelector(getPrivacyDataByTokenIDSelector);
    const dispatch = useDispatch();
    const handleToggleFollowTokenById = async (tokenId: string) => {
        try {
            const token: ISelectedPrivacy = getPrivacyDataByTokenID(tokenId);
            if (token.isFollowed) {
                await defaultAccount.unfollowTokenById(tokenId);
            } else {
                await defaultAccount.followTokenById(tokenId);
            }
            await dispatch(
                actionSetFollowedTokens({
                    followed: defaultAccount.privacyTokenIds.map((t) => ({ tokenId: t, amount: 0 })),
                }),
            );
            await dispatch(actionSaveWallet());
        } catch (error) {
            dispatch(
                actionToggleToast({
                    toggle: true,
                    value: error?.message || JSON.stringify(error),
                    type: TOAST_CONFIGS.error,
                }),
            );
        }
    };
    return (
        <ErrorBoundary>
            <WrappedComponent {...{ ...props, handleToggleFollowTokenById }} />
        </ErrorBoundary>
    );
};

export default compose<TInner, any>(withLayout, withAllListToken, enhance);
