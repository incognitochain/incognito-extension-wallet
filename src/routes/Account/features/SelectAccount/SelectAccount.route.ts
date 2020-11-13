import { lazy } from 'react';
import { IRouteProps } from 'src/routes';

const accountRoute: IRouteProps = {
  path: '/select-account',
  exact: true,
  component: lazy(() => import('./SelectAccount')),
  name: 'Account Item Modal',
  to: '/select-account',
};

export const route = '/select-account';

export default accountRoute;
