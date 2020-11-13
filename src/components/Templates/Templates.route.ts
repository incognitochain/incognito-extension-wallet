import { lazy } from 'react';
import { IRouteProps } from 'src/routes';

const templatesRoute: IRouteProps = {
  path: '/templates',
  exact: true,
  component: lazy(() => import('./Templates')),
  name: 'Template',
  to: '/templates',
};

export const route = ''

export default templatesRoute;
