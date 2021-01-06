import { lazy } from 'react';
import { IRouteProps } from 'src/module';

const connectRoute: IRouteProps = {
    path: '/disconnect',
    exact: true,
    component: lazy(() => import('./Disconnect')),
    name: 'Disconnect',
    to: '/disconnect',
};

export const route = '/disconnect';

export default connectRoute;
