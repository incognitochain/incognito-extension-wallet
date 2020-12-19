import { lazy } from 'react';
import { IRouteProps } from 'src/module';

const sendRoute: IRouteProps = {
    path: '/send',
    exact: true,
    component: lazy(() => import('./Send')),
    name: 'Send',
    to: '/send',
};

export const route = '/send';

export default sendRoute;
