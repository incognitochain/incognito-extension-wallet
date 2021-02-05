import { lazy } from 'react';
import { IRouteProps } from 'src/module';

const connectRoute: IRouteProps = {
    path: '/connect',
    exact: true,
    component: lazy(() => import('./Connect')),
    name: 'Connect',
    to: '/connect',
};

export const route = '/connect';

export default connectRoute;
