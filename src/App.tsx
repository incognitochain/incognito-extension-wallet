import React, { Suspense } from 'react';
import 'animate.css';
import { ThemeProvider } from 'styled-components';
import { Router, Route, Switch } from 'react-router-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import { useSelector } from 'react-redux';
import { GlobalStyled } from 'src/styles/index';
import { IRouteProps } from 'src/module';
import { isDev } from 'src/configs';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'src/components/Modal';
import { Toast } from 'src/components';
import { themeSelector } from 'src/module/Configs';
import './reset.scss';
import withApp from './App.enhance';

interface IState {
    routes: IRouteProps[];
}
const history = isDev ? createBrowserHistory() : createMemoryHistory(); // Instead of createBrowserHistory();
const context = require.context('./', true, /\.route.tsx?/);
const App: React.FunctionComponent = () => {
    const theme = useSelector(themeSelector);
    const [state, setState] = React.useState<IState>({
        routes: [],
    });
    const { routes } = state;
    const handleGetRoutes = async () => {
        let allRoutes: IRouteProps[] = [];
        context.keys().map((path) => allRoutes.push(context(`${path}`).default));
        setState({ ...state, routes: [...allRoutes] });
    };
    React.useEffect(() => {
        handleGetRoutes();
    }, []);
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyled />
            <Router history={history}>
                <Switch>
                    <Suspense fallback="...">
                        {routes && routes.map((route: IRouteProps) => <Route {...route} key={route.path} />)}
                    </Suspense>
                </Switch>
                <Modal />
                <Toast />
            </Router>
        </ThemeProvider>
    );
};

export default withApp(React.memo(App));
