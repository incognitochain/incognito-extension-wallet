/* eslint-disable import/no-cycle */
import React from 'react';
import {
  actionInit,
  actionInitEstimateFee,
  actionFetchedMaxFeePrv,
  actionFetchedMaxFeePToken,
} from './Send.actions';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from 'redux-form';
import { SpinnerContainer } from 'src/components';
import { ISelectedPrivacy, selectedPrivacySelector } from 'src/module/Token';
import { accountBalanceSelector } from '../Account';
import { FORM_CONFIGS } from './Send.enhance';
import { isGettingBalanceByTokenIdSelector } from 'src/redux';
import format from 'src/utils/format';
import convert from 'src/utils/convert';
import { COINS } from 'src/constants';
import { sendSelector } from './Send.selector';

const enhanceInit = (WrappedComp: React.FunctionComponent) => (props: any) => {
  const dispatch = useDispatch();
  const [init, setInit] = React.useState(false);
  const selectedPrivacy: ISelectedPrivacy = useSelector(
    selectedPrivacySelector
  );
  const accountBalance: number = useSelector(accountBalanceSelector);
  const isGettingBalance = useSelector(isGettingBalanceByTokenIdSelector)(
    selectedPrivacy.tokenId
  );
  const send = useSelector(sendSelector);
  const handleFetchedMaxPrv = async (accountBalance: number) =>
    dispatch(
      actionFetchedMaxFeePrv({
        maxFeePrv: accountBalance,
        maxFeePrvText: format.toFixed({
          number: convert.toHumanAmount({
            originalAmount: accountBalance,
            decimals: COINS.PRV.pDecimals,
          }),
          decimals: COINS.PRV.pDecimals,
        }),
      })
    );

  const handleFetchedMaxFeePToken = async (selectedPrivacy: ISelectedPrivacy) =>
    dispatch(
      actionFetchedMaxFeePToken({
        amount: selectedPrivacy.amount,
        amountText: format.toFixed({
          number: convert.toHumanAmount({
            originalAmount: selectedPrivacy.amount,
            decimals: selectedPrivacy.pDecimals,
          }),
          decimals: selectedPrivacy.pDecimals,
        }),
      })
    );

  const initData = async ({
    selectedPrivacy,
    accountBalance,
  }: {
    selectedPrivacy: ISelectedPrivacy;
    accountBalance: number;
  }) => {
    if (init) {
      return;
    }
    try {
      setInit(false);
      await dispatch(reset(FORM_CONFIGS.formName));
      await dispatch(actionInit());
      await dispatch(actionInitEstimateFee({ screen: 'Send' }));
      await handleFetchedMaxPrv(accountBalance);
      await handleFetchedMaxFeePToken(selectedPrivacy);
    } catch (error) {
      console.debug(error);
    } finally {
      setInit(true);
    }
  };

  React.useEffect(() => {
    handleFetchedMaxPrv(accountBalance);
  }, [accountBalance]);

  React.useEffect(() => {
    handleFetchedMaxFeePToken(selectedPrivacy);
  }, [selectedPrivacy?.amount, selectedPrivacy?.tokenId]);

  React.useEffect(() => {
    initData({ selectedPrivacy, accountBalance });
  }, [selectedPrivacy?.tokenId, accountBalance]);

  if (!selectedPrivacy || !send.init || !init || isGettingBalance) {
    return <SpinnerContainer animation='grow' />;
  }
  return (
    <ErrorBoundary>
      <WrappedComp {...props} />
    </ErrorBoundary>
  );
};

export default enhanceInit;
