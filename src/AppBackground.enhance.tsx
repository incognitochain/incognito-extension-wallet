import React from 'react';
import { useDispatch } from 'react-redux';
import { isDev } from 'src/configs';
import APP_CONSTANT from 'src/constants/app';
import { actionUpdateDataForceSend } from 'src/module/Send/Send.actions';
import { IRequestDApp } from 'src/module/Preload';
import { actionUpdateRequestFromDApp as updateRequestFromDApp } from 'src/module/Preload/Preload.actions';
import { actionLogin } from './module/Password';
import { sendExtensionMessage } from './utils/sendMessage';

interface IProps {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps) => {
    const dispatch = useDispatch();
    // Dispatch event, when wallet screen mount, catch this event and move to
    const handleUpdateRequestFromDApp = (payload: IRequestDApp | null) => {
        dispatch(updateRequestFromDApp(payload));
    };
    const loadPasswork = async () => {
        try {
            const pass: any = await sendExtensionMessage(APP_CONSTANT.BACKGROUND_LISTEN.GET_PASS_WORK, {});
            if (pass) dispatch(actionLogin(pass));
        } catch (error) {
            /* Ignored error */
            console.debug('LOAD PASSWORK WITH ERROR:', error);
        }
    };
    React.useEffect(() => {
        loadPasswork();
    }, []);
    // To do implement push connect
    React.useEffect(() => {
        if (isDev) return;
        chrome.runtime.onMessage.addListener((request: any, sender: any, sendResponse) => {
            sendResponse(sender);
            const { name, origin, data } = request;
            console.debug('PRELOAD REQUEST: ', request);
            if (!name) return;
            switch (name) {
                // move to connect account
                case APP_CONSTANT.EXTENSION_LISTEN.MOVE_TO_CONNECT_ACCOUNT: {
                    handleUpdateRequestFromDApp({ name, origin });
                    return;
                }
                // move to send tx
                case APP_CONSTANT.EXTENSION_LISTEN.MOVE_TO_SEND_TX: {
                    dispatch(actionUpdateDataForceSend(data));
                    handleUpdateRequestFromDApp({ name, origin });
                    return;
                }
                default:
                    break;
            }
            return true;
        });
    }, []);
    return <WrappedComponent {...props} />;
};

export default enhance;
