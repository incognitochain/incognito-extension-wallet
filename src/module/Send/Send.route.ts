import { lazy } from 'react';
import { IRouteProps } from 'src/module';

const sendRoute: IRouteProps = {
    path: '/send/:id',
    exact: true,
    component: lazy(() => import('./Send')),
    name: 'Send',
    to: '/send/:id',
};

export const route = '/send';

export default sendRoute;
