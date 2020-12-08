import { lazy } from 'react';
import { IRouteProps } from 'src/routes';

const detailRoute: IRouteProps = {
  path: '/token/:id',
  exact: true,
  component: lazy(() => import('./Detail')),
  name: 'Detail',
  to: '/token/:id',
};

export default detailRoute;
