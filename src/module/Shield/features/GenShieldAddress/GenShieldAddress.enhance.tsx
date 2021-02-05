import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionToggleToast, TOAST_CONFIGS } from 'src/components';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { selectedTokenIdSelector } from 'src/module/Token';
import { actionFetch as actionGenShieldAddr, actionFreeShield } from 'src/module/Shield';

interface IProps {}

interface TInner {
    handleGenShieldAddr: () => any;
}

export interface IMergedProps extends IProps, TInner {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    const tokenId: string = useSelector(selectedTokenIdSelector);
    const dispatch = useDispatch();
    const handleGenShieldAddr = async () => {
        try {
            dispatch(actionGenShieldAddr({ tokenId }));
        } catch (error) {
            dispatch(
                actionToggleToast({
                    toggle: true,
                    type: TOAST_CONFIGS.error,
                    value: error,
                }),
            );
        }
    };
    React.useEffect(() => {
        if (tokenId) {
            handleGenShieldAddr();
        }
        return () => {
            dispatch(actionFreeShield());
        };
    }, [tokenId]);
    return (
        <ErrorBoundary>
            <WrappedComponent {...{ ...props, handleGenShieldAddr }} />
        </ErrorBoundary>
    );
};

export default enhance;
