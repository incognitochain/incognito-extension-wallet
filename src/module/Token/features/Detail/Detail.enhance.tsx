import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'recompose';
import { actionToggleToast, TOAST_CONFIGS } from 'src/components';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { withLayout } from 'src/components/Layout';
import { defaultAccountSelector } from 'src/module/Account';
import { actionFetchCacheHistory } from 'src/module/History';
import { selectedTokenIdSelector } from 'src/module/Token';
import { walletDataSelector } from 'src/module/Wallet';
import { actionGetBalanceByTokenId } from 'src/redux/actions';

interface IProps {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps) => {
    const dispatch = useDispatch();
    const selectedPrivacyTokenId = useSelector(selectedTokenIdSelector);
    const account = useSelector(defaultAccountSelector);
    const wallet = useSelector(walletDataSelector);
    const fetchData = async () => {
        try {
            dispatch(actionFetchCacheHistory());
            dispatch(actionGetBalanceByTokenId());
        } catch (error) {
            dispatch(
                actionToggleToast({
                    toggle: true,
                    value: error?.message || JSON.stringify(error),
                    type: TOAST_CONFIGS.error,
                }),
            );
        }
    };
    React.useEffect(() => {
        fetchData();
    }, [selectedPrivacyTokenId, account, wallet]);
    return (
        <ErrorBoundary>
            <WrappedComponent {...props} />
        </ErrorBoundary>
    );
};

export default compose<IProps, any>(withLayout, enhance);
