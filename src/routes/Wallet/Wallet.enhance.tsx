import React from 'react';
import { compose } from 'recompose';
import { withLayout } from 'src/components/Layout';

interface IProps {}

const enhance = (WrappedComponent: any) => (props: IProps) => {
  return <WrappedComponent {...props} />;
};

export default compose<IProps, any>(withLayout, enhance);
