import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { IRouteProps } from '../index';
import enhance from './AuthenticatedRoutes.enhance';
import { IProps } from './AuthenticatedRoutes.inteface';

const AuthenticatedRoutes = (props: IProps) => {
    const { routes } = props;
    return (
        <Switch>
            <Suspense fallback="...">
                {routes.map((route: IRouteProps) => (
                    <Route {...route} key={route.path} />
                ))}
            </Suspense>
        </Switch>
    );
};

export default enhance(React.memo(AuthenticatedRoutes));
