import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { compose } from 'recompose';
import { withPreloadSdk, withPreload } from 'src/module/Preload';
import Welcome from 'src/module/Welcome';
import { isAuthenticatedSelector } from './MainRoute.selector';

const enhance = (WrappedComponent: FunctionComponent) => (props: any) => {
    const isAuthenticated = useSelector(isAuthenticatedSelector);
    if (!isAuthenticated) {
        return <Welcome />;
    }
    return <WrappedComponent {...props} />;
};

export default compose(withPreloadSdk, enhance, withPreload);
