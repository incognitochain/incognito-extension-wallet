import React from 'react';
import { compose } from 'recompose';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { withLayout } from 'src/components/Layout';
import { reduxForm } from 'redux-form';
import convert from 'src/utils/convert';
import { useDispatch, useSelector } from 'react-redux';
import toString from 'lodash/toString';
import { ISelectedPrivacy, selectedPrivacySelector } from 'src/routes/Token';
import { decimalSeparatorSelector } from 'src/routes/Preload';
import { defaultAccountSelector } from 'src/routes/Account';
import {
  AccountInstance,
  PaymentInfoModel,
} from 'incognito-js/build/web/browser';
import { MAX_FEE_PER_TX } from './Send.utils';
import { route as routeConfirmTx } from './features/ConfirmTx';
import { useHistory } from 'react-router-dom';

interface IProps {}

export interface TOutter {
  handleSubmit: () => void;
  handleSend: (values: {
    amount: string;
    toAddress: string;
    memo?: string;
  }) => void;
  disabledForm: boolean;
  submitting: boolean;
  validateAmount: any;
}

export const FORM_CONFIGS = {
  formName: 'form-send',
  amount: 'amount',
  toAddress: 'toAddress',
  fee: 'fee',
  memo: 'memo',
};

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const selectedPrivacy: ISelectedPrivacy = useSelector(
    selectedPrivacySelector
  );
  const decimalSeparator = useSelector(decimalSeparatorSelector);
  const account: AccountInstance = useSelector(defaultAccountSelector);
  const handleSend = async (values: {
    amount: string;
    toAddress: string;
    memo?: string;
  }) => {
    try {
      const { amount, toAddress, memo = '' } = values;
      if (!amount || !toAddress) {
        return;
      }
      const originalAmount = convert.toOriginalAmount({
        humanAmount: amount,
        decimalSeparator,
        decimals: selectedPrivacy.pDecimals,
      });
      const paymentInfos: PaymentInfoModel[] = [
        {
          paymentAddressStr: account.key.keySet.paymentAddressKeySerialized,
          amount: toString(originalAmount),
          message: memo,
        },
      ];
      const tx = await account.nativeToken.transfer(
        paymentInfos,
        toString(MAX_FEE_PER_TX)
      );
      if (!tx) {
        throw new Error(`Failed`);
      }
      history.push(routeConfirmTx, {
        tx,
        isNativeToken: true,
      });
    } catch (error) {
      console.debug(error);
      throw error;
    }
  };
  return (
    <ErrorBoundary>
      <WrappedComponent {...{ ...props, handleSend }} />
    </ErrorBoundary>
  );
};

export default compose<IProps, TOutter>(
  withLayout,
  reduxForm<{}, TOutter>({
    form: FORM_CONFIGS.formName,
  }),
  enhance
);
