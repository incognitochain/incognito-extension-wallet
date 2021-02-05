import { lazy } from 'react';
import { IRouteProps } from '../../../index';

const newMasterKeyRoute: IRouteProps = {
    path: '/new-master-key',
    exact: true,
    component: lazy(() => import('./NewMasterKey')),
    name: 'New Master Key',
    to: '/new-master-key',
};

export const route = '/wallet';

export default newMasterKeyRoute;
