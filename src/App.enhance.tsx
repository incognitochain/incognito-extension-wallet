import React, { FunctionComponent } from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { Provider } from 'react-redux';
import { configStore, IConfigStore } from 'src/redux/index';
import { PersistGate } from 'redux-persist/integration/react';
import { compose } from 'recompose';
import { withLayoutApp } from './components/Layout';
import { withPreload } from './module/Preload';

const { store, persistor }: IConfigStore = configStore();

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

export default compose(enhance, withPreload, withLayoutApp);
