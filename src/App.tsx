import React from 'react';
import './reset.scss';
import { GlobalStyled } from 'src/styles';
import { useSelector } from 'react-redux';
import Modal from 'src/components/Modal';
import { ThemeProvider } from 'styled-components';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { Router } from 'react-router';
import MainRoute from 'src/module/MainRoute';
import Toast from 'src/components/Core/Toast/Toast';
import { TooltipContainer } from 'src/module/Tooltip';
import { themeSelector } from './module/Setting';
import withApp from './App.enhance';
import { isDev } from './configs';

const history = isDev ? createBrowserHistory() : createMemoryHistory(); // Instead of createBrowserHistory();

const App: React.FunctionComponent = () => {
    const theme = useSelector(themeSelector);
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyled />
            <Router history={history}>
                <MainRoute />
                <Modal />
                <Toast />
                <TooltipContainer />
            </Router>
        </ThemeProvider>
    );
};

export default withApp(React.memo(App));
