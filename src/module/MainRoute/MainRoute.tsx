import React from 'react';
import AuthenticatedRoutes from 'src/module/AuthenticatedRoutes';
import enhance from './MainRoute.enhance';

const MainRoute = () => {
    return <AuthenticatedRoutes />;
};

export default enhance(React.memo(MainRoute));
