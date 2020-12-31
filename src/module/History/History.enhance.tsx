import React, { HTMLAttributes } from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { TxHistoryItem } from './History.interface';

interface IProps {
    histories: TxHistoryItem[];
    handleOnEndReached?: () => any;
    renderFooter?: React.ReactElement | React.FunctionComponent | any;
}

interface TInner {}

export interface IMergeProps extends IProps, TInner {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & HTMLAttributes<HTMLElement>) => {
    const { histories } = props;
    if (!histories) {
        return null;
    }
    return (
        <ErrorBoundary>
            <WrappedComponent {...props} />
        </ErrorBoundary>
    );
};

export default enhance;
