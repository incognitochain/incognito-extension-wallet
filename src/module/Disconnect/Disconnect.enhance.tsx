import React from 'react';
import { compose } from 'recompose';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { withHeaderApp } from 'src/components/Header';
import withBalance from 'src/module/Account/Acount.enhanceBalance';
import withWalletBalance from 'src/module/Wallet/Wallet.enhanceBalance';

interface IProps {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    return (
        <ErrorBoundary>
            <WrappedComponent {...props} />
        </ErrorBoundary>
    );
};

export default compose<IProps, any>(withBalance, withWalletBalance, enhance, withHeaderApp);
