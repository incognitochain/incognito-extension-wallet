import { lazy } from 'react';
import { IRouteProps } from 'src/module';

const addManuallyRoute: IRouteProps = {
    path: '/add-manually',
    exact: true,
    component: lazy(() => import('./AddManually').then((route: any) => route)),
    name: 'AddManually',
    to: '/add-manually',
};

export const route = '/add-manually';

export default addManuallyRoute;
