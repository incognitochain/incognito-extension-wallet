import { lazy } from 'react';
import { IRouteProps } from 'src/module';

const masterKeyInfoRoute: IRouteProps = {
    path: '/master-key-info',
    exact: true,
    component: lazy(() => import('./MasterKeyInfo')),
    name: 'masterKeyInfo',
    to: '/master-key-info',
};

export const route = masterKeyInfoRoute.path;

export default masterKeyInfoRoute;
