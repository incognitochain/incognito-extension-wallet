import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ENVS, isDev } from 'src/configs';
import APP_CONSTANT from 'src/constants/app';
import { actionUpdateDataForceSend } from 'src/module/Send/Send.actions';
import { chainURLSelector, IRequestDApp } from 'src/module/Preload';
import { actionUpdateRequestFromDApp as updateRequestFromDApp } from 'src/module/Preload/Preload.actions';
import { actionLogin } from './module/Password';
import { sendExtensionMessage } from './utils/sendMessage';

interface IProps {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps) => {
    const dispatch = useDispatch();
    const chainURL = useSelector(chainURLSelector);
    // Dispatch event, when wallet screen mount, catch this event and move to
    const handleUpdateRequestFromDApp = (payload: IRequestDApp | null) => {
        dispatch(updateRequestFromDApp(payload));
    };
    const loadPassword = async () => {
        try {
            let pass: any = await sendExtensionMessage(APP_CONSTANT.BACKGROUND_LISTEN.GET_PASS_WORD, { chainURL });
            if (isDev) pass = ENVS.REACT_APP_PASSWORD_SECRET_KEY;
            if (pass) dispatch(actionLogin(pass));
        } catch (error) {
            console.debug('LOAD PASS_WORD WITH ERROR:', error);
        }
    };
    React.useEffect(() => {
        if (!chainURL) return;
        loadPassword().then();
    }, [chainURL]);
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
