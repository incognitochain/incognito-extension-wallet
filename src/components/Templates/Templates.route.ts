import { lazy } from 'react';
import { IRouteProps } from 'src/routes';

const templatesRoute: IRouteProps = {
  path: '/',
  exact: true,
  component: lazy(() => import('./Templates')),
  name: 'Template',
  to: '/',
};

export const route = ''

export default templatesRoute;
