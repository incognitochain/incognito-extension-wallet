import { lazy } from 'react';
import { IRouteProps } from 'src/module';

const hdWalletRoute: IRouteProps = {
    path: '/hd-wallet',
    exact: true,
    component: lazy(() => import('./HDWallet')),
    name: 'hdWallet',
    to: '/hd-wallet',
};

export const route = '/hd-wallet';

export default hdWalletRoute;
