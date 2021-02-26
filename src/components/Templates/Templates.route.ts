import { lazy } from 'react';
import { IRouteProps } from 'src/module';

const templatesRoute: IRouteProps = {
    path: '/templates',
    exact: true,
    component: lazy(() => import('./Templates')),
    name: 'Templates',
    to: '/templates',
};

export const route = templatesRoute.path;

export default templatesRoute;
