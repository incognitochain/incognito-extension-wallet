import { AccountInstance } from 'incognito-js/build/web/browser';
import React from 'react';
import { useSelector } from 'react-redux';
import { compose } from 'recompose';
import enhanceConnect from 'src/App.enhanceConnect';
import ErrorBoundary from 'src/components/ErrorBoundary';
import APP_CONSTANT from 'src/constants/app';
import { paymentAddressSelector, defaultAccountSelector } from 'src/module/Account';
import withBalance from 'src/module/Account/Acount.enhanceBalance';
import { sendExtensionMessage } from 'src/utils/sendMessage';
import { useHistory } from 'react-router-dom';

interface IProps {
    connected: boolean;
    originUrl: string;
    checkConnection: () => void;
    setConnected: () => void;
    setOriginUrl: () => void;
}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    const { originUrl } = props;
    const paymentAddress: string = useSelector(paymentAddressSelector);
    const account: AccountInstance = useSelector(defaultAccountSelector);
    const history = useHistory();
    const handleDisconnect = async () => {
        try {
            await sendExtensionMessage(APP_CONSTANT.BACKGROUND_LISTEN.DISCONNECT_ACCOUNT, { origin: originUrl });
            history.goBack();
        } catch (error) {
            console.log('Disconnect account with error: ', error);
        }
    };
    return (
        <ErrorBoundary>
            <WrappedComponent {...{ ...props, paymentAddress, account, handleDisconnect }} />
        </ErrorBoundary>
    );
};

export default compose<IProps, any>(enhanceConnect, withBalance, enhance);
