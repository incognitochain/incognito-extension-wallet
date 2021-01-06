import React from 'react';
import { useHistory } from 'react-router-dom';
import { compose } from 'recompose';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { route as routeDisconnect } from 'src/module/Disconnect/Disconnect.route';
import withConnect from 'src/App.enhanceConnect';

interface IProps {
    connected: boolean;
}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    const { connected } = props;
    const history = useHistory();
    const onPressConnect = () => history.push(routeDisconnect);
    if (!connected) return null;
    return (
        <ErrorBoundary>
            <WrappedComponent {...{ ...props, onPressConnect }} />
        </ErrorBoundary>
    );
};

export default compose<IProps, any>(withConnect, enhance);
