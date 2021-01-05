import { lazy } from 'react';
import { IRouteProps } from 'src/module';

const shieldRoute: IRouteProps = {
    path: '/shield',
    exact: true,
    component: lazy(() => import('./Shield')),
    name: 'Templates',
    to: '/shield',
};

export const route = '/shield';

export default shieldRoute;
