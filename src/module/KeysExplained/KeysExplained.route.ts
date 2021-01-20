import { lazy } from 'react';
import { IRouteProps } from 'src/module';

export const route = '/keys-explained';

const keyExplainedRoute: IRouteProps = {
    path: route,
    exact: true,
    component: lazy(() => import('./KeysExplained')),
    name: 'KeysExplained',
    to: route,
};

export default keyExplainedRoute;
