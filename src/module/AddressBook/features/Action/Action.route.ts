import { lazy } from 'react';
import { IRouteProps } from 'src/module';

const createRoute: IRouteProps = {
    path: '/action-address-book',
    exact: true,
    component: lazy(() => import('./Action')),
    name: 'Create',
    to: '/action-address-book',
};

export const route = '/action-address-book';

export default createRoute;
