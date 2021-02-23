import React from 'react';
import { GlobalStyled } from 'src/styles';
import { useSelector } from 'react-redux';
import Modal from 'src/components/Modal';
import { ThemeProvider } from 'styled-components';
import './reset.scss';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { Router } from 'react-router';
import MainRoute from 'src/module/MainRoute';
import { Toast } from 'src/components/Core/Toast';
import { TooltipContainer } from 'src/module/Tooltip';
import { themeSelector } from './module/Configs';
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
            </Router>
            <Modal />
            <Toast />
            <TooltipContainer />
        </ThemeProvider>
    );
};

export default withApp(React.memo(App));
