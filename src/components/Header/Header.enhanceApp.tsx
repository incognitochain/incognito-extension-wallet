import React from 'react';
import styled from 'styled-components';
import { SettingIcon } from 'src/components/Icons';
import QrCode from 'src/components/QrCodeLink';
import { BtnSelectAccount } from 'src/module/Account/features/SelectAccount';
import { route as receiveRoute } from 'src/module/Account/features/Receive';
import ErrorBoundary from '../ErrorBoundary';

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

const HeaderApp = React.memo(() => {
    return (
        <Styled>
            <div className="menu">
                <SettingIcon />
            </div>
            <div className="menu">
                <QrCode route={receiveRoute} />
                <BtnSelectAccount />
            </div>
        </Styled>
    );
});

const enhanceHeaderApp = (WrappedComponent: React.FunctionComponent) => (props: any) => {
    return (
        <ErrorBoundary>
            <HeaderApp />
            <WrappedComponent {...props} />
        </ErrorBoundary>
    );
};
export default enhanceHeaderApp;
