import { lazy } from 'react';
import { IRouteProps } from 'src/module';

const accountRoute: IRouteProps = {
    path: '/account-item-modal',
    exact: true,
    component: lazy(() => import('./AccountItem.modal')),
    name: 'Account Item Modal',
    to: '/account-item-modal',
};

export const route = '/account-item-modal';

export default accountRoute;
