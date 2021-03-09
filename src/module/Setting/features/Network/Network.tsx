import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from 'src/components';
import { withLayout } from 'src/components/Layout';
import { ILanguage } from 'src/i18n';
import { translateSelector } from 'src/module/Configs';
import { actionSetConfigs, actionSetServer, serverSelector } from 'src/module/Preload';
import { IServer } from 'src/services';
import styled from 'styled-components';
import { isDevSelector, actionToggleDevMode, defaultListServerSelector } from 'src/module/Setting';
import { reloadApp } from 'src/utils';

interface INetworkItem {
    title: string;
    desc: string;
    onChangeNetwork?: () => void;
}

const Styled = styled.div`
    cursor: pointer;
    .network-item {
        margin-bottom: 30px;
    }
    .network-item .title {
        margin-bottom: 15px;
    }
    .network-item .desc {
    }
`;

const NetworkItem = React.memo((props: INetworkItem) => {
    const { title, desc, onChangeNetwork } = props;
    const handleClick = () => typeof onChangeNetwork === 'function' && onChangeNetwork();
    return (
        <div className="network-item" onClick={handleClick}>
            <p className="title fs-medium">{title}</p>
            <p className="desc fs-regular">{desc}</p>
        </div>
    );
});

const Network = React.memo(() => {
    const translate: ILanguage = useSelector(translateSelector);
    const networkTranslate = translate.setting.network;
    const defaultList = useSelector(defaultListServerSelector);
    const defaultServer = useSelector(serverSelector);
    const dispatch = useDispatch();
    const [totalClick, setTotalClick] = React.useState(0);
    const isDev = useSelector(isDevSelector);
    const handleChangeNetwork = async (server: IServer) => {
        const currentClick = totalClick + 1;
        await setTotalClick(currentClick);
        if (currentClick === 7) {
            return dispatch(actionToggleDevMode());
        }
        if (defaultServer.id !== server.id && isDev && server.id !== 'local') {
            await dispatch(
                actionSetConfigs({
                    mainnet: !!server.default,
                    apiURL: server.apiURL || '',
                    chainURL: server.chainURL || '',
                }),
            );
            await dispatch(actionSetServer(server));
            setTimeout(() => {
                reloadApp();
            }, 1000);
        }
    };
    return (
        <Styled>
            <Header title={networkTranslate.title} />
            {defaultList.map((server) => (
                <NetworkItem
                    key={server.id}
                    title={server.name}
                    desc={server.address}
                    onChangeNetwork={() => handleChangeNetwork(server)}
                />
            ))}
        </Styled>
    );
});

export default withLayout(Network);
