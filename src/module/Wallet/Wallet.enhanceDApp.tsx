import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { route as connectRoute } from 'src/module/Connect/Connect.route';
import { route as disconnectRoute } from 'src/module/Disconnect/Disconnect.route';
import { route as sendRoute } from 'src/module/Send';
import { isDev } from 'src/configs';
import APP_CONSTANT from 'src/constants/app';
import { sendExtensionMessage } from 'src/utils/sendMessage';
import { getActiveTabs } from 'src/utils/app';
import Spinner from 'react-bootstrap/esm/Spinner';
import { actionClearRequestFromDApp as clearRequestFromDApp, IRequestDApp, requestDAppSelector } from '../Preload';

interface IProps {}

const enhanceDApp = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const requestDApp: IRequestDApp | null = useSelector(requestDAppSelector);
    const [connected, setConnected] = React.useState<boolean>(false);
    const handleCheckConnectAccount = async () => {
        const tabs: any = await getActiveTabs();
        const isConnected: any = await sendExtensionMessage(APP_CONSTANT.BACKGROUND_LISTEN.CHECK_IS_CONNECTED, {
            tab: tabs[0],
        });
        console.debug('CHECK CONNECT ACCOUNT: ', isConnected);
        setConnected(isConnected);
    };
    React.useEffect(() => {
        if (requestDApp) {
            switch (requestDApp?.name) {
                // move to connect account
                case APP_CONSTANT.EXTENSION_LISTEN.MOVE_TO_CONNECT_ACCOUNT:
                    history.push(connectRoute);
                    break;
                // move to disconnect account
                case APP_CONSTANT.EXTENSION_LISTEN.MOVE_TO_DISCONNECT_ACCOUNT:
                    history.push(disconnectRoute);
                    break;
                // move to send tx
                case APP_CONSTANT.EXTENSION_LISTEN.MOVE_TO_SEND_TX:
                    history.push(sendRoute);
                    break;
                default:
                    break;
            }
            dispatch(clearRequestFromDApp());
        }
    }, [requestDApp]);
    React.useEffect(() => {
        if (isDev) return;
        // check is connect
        handleCheckConnectAccount();
    }, []);
    if (requestDApp) return <Spinner animation="grow" />;
    return <WrappedComponent {...{ ...props, connected }} />;
};

export default enhanceDApp;
