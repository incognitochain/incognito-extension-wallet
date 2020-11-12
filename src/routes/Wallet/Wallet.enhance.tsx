import React from 'react';
import { compose } from 'recompose';

interface IProps {}

const enhance = (WrappedComponent: any) => (props: IProps) => {
  return <WrappedComponent {...props} />;
};

export default compose<IProps, any>(enhance);
