import React from 'react';
import { compose } from 'recompose';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { withLayout } from 'src/components/Layout';
import { withAllListToken } from 'src/routes/Token';

interface IProps {}

const enhance = (WrappedComponent: React.FunctionComponent) => (
  props: IProps
) => {
  return (
    <ErrorBoundary>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );
};

export default compose<IProps, any>(withLayout, withAllListToken, enhance);
