import React from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { useDispatch, useSelector } from 'react-redux';
import { change } from 'redux-form';
import { sendExtensionMessage } from 'src/utils/sendMessage';
import APP_CONSTANT from 'src/constants/app';
import { isDev } from 'src/configs';
import { actionUpdateDataForceSend } from './Send.actions';
import { forceSendDataSelector } from './Send.selector';
import { IDataForceSend } from './Send.interface';
import { actionSetSelectedToken } from '../Token';
import { FORM_CONFIGS } from './Send.constant';

export interface TInner {
    forceSendData?: IDataForceSend;
    clearForceSendData: () => void;
    forceSendFinish: () => void;
    clearCurrentRequest: () => void;
}

const enhanceForceSend = (WrappedComponent: React.FunctionComponent) => (props: TInner & any) => {
    const forceSendData: IDataForceSend | null | undefined = useSelector(forceSendDataSelector);
    const dispatch = useDispatch();
    const handleClearForceSendData = () => dispatch(actionUpdateDataForceSend(undefined));
    // send finish => fail or success => update background.js
    const handleForceSendFinish = (error: any, txInfo: any) => {
        if (isDev) return;
        sendExtensionMessage(APP_CONSTANT.BACKGROUND_LISTEN.SEND_TX_FINISH, { error, txInfo });
    };
    // clear current request in background.js when tap back
    const handleClearCurrentRequest = async (error: any, txInfo: any) => {
        if (isDev) return;
        await sendExtensionMessage(APP_CONSTANT.BACKGROUND_LISTEN.CLEAR_SEND_CURRENT_REQUEST, { error, txInfo });
    };
    React.useEffect(() => {
        if (forceSendData) {
            dispatch(actionSetSelectedToken(forceSendData.tokenId));
            dispatch(change(FORM_CONFIGS.formName, FORM_CONFIGS.amount, forceSendData.amount));
            dispatch(change(FORM_CONFIGS.formName, FORM_CONFIGS.toAddress, forceSendData.toAddress));
            if (forceSendData.toAddress) {
                dispatch(change(FORM_CONFIGS.formName, FORM_CONFIGS.memo, forceSendData.memo));
            }
        }
    }, []);
    return (
        <ErrorBoundary>
            <WrappedComponent
                {...{
                    ...props,
                    forceSendData,
                    clearForceSendData: handleClearForceSendData,
                    forceSendFinish: handleForceSendFinish,
                    clearCurrentRequest: handleClearCurrentRequest,
                }}
            />
        </ErrorBoundary>
    );
};

export default enhanceForceSend;
