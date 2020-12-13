import { lazy } from 'react';
import { IRouteProps } from 'src/module';

const addressBookRoute: IRouteProps = {
  path: '/address-book',
  exact: true,
  component: lazy(() => import('./AddressBook')),
  name: 'AddressBook',
  to: '/address-book',
};

export const route = '/address-book';

export default addressBookRoute;
