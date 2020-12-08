import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'recompose';
import { withLayout } from 'src/components/Layout';
import {
  actionGetAccountBalance,
  defaultAccountSelector,
} from 'src/routes/Account';
import { actionGetPrivacyTokensBalance } from 'src/routes/Token';
import { walletSelector } from './Wallet.selector';

interface IProps {}

const enhance = (WrappedComponent: any) => (props: IProps) => {
  const dispatch = useDispatch();
  const account = useSelector(defaultAccountSelector);
  const wallet = useSelector(walletSelector);
  const handleLoadWallet = () => {
    try {
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

export default compose<IProps, any>(withLayout, enhance);
