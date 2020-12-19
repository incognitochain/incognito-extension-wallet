import { lazy } from 'react';
import { IRouteProps } from 'src/module';

const createAccountRoute: IRouteProps = {
    path: '/create-account',
    exact: true,
    component: lazy(() => import('./CreateAccount')),
    name: 'Create Account',
    to: '/create-account',
};

export const route = '/create-account';

export default createAccountRoute;
