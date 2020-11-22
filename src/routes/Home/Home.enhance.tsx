import { AccountInstance } from 'incognito-js/build/web/browser';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'recompose';
import { actionGetAccountBalance, defaultAccountSelector } from '../Account';
import { IPreloadReducer, preloadSelector } from '../Preload';
import {
  actionFollowPopularToken,
  actionGetPrivacyTokensBalance,
  IEnvToken,
  ITokenReducer,
  tokenSelector,
} from '../Token';

interface IProps {}

const enhance = (WrappedComponent: React.FunctionComponent) => (
  props: IProps
) => {
  const dispatch = useDispatch();
  const defaultAccount: AccountInstance = useSelector(defaultAccountSelector);
  const preload: IPreloadReducer = useSelector(preloadSelector);
  const tokenState: ITokenReducer = useSelector(tokenSelector);
  const { mainnet } = preload.configs;
  const field = mainnet ? 'mainnet' : 'testnet';
  const envToken: IEnvToken = tokenState[field];
  const { followedPopularIds } = envToken;
  const handlePreloadHome = async () => {
    try {
      if (!followedPopularIds) {
        await dispatch(actionFollowPopularToken({ defaultAccount }));
      }
      dispatch(actionGetPrivacyTokensBalance());
      dispatch(actionGetAccountBalance());
    } catch (error) {
      console.debug(error);
    }
  };
  React.useEffect(() => {
    handlePreloadHome();
  }, []);
  return <WrappedComponent {...props} />;
};

export default compose<IProps, any>(enhance);
