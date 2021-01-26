import React, { HTMLAttributes } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'recompose';
import { actionToggleToast, TOAST_CONFIGS } from 'src/components';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { withHeaderApp } from 'src/components/Header';
import { defaultAccountSelector, switchAccountSelector } from 'src/module/Account';
import { actionFetchAllHistory, actionFetchReceiveHistory, receiveHistoryDataSelector } from 'src/module/History';
import { actionRetryLastWithdrawTxs } from 'src/module/Send/features/UnShield';
import { selectedTokenIdSelector } from 'src/module/Token';
import { walletDataSelector } from 'src/module/Wallet';
import { actionGetBalanceByTokenId } from 'src/redux/actions';

interface IProps {}

interface TInner {
    fetchData: () => any;
    handleOnEndReached: () => any;
}

export interface IMergedProps extends IProps, TInner {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & HTMLAttributes<HTMLElement>) => {
    const dispatch = useDispatch();
    const selectedPrivacyTokenId = useSelector(selectedTokenIdSelector);
    const account = useSelector(defaultAccountSelector);
    const switchAccount = useSelector(switchAccountSelector);
    const wallet = useSelector(walletDataSelector);
    const receiveHistory = useSelector(receiveHistoryDataSelector);
    const { shouldLoadmore, notEnoughData } = receiveHistory;
    const fetchData = async () => {
        try {
            await Promise.all([dispatch(actionFetchAllHistory()), dispatch(actionGetBalanceByTokenId())]);
        } catch (error) {
            dispatch(
                actionToggleToast({
                    toggle: true,
                    value: error,
                    type: TOAST_CONFIGS.error,
                }),
            );
        } finally {
            dispatch(actionRetryLastWithdrawTxs());
        }
    };
    const handleOnEndReached = () => {
        if (shouldLoadmore) {
            dispatch(actionFetchReceiveHistory());
        }
    };
    React.useEffect(() => {
        if (!switchAccount) {
            fetchData();
        }
    }, [selectedPrivacyTokenId, account, wallet, switchAccount]);
    React.useEffect(() => {
        if (notEnoughData) {
            dispatch(actionFetchReceiveHistory());
        }
    }, [notEnoughData]);
    return (
        <ErrorBoundary>
            <WrappedComponent
                {...{
                    ...props,
                    handleRefresh: fetchData,
                    showReloadBalance: true,
                    showConnectStatus: true,
                    handleOnEndReached,
                }}
            />
        </ErrorBoundary>
    );
};

export default compose<TInner, any>(enhance, withHeaderApp);
