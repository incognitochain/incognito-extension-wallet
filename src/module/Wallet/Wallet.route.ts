import { lazy } from 'react';
import { IRouteProps } from '..';

const walletRoute: IRouteProps = {
    path: '/',
    exact: true,
    name: 'Wallet',
    to: '/',
    component: lazy(async () => {
        const module: any = await import('./Wallet');
        return module;
    }),
};

export const route = '/';

export default walletRoute;
