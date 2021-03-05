import React, { FunctionComponent } from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { Provider, useSelector } from 'react-redux';
import { configStore, IConfigStore } from 'src/redux';
import { PersistGate } from 'redux-persist/integration/react';
import { compose } from 'recompose';
import { Detector } from 'react-detect-offline';
import { LostConnectIcon } from 'src/components/Icons';
import { themeSelector } from 'src/module/Setting';
import { translateByFieldSelector } from './module/Configs';
import { IGeneralLanguage } from './i18n';
import withBackground from './AppBackground.enhance';
import { Styled } from './App.styled';

const { store, persistor }: IConfigStore = configStore();

const LostConnect = React.memo(() => {
    const translate: IGeneralLanguage = useSelector(translateByFieldSelector)('general');
    const theme = useSelector(themeSelector);
    return (
        <ErrorBoundary>
            <Styled theme={theme}>
                <div className="preload-container lost-network">
                    <LostConnectIcon />
                    <p dangerouslySetInnerHTML={{ __html: translate.lostNetwork }} />
                </div>
            </Styled>
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
                <PersistGate loading={<div>...</div>} persistor={persistor}>
                    {!!store && <WrappedComponent {...props} />}
                </PersistGate>
            </Provider>
        </ErrorBoundary>
    );
};

export default compose(enhance, withNetwork, withBackground);
