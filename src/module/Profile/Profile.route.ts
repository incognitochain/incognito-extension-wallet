import { lazy } from 'react';
import { IRouteProps } from 'src/module';

export const route = '/user-profile';

const keyUserProfileRoute: IRouteProps = {
    path: route,
    exact: true,
    component: lazy(() => import('./Profile')),
    name: 'UserProfile',
    to: route,
};

export default keyUserProfileRoute;
