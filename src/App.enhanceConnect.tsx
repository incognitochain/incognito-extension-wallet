import React from 'react';
import { isDev } from 'src/configs';
import APP_CONSTANT from 'src/constants/app';
import { sendExtensionMessage } from 'src/utils/sendMessage';
import { getActiveTabs, getLastFocusedWindow } from 'src/utils/app';
import { useSelector } from 'react-redux';
import { defaultAccountNameSelector } from './module/Account';

interface IProps {}

const enhanceConnect = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    const [connected, setConnected] = React.useState<boolean>(false);
    const [originUrl, setOriginUrl] = React.useState<string | null>(null);
    const accountName = useSelector(defaultAccountNameSelector);
    const handleCheckConnectAccount = async () => {
        const activeTabs: any = await getActiveTabs();
        const lastFocusedWindow: any = await getLastFocusedWindow();
        let tab = null;
        if (lastFocusedWindow.type !== 'popup') {
            tab = activeTabs.find((activeTab: any) => activeTab.windowId === lastFocusedWindow.id);
        }
        const response: any = await sendExtensionMessage(APP_CONSTANT.BACKGROUND_LISTEN.CHECK_IS_CONNECTED, {
            tab,
            accountName,
        });
        if (response) {
            const { isConnect, origin } = response;
            setOriginUrl(origin);
            setConnected(isConnect);
            console.debug('CHECK CONNECT ACCOUNT: ', isConnect, origin);
        }
    };
    React.useEffect(() => {
        if (isDev) return; // check is connect
        handleCheckConnectAccount().then();
    }, [accountName]);
    return (
        <WrappedComponent
            {...{
                ...props,
                connected,
                originUrl,
                checkConnection: handleCheckConnectAccount,
                setConnected,
                setOriginUrl,
            }}
        />
    );
};

export default enhanceConnect;
