import { lazy } from 'react';
import { IRouteProps } from 'src/module';

const configsRoute: IRouteProps = {
    path: '/configs',
    exact: true,
    component: lazy(() => import('./Configs')),
    name: 'Configs',
    to: '/configs',
};

export const route = '/configs';

export default configsRoute;
