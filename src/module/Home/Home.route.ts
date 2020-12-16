import { lazy } from 'react';
import { IRouteProps } from '..';

const homeRoute: IRouteProps = {
  path: '/home',
  exact: true,
  component: lazy(() => import('./Home')),
  name: 'Home',
  to: '/home',
};

export const route = '/home';

export default homeRoute;
