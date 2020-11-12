import { RouteProps } from 'react-router-dom';

export interface IRouteProps extends RouteProps {
  id?: string | number;
  name: string;
  to: string;
}

let routes: IRouteProps[] = [];

const context = require.context('./', true, /\.route.tsx?/);

context.keys().forEach((path) => {
  routes.push(require(`${path}`).default);
});

export default routes;
