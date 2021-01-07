import { lazy } from 'react';
import { IRouteProps } from 'src/module';

const historyRoute: IRouteProps = {
    path: '/history/:id',
    exact: true,
    component: lazy(() => import('./History')),
    name: 'history',
    to: '/history/:id',
};

export const route = '/history/:id';

export default historyRoute;
