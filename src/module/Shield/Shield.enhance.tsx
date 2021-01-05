import React from 'react';
import { useSelector } from 'react-redux';
import { compose } from 'recompose';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { IAllListTokenInner, withAllListToken } from 'src/module/Token';
import { availableShieldTokens } from './Shield.selector';

interface IProps {}

interface TInner {}

export interface IMergedProps extends IProps, TInner, IAllListTokenInner {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    const availableTokens = useSelector(availableShieldTokens);
    return (
        <ErrorBoundary>
            <WrappedComponent {...{ ...props, availableTokens }} />
        </ErrorBoundary>
    );
};

export default compose<IMergedProps, any>(enhance, withAllListToken);
