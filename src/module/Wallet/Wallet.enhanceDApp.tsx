import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { route as connectRoute } from 'src/module/Connect/Connect.route';
import { route as disconnectRoute } from 'src/module/Disconnect/Disconnect.route';
import { route as sendRoute } from 'src/module/Send';
import APP_CONSTANT from 'src/constants/app';
import { actionClearRequestFromDApp as clearRequestFromDApp, IRequestDApp, requestDAppSelector } from '../Preload';
import { LoadingContainer } from '../Preload/Preload.enhance';
import { IPreloadLanguage } from '../../i18n';
import { translateByFieldSelector } from '../Configs';

interface IProps {
    loadedBalance: boolean;
}

const enhanceDApp = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    const { loadedBalance } = props;
    const history = useHistory();
    const dispatch = useDispatch();
    const requestDApp: IRequestDApp | null = useSelector(requestDAppSelector);
    const translate: IPreloadLanguage = useSelector(translateByFieldSelector)('preload');
    React.useEffect(() => {
        if (!loadedBalance) return;
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
    }, [requestDApp, loadedBalance]);
    if (requestDApp && !loadedBalance) {
        return <LoadingContainer title={translate.title1} subTitle={translate.title2} />;
    }
    return <WrappedComponent {...props} />;
};

export default enhanceDApp;
