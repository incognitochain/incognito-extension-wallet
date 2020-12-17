import React, { Suspense } from 'react';
import withApp from './App.enhance';
import { Router, Route, Switch } from 'react-router-dom';
import { GlobalStyled } from 'src/styles/index';
import routes, { IRouteProps } from 'src/module';
import { createMemoryHistory, createBrowserHistory } from 'history';
import { isDev } from 'src/configs';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'src/components/Modal';
import { ThemeProvider } from 'styled-components';
import 'animate.css';
import './reset.scss';
import { Toast } from './components';
import { HeaderApp } from './components/Header';
import { themeSelector } from './module/Configs';

const history = isDev ? createBrowserHistory() : createMemoryHistory(); // Instead of createBrowserHistory();

const App: React.FunctionComponent = () => {
  const theme = useSelector(themeSelector);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyled />
      <Router history={history}>
        <HeaderApp />
        <Switch>
          <Suspense fallback={'...'}>
            {routes.map((route: IRouteProps) => (
              <Route {...route} key={route.path} />
            ))}
          </Suspense>
        </Switch>
        <Modal />
        <Toast />
      </Router>
    </ThemeProvider>
  );
};

export default withApp(React.memo(App));
