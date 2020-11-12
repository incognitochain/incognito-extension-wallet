import { lazy } from 'react';
import { IRouteProps } from 'src/routes';

const templatesRoute: IRouteProps = {
  path: '/backup-account',
  exact: true,
  component: lazy(() => import('./BackupAccount')),
  name: 'Backup Account',
  to: '/backup-account',
};

export const route = '/backup-account';

export default templatesRoute;
