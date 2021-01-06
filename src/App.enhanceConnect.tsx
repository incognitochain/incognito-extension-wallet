import React from 'react';
import { isDev } from 'src/configs';
import APP_CONSTANT from 'src/constants/app';
import { sendExtensionMessage } from 'src/utils/sendMessage';
import { getActiveTabs } from 'src/utils/app';

interface IProps {}

const enhanceConnect = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    const [connected, setConnected] = React.useState<boolean>(false);
    const [originUrl, setOriginUrl] = React.useState<string | null>(null);
    const handleCheckConnectAccount = async () => {
        const tabs: any = await getActiveTabs();
        const isConnected: any = await sendExtensionMessage(APP_CONSTANT.BACKGROUND_LISTEN.CHECK_IS_CONNECTED, {
            tab: tabs[0],
        });
        const { origin } = new URL(tabs[0].url);
        console.debug('CHECK CONNECT ACCOUNT: ', isConnected, origin);
        setOriginUrl(origin);
        setConnected(isConnected);
    };
    React.useEffect(() => {
        if (isDev) return;
        // check is connect
        handleCheckConnectAccount();
    }, []);
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
