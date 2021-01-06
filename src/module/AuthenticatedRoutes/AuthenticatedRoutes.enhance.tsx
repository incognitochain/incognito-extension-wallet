import React, { FunctionComponent } from 'react';
import { compose } from 'recompose';
import { withPreload } from 'src/module/Preload';
import { IRouteProps } from 'src/module';
import { IProps } from './AuthenticatedRoutes.inteface';

const context = require.context('src/module', true, /\.route.tsx?/);

const enhance = (WrappedComponent: FunctionComponent) => (props: any) => {
    const [routes, setRoutes] = React.useState<Array<IRouteProps>>([]);

    const handleGetRoutes = async () => {
        const allRoutes: IRouteProps[] = [];
        context.keys().map((path) => allRoutes.push(context(`${path}`).default));
        setRoutes([...allRoutes]);
    };
    React.useEffect(() => {
        handleGetRoutes();
    }, []);

    return <WrappedComponent {...props} routes={routes} />;
};

export default compose<IProps, any>(withPreload, enhance);
