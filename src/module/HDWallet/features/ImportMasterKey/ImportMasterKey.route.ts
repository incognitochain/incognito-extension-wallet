import { lazy } from 'react';
import { IRouteProps } from 'src/module';

const importMasterKeyRoute: IRouteProps = {
    path: '/import-master-key',
    exact: true,
    component: lazy(() => import('./ImportMasterKey')),
    name: 'importMasterKey',
    to: '/import-master-key',
};

export const route = importMasterKeyRoute.path;

export default importMasterKeyRoute;
