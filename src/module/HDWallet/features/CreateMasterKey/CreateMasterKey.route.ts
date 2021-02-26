import { lazy } from 'react';
import { IRouteProps } from 'src/module';

const createMasterKeyRoute: IRouteProps = {
    path: '/create-master-key',
    exact: true,
    component: lazy(() => import('./CreateMasterKey')),
    name: 'createMasterKey',
    to: '/create-master-key',
};

export const route = createMasterKeyRoute.path;

export default createMasterKeyRoute;
