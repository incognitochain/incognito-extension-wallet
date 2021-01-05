import { lazy } from 'react';
import { IRouteProps } from 'src/module';

const genShieldAddressRoute: IRouteProps = {
    path: '/gen-shield-address',
    exact: true,
    component: lazy(() => import('./GenShieldAddress')),
    name: 'Gen Shield Address',
    to: '/gen-shield-address',
};

export const route = '/gen-shield-address';

export default genShieldAddressRoute;
