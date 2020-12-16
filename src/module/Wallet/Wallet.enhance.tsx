import { AccountInstance } from 'incognito-js/build/web/browser';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'recompose';
import {
  actionGetAccountBalance,
  defaultAccountSelector,
} from 'src/module/Account';
import {
  actionFollowPopularToken,
  actionGetPrivacyTokensBalance,
  IEnvToken,
  ITokenReducer,
  tokenSelector,
} from 'src/module/Token';
import { IPreloadReducer, preloadSelector } from '../Preload';
import { IWalletReducer } from './Wallet.reducer';
import { walletSelector } from './Wallet.selector';

interface IProps {}

const enhance = (WrappedComponent: any) => (props: IProps) => {
  const dispatch = useDispatch();
  const account: AccountInstance = useSelector(defaultAccountSelector);
  const wallet: IWalletReducer = useSelector(walletSelector);
  const preload: IPreloadReducer = useSelector(preloadSelector);
  const tokenState: ITokenReducer = useSelector(tokenSelector);
  const { mainnet } = preload.configs;
  const field = mainnet ? 'mainnet' : 'testnet';
  const envToken: IEnvToken = tokenState[field];
  const { followedPopularIds } = envToken;
  const handleLoadWallet = () => {
    try {
      if (!followedPopularIds) {
        dispatch(actionFollowPopularToken());
      }
      dispatch(actionGetPrivacyTokensBalance());
      dispatch(actionGetAccountBalance());
    } catch (error) {
      console.debug(error);
    }
  };
  React.useEffect(() => {
    handleLoadWallet();
  }, [wallet, account]);
  return <WrappedComponent {...props} />;
};

export default compose<IProps, any>(enhance);
