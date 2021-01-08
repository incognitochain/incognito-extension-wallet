import React from 'react';
import { compose } from 'recompose';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { withHeaderApp } from 'src/components/Header';
import { enhance as withWallet } from 'src/module/Wallet/Wallet.enhance';
import withBalance from 'src/module/Account/Acount.enhanceBalance';

interface IProps {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    return (
        <ErrorBoundary>
            <WrappedComponent {...props} />
        </ErrorBoundary>
    );
};

export default compose<IProps, any>(withBalance, withWallet, enhance, withHeaderApp);
