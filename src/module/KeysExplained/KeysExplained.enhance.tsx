import React, { FunctionComponent } from 'react';

const enhance = (WrappedComponent: FunctionComponent) => (props: any) => {
    return <WrappedComponent {...props} />;
};

export default enhance;
