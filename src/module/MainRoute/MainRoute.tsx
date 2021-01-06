import React from 'react';
import { Router } from 'react-router';
import AuthenticatedRoutes from 'src/module/AuthenticatedRoutes';
import enhance from './MainRoute.enhance';
import { IProps } from './MainRoute.inteface';

const MainRoute = (props: IProps) => {
    const { history } = props;
    return (
        <Router history={history}>
            <AuthenticatedRoutes />
        </Router>
    );
};

export default enhance(React.memo(MainRoute));
