import { lazy } from 'react';
import { IRouteProps } from 'src/routes';

const followTokenRoute: IRouteProps = {
  path: '/follow-token',
  exact: true,
  component: lazy(() => import('./FollowToken')),
  name: 'Follow Token',
  to: '/follow-Token',
};

export const route = '/follow-token';

export default followTokenRoute;
