import { lazy } from 'react';
import { IRouteProps } from 'src/module';

const createRoute: IRouteProps = {
  path: '/create-address-book',
  exact: true,
  component: lazy(() => import('./Create')),
  name: 'Create',
  to: '/create-address-book',
};

export const route = '/create-address-book';

export default createRoute;
