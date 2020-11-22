import { lazy } from 'react';
import { IRouteProps } from 'src/routes';

const accountRoute: IRouteProps = {
  path: '/account',
  exact: true,
  component: lazy(() => import('./Account')),
  name: 'Account',
  to: '/account',
};

export const route = '/account';

export default accountRoute;
