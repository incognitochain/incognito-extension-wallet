import { lazy } from 'react';
import { IRouteProps } from '..';

const walletRoute: IRouteProps = {
  path: '/wallet',
  exact: true,
  component: lazy(() => import('./Wallet')),
  name: 'Wallet',
  to: '/wallet',
};

export const route = '/wallet';

export default walletRoute;
