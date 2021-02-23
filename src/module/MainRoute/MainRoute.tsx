import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { IRouteProps } from '..';
import withMainRoute from './MainRoute.enhance';

const context = require.context('src/module', true, /\.route.tsx?/);

const MainRoute = () => {
    const [routes, setRoutes] = React.useState<Array<IRouteProps>>([]);
    const handleGetRoutes = async () => {
        const allRoutes: IRouteProps[] = [];
        context.keys().map((path) => allRoutes.push(context(`${path}`).default));
        setRoutes([...allRoutes]);
    };
    React.useEffect(() => {
        handleGetRoutes();
    }, []);
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

export default withMainRoute(React.memo(MainRoute));
