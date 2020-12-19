import React, { FunctionComponent } from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { configStore, IConfigStore } from 'src/redux/index';
import { PersistGate } from 'redux-persist/integration/react';
import { compose } from 'recompose';
import { AccountInstance } from 'incognito-js/build/web/browser';
import { IPreloadReducer, preloadSelector, withPreload } from './module/Preload';
import { withLayoutApp } from './components/Layout';
import { IWalletReducer, walletSelector } from './module/Wallet';
import {
    actionFollowPopularToken,
    actionGetPrivacyTokensBalance,
    IEnvToken,
    ITokenReducer,
    tokenSelector,
} from './module/Token';
import { actionGetAccountBalance, defaultAccountSelector } from './module/Account';
import { actionToggleToast, TOAST_CONFIGS } from './components';

const { store, persistor }: IConfigStore = configStore();

const withWallet = (WrappedComponent: React.FunctionComponent) => (props: any) => {
    const dispatch = useDispatch();
    const account: AccountInstance = useSelector(defaultAccountSelector);
    const wallet: IWalletReducer = useSelector(walletSelector);
    const preload: IPreloadReducer = useSelector(preloadSelector);
    const tokenState: ITokenReducer = useSelector(tokenSelector);
    const { mainnet } = preload.configs;
    const field = mainnet ? 'mainnet' : 'testnet';
    const envToken: IEnvToken = tokenState[field];
    const { followedPopularIds } = envToken;
    const handleLoadWallet = () => {
        try {
            if (!followedPopularIds) {
                dispatch(actionFollowPopularToken());
            }
            dispatch(actionGetPrivacyTokensBalance());
            dispatch(actionGetAccountBalance());
        } catch (error) {
            dispatch(
                actionToggleToast({
                    type: TOAST_CONFIGS.error,
                    toggle: true,
                    value: error,
                }),
            );
        }
    };
    React.useEffect(() => {
        handleLoadWallet();
    }, [wallet, account]);
    return <WrappedComponent {...props} />;
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

export default compose(enhance, withPreload, withWallet, withLayoutApp);
