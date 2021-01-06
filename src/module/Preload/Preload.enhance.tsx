import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'recompose';
import styled from 'styled-components';
import Spinner from 'react-bootstrap/esm/Spinner';
import { IWalletReducer, walletSelector } from 'src/module/Wallet';
import { Button } from 'src/components';
import { translateByFieldSelector } from 'src/module/Configs/Configs.selector';
import { IPreloadLanguage } from 'src/i18n';
import { isDev } from 'src/configs';
import APP_CONSTANT from 'src/constants/app';
import { actionUpdateDataForceSend } from 'src/module/Send/Send.actions';
import {
    actionFetch as actionPreloadApp,
    actionUpdateRequestFromDApp as updateRequestFromDApp,
} from './Preload.actions';
import { preloadSelector } from './Preload.selector';
import { IRequestDApp } from './Preload.reducer';

const Styled = styled.div`
    > p {
        margin-top: 15px;
    }
`;

interface IProps {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps) => {
    const dispatch = useDispatch();
    const { loaded }: IWalletReducer = useSelector(walletSelector);
    const { error, isFetching: preloading, isFetched: preloaded } = useSelector(preloadSelector);
    const translate: IPreloadLanguage = useSelector(translateByFieldSelector)('preload');
    const handlePreload = () => dispatch(actionPreloadApp());
    React.useEffect(() => {
        handlePreload();
    }, []);
    // Dispatch event, when wallet screen mount, catch this event and move to
    // const handleUpdateRequestFromDApp = (payload: IRequestDApp | null) => {
    //     dispatch(updateRequestFromDApp(payload));
    // };
    // React.useEffect(() => {
    //     // To do implement push connect
    //     if (isDev) return;
    //     chrome.runtime.onMessage.addListener((request: any, sender: any, sendResponse) => {
    //         sendResponse(sender);
    //         const { name, origin, data } = request;
    //         console.debug('PRELOAD REQUEST: ', request);
    //         if (!name) return;
    //         switch (name) {
    //             // move to connect account
    //             case APP_CONSTANT.EXTENSION_LISTEN.MOVE_TO_CONNECT_ACCOUNT: {
    //                 handleUpdateRequestFromDApp({ name, origin });
    //                 return;
    //             }
    //             // move to send tx
    //             case APP_CONSTANT.EXTENSION_LISTEN.MOVE_TO_SEND_TX: {
    //                 dispatch(actionUpdateDataForceSend(data));
    //                 handleUpdateRequestFromDApp({ name, origin });
    //                 return;
    //             }
    //             default:
    //                 break;
    //         }
    //         return true;
    //     });
    // }, []);
    if (preloading || !loaded || !preloaded) {
        return (
            <Styled className="preload-container">
                <Spinner animation="grow" />
                <p className="fw-medium fs-medium sub-text" dangerouslySetInnerHTML={{ __html: translate.title1 }} />
                {!!error && !preloaded && !preloading && (
                    <>
                        <p className="sub-text" dangerouslySetInnerHTML={{ __html: translate.title2 }} />
                        {!!error && <p className="sub-text">{error}</p>}
                        <Button title={translate.btnRetry} onClick={handlePreload} />
                    </>
                )}
            </Styled>
        );
    }
    return <WrappedComponent {...props} />;
};

export default compose<IProps, any>(enhance);
