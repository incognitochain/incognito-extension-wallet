import { lazy } from 'react';
import { IRouteProps } from '..';

const homeRoute: IRouteProps = {
  path: '/',
  exact: true,
  component: lazy(() => import('./Home')),
  name: 'Home',
  to: '/',
};

export const route = '/';

export default homeRoute;
