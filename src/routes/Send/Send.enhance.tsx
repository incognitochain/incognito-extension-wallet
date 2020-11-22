import React from 'react';
import { compose } from 'recompose';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { withLayout } from 'src/components/Layout';
import { reduxForm } from 'redux-form';
interface IProps {}

export interface TOutter {}

export const FORM_CONFIGS = {
  formName: 'form-send',
  amount: 'amount',
  toAddress: 'toAddress',
  fee: 'fee',
  memo: 'memo',
};

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
  return (
    <ErrorBoundary>
      <WrappedComponent {...props} />
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
