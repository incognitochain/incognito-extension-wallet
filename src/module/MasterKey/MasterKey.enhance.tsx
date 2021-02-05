import React from 'react';
import { compose } from 'recompose';
import { withLayout } from 'src/components/Layout';
import { IProps } from './MasterKey.inteface';

const enhance = (WrappedComponent: any) => (props: IProps) => {
    return <WrappedComponent {...props} />;
};

export default compose<IProps, any>(withLayout, enhance);
