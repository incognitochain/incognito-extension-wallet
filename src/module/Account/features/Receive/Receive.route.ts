import { lazy } from 'react';
import { IRouteProps } from 'src/module';

const receiveRoute: IRouteProps = {
    path: '/receive',
    exact: true,
    component: lazy(() => import('./Receive')),
    name: 'Receive',
    to: '/receive',
};

export const route = '/receive';

export default receiveRoute;
