import { lazy } from 'react';
import { IRouteProps } from 'src/module';

const whyShieldRoute: IRouteProps = {
    path: '/why-shield',
    exact: true,
    component: lazy(() => import('./WhyShield')),
    name: 'Templates',
    to: '/why-shield',
};

export const route = '/why-shield';

export default whyShieldRoute;
