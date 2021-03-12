import React from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';

interface IProps {}

const headerEnhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    return (
        <ErrorBoundary>
            <WrappedComponent {...props} />
        </ErrorBoundary>
    );
};
export default headerEnhance;
