import { lazy } from 'react';
import { IRouteProps } from 'src/module';

const tokenInfoRoute: IRouteProps = {
  path: '/token-info',
  exact: true,
  component: lazy(() => import('./TokenInfo')),
  name: 'Templates',
  to: '/token-info',
};

export const route = '/token-info';

export default tokenInfoRoute;
