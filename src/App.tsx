import React from 'react';
import { GlobalStyled } from 'src/styles';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'src/components/Modal';
import { ThemeProvider } from 'styled-components';
import 'animate.css';
import './reset.scss';
import { Toast } from './components';
import { themeSelector } from './module/Configs';
import withApp from './App.enhance';
import MainRoute from './module/MainRoute/MainRoute';

const App: React.FunctionComponent = () => {
    const theme = useSelector(themeSelector);
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyled />
            <MainRoute />
            <Modal />
            <Toast />
        </ThemeProvider>
    );
};

export default withApp(React.memo(App));
