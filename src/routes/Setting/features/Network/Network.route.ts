import { lazy } from 'react';
import { IRouteProps } from 'src/routes';

const networkRoute: IRouteProps = {
  path: '/network',
  exact: true,
  component: lazy(() => import('./Network')),
  name: 'Network',
  to: '/network',
};

export const route = '/network';

export default networkRoute;
