import { lazy } from 'react';
import { IRouteProps } from 'src/module';

const historyRoute: IRouteProps = {
  path: '/history/:txId',
  exact: true,
  component: lazy(() => import('./History')),
  name: 'history',
  to: '/history/:txId',
};

export const route = '/history/:txId';

export default historyRoute;
