import { lazy } from 'react';
import { IRouteProps } from 'src/module';

const bridgeRoute: IRouteProps = {
    path: '/bridge',
    exact: true,
    component: lazy(() => import('./Bridge')),
    name: 'Bridge',
    to: '/bridge',
};

export const route = '/bridge';

export default bridgeRoute;
