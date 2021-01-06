import React from 'react';
import styled from 'styled-components';
import { LoadingIcon, RefreshIcon, SettingIcon } from 'src/components/Icons';
import QrCode from 'src/components/QrCodeLink';
import { BtnSelectAccount } from 'src/module/Account/features/SelectAccount';
import { route as receiveRoute } from 'src/module/Account/features/Receive';
import ConnectStatus from 'src/components/Icons/ConnectStatus';
import { useDispatch, useSelector } from 'react-redux';
import { ITheme } from 'src/styles';
import { delay } from 'src/utils';
import ErrorBoundary from '../ErrorBoundary';
import { refreshHeaderSelector } from './Header.selector';
import { actionSetRefreshPage } from './Header.actions';

const Styled = styled.div`
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .menu {
        display: flex;
        align-items: center;
    }
    .menu .btn-select-account {
        margin-left: 10px;
    }
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    div {
        margin-right: 10px;
    }
    .refresh-icon {
        -webkit-filter: ${(props: { theme: ITheme }) => props.theme.text};
        -webkit-filter: brightness(0%);
    }
`;

interface IProps {
    showConnectStatus?: boolean;
    showReloadBalance?: boolean;
    handleRefresh: () => any;
}

interface IReloadProps {
    handleRefresh: () => any;
}

const RefreshBalance = React.memo((props: IReloadProps & any) => {
    const { handleRefresh } = props;
    const refreshing: boolean = useSelector(refreshHeaderSelector);
    return <>{refreshing ? <LoadingIcon /> : <RefreshIcon className="refresh-icon" onClick={handleRefresh} />}</>;
});

const HeaderApp = React.memo((props: IProps & any) => {
    const { showConnectStatus, showReloadBalance, handleRefresh } = props;
    return (
        <Styled>
            <Row>
                <div className="menu">
                    <SettingIcon />
                </div>
                {!!showReloadBalance && <RefreshBalance handleRefresh={handleRefresh} />}
                {!!showConnectStatus && <ConnectStatus />}
            </Row>
            <div className="menu">
                <QrCode route={receiveRoute} />
                <BtnSelectAccount />
            </div>
        </Styled>
    );
});

const enhanceHeaderApp = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    const { showConnectStatus, showReloadBalance, handleRefresh } = props;
    const dispatch = useDispatch();
    const onHandleRefresh = async () => {
        if (typeof handleRefresh === 'function') {
            try {
                await dispatch(actionSetRefreshPage(true));
                await Promise.all([handleRefresh(true), delay()]);
            } catch (error) {
                throw error;
            } finally {
                dispatch(actionSetRefreshPage(false));
            }
        }
    };
    return (
        <ErrorBoundary>
            <HeaderApp
                handleRefresh={onHandleRefresh}
                showConnectStatus={showConnectStatus}
                showReloadBalance={showReloadBalance}
            />
            <WrappedComponent {...props} />
        </ErrorBoundary>
    );
};
export default enhanceHeaderApp;
