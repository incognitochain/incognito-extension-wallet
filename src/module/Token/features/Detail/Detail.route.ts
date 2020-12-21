import { lazy } from 'react';
import { IRouteProps } from 'src/module';

const detailRoute: IRouteProps = {
    path: '/token',
    exact: true,
    component: lazy(() => import('./Detail')),
    name: 'Detail',
    to: '/token',
};

export const route = '/token';

export default detailRoute;
