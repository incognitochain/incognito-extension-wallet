import React from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { actionFreeHistory } from 'src/module/History';
import { useDispatch } from 'react-redux';
import { actionSetSelectedToken } from 'src/module/Token';

interface IProps {}

const enhanceInitData = (WrappedComponent: React.FunctionComponent) => (props: IProps) => {
    const dispatch = useDispatch();
    const handleInitData = () => {
        dispatch(actionFreeHistory());
        dispatch(actionSetSelectedToken(''));
    };
    React.useEffect(() => {
        handleInitData();
    }, []);
    return (
        <ErrorBoundary>
            <WrappedComponent {...props} />
        </ErrorBoundary>
    );
};

export default enhanceInitData;
