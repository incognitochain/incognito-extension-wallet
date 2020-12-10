import React from 'react';
import { compose } from 'recompose';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { withLayout } from 'src/components/Layout';
import { withAllListToken } from 'src/routes/Token';
import { defaultAccountSelector } from 'src/routes/Account';
import { AccountInstance } from 'incognito-js/build/web/browser';
import { actionToggleToast, TOAST_CONFIGS } from 'src/components';
import { actionSaveWallet } from 'src/routes/Wallet';
import {
  getPrivacyDataByTokenIDSelector,
  actionSetFollowedTokens,
  ISelectedPrivacy,
} from 'src/routes/Token';
import { useDispatch, useSelector } from 'react-redux';

export interface TInner {
  handleToggleFollowTokenById: () => void;
}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
  const defaultAccount: AccountInstance = useSelector(defaultAccountSelector);
  const getPrivacyDataByTokenID = useSelector(getPrivacyDataByTokenIDSelector);
  const dispatch = useDispatch();
  const handleToggleFollowTokenById = (tokenId: string) => {
    try {
      const token: ISelectedPrivacy = getPrivacyDataByTokenID(tokenId);
      if (token.isFollowed) {
        defaultAccount.unfollowTokenById(tokenId);
      } else {
        defaultAccount.followTokenById(tokenId);
      }
      dispatch(
        actionSetFollowedTokens({ followed: defaultAccount.privacyTokenIds })
      );
      dispatch(actionSaveWallet());
    } catch (error) {
      dispatch(
        actionToggleToast({
          toggle: true,
          value: error?.message || JSON.stringify(error),
          type: TOAST_CONFIGS.error,
        })
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
