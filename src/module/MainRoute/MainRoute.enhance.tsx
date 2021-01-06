import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { compose } from 'recompose';
import { withPreloadSdk } from 'src/module/Preload';
import { passwordSelector } from 'src/module/Password';
import Welcome from 'src/module/Welcome';
import { walletIdSelector } from 'src/module/Wallet';
import { IProps } from './MainRoute.inteface';

const enhance = (WrappedComponent: FunctionComponent) => (props: any) => {
    const pass = useSelector(passwordSelector);
    const walletId = useSelector(walletIdSelector);
    const isAuthenticated = !!pass && walletId >= 0;

    if (!isAuthenticated) {
        return <Welcome />;
    }

    return <WrappedComponent {...props} />;
};

export default compose<IProps, any>(withPreloadSdk, enhance);
