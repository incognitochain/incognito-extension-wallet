import { lazy } from 'react';
import { IRouteProps } from '..';

const walletRoute: IRouteProps = {
  path: '/',
  exact: true,
  component: lazy(() => import('./Wallet')),
  name: 'Wallet',
  to: '/',
};

export const route = '/';

export default walletRoute;
