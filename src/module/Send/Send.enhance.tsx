import React from 'react';
import { compose } from 'recompose';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { withLayout } from 'src/components/Layout';
import { InjectedFormProps, reduxForm } from 'redux-form';
import withSend, { TInner as TInnerSend } from './Send.enhanceSend';
import withFee from './Send.enhanceFee';
import withValAddress, {
  TInner as TInnerAddress,
} from './Send.enhanceAddressValidator';
import withValAmount, {
  TInner as TInnerAmount,
} from './Send.enhanceAmountValidator';
import withInit from './Send.enhanceInit';

export const FORM_CONFIGS = {
  formName: 'form-send',
  amount: 'amount',
  toAddress: 'toAddress',
  fee: 'fee',
  memo: 'memo',
};
export interface IMergeProps
  extends InjectedFormProps<any, any>,
    TInnerAddress,
    TInnerAmount,
    TInnerSend {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
  return (
    <ErrorBoundary>
      <WrappedComponent {...{ ...props }} />
    </ErrorBoundary>
  );
};

export default compose<IMergeProps, any>(
  withLayout,
  reduxForm({
    form: FORM_CONFIGS.formName,
  }),
  withInit,
  withFee,
  withValAddress,
  withValAmount,
  withSend,
  enhance
);
