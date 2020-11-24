import { lazy } from 'react';
import { IRouteProps } from 'src/routes';

const confirmTxRoute: IRouteProps = {
  path: '/confirm-tx',
  exact: true,
  component: lazy(() => import('./ConfirmTx')),
  name: 'confirm-tx',
  to: '/confirm-tx',
};

export const route = '/confirm-tx';

export default confirmTxRoute;
