import { lazy } from 'react';
import { IRouteProps } from 'src/module';

const addTokenRoute: IRouteProps = {
    path: '/add-token',
    exact: true,
    component: lazy(() => import('./AddToken')),
    name: 'Add Token',
    to: '/add-token',
};

export const route = '/add-token';

export default addTokenRoute;
