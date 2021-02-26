import { lazy } from 'react';
import { IRouteProps } from 'src/module';

const addKeysRoute: IRouteProps = {
    path: '/add-keys',
    exact: true,
    component: lazy(() => import('./AddKeys')),
    name: 'addKeys',
    to: '/add-keys',
};

export const route = addKeysRoute.path;

export default addKeysRoute;
