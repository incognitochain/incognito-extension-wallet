import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { compose } from 'recompose';
import { actionToggleModal } from 'src/components/Modal';
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

const withRouteChange = (WrappedComponent: any) => (props: any) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const handleClose = () => dispatch(actionToggleModal({}));
    React.useEffect(() => {
        const listener = history.listen(() => {
            handleClose();
        });
        return () => {
            listener();
        };
    }, []);
    return <WrappedComponent {...props} />;
};

export default compose(withPreloadSdk, enhance, withPreload, withRouteChange);
