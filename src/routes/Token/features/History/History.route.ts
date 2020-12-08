import { lazy } from 'react';
import { IRouteProps } from 'src/routes';

const historyRoute: IRouteProps = {
  path: '/history',
  exact: true,
  component: lazy(() => import('./History')),
  name: 'history',
  to: '/history',
};

export const route = '/history';

export default historyRoute;
