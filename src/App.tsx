import React, { Suspense } from 'react';
import withApp from './App.enhance';
import { Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './reset.scss';
import routes, { IRouteProps } from 'src/routes';
import { createMemoryHistory, createBrowserHistory } from 'history';
import { isDev } from 'src/configs';

const history = isDev ? createBrowserHistory() : createMemoryHistory(); // Instead of createBrowserHistory();

const App: React.FunctionComponent = () => {
  return (
    <Router history={history}>
      <Switch>
        <Suspense fallback={'...'}>
          {routes.map((route: IRouteProps) => (
            <Route {...route} key={route.name} />
          ))}
        </Suspense>
      </Switch>
    </Router>
  );
};

export default withApp(React.memo(App));
