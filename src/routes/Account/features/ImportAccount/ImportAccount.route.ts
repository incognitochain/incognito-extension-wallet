import { lazy } from 'react';
import { IRouteProps } from 'src/routes';

const importAccountRoute: IRouteProps = {
  path: '/import-account',
  exact: true,
  component: lazy(() => import('./ImportAccount')),
  name: 'Import Account',
  to: '/import-account',
};

export const route = '/import-account';

export default importAccountRoute;
