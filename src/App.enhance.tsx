import React, { FunctionComponent } from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { Provider } from 'react-redux';
import { configStore, IConfigStore } from 'src/redux/index';
import { PersistGate } from 'redux-persist/integration/react';
import { compose } from 'recompose';
import { Detector } from 'react-detect-offline';
import { withPreload } from './module/Preload';

const { store, persistor }: IConfigStore = configStore();

const LostConnect = React.memo(() => {
    return (
        <ErrorBoundary>
            <div className="preload-container">
                <p>Lost network!</p>
            </div>
        </ErrorBoundary>
    );
});

const withNetwork = (WrappedComponent: React.FunctionComponent) => (props: any) => {
    return (
        <ErrorBoundary>
            <Detector
                render={({ online }: { online: boolean }) =>
                    online ? <WrappedComponent {...props} /> : <LostConnect />
                }
            />
        </ErrorBoundary>
    );
};

const enhance = (WrappedComponent: FunctionComponent) => (props: any) => {
    return (
        <ErrorBoundary>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <WrappedComponent {...props} />
                </PersistGate>
            </Provider>
        </ErrorBoundary>
    );
};

export default compose(enhance, withNetwork, withPreload);
