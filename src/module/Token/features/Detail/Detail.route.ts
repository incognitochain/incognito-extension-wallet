import { lazy } from 'react';
import { IRouteProps } from 'src/module';

const detailRoute: IRouteProps = {
    path: '/token/:id',
    exact: true,
    component: lazy(() => import('./Detail')),
    name: 'Detail',
    to: '/token/:id',
};

export const route = '/token/:id';

export default detailRoute;
