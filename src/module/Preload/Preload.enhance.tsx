import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { IWalletReducer, walletSelector } from 'src/module/Wallet';
import { AppIcon, Button } from 'src/components';
import { translateByFieldSelector } from 'src/module/Configs/Configs.selector';
import { IPreloadLanguage } from 'src/i18n';
import { forceSendDataSelector } from 'src/module/Send/Send.selector';
import { isTab } from 'src/utils';
import { chainTokensSelector, pTokensSelector } from 'src/module/Token';
import { actionFetch as actionPreloadApp } from './Preload.actions';
import { modePreloadSelector, preloadSelector } from './Preload.selector';
import { MODE } from './Preload.constant';

const Styled = styled.div`
    > p {
        margin-top: 15px;
    }
    .app-icon {
        margin-bottom: 0;
    }
`;

interface ILoadingContainerProps {
    showMessage?: boolean;
    message?: string;
    title: string;
    subTitle: string;
    buttonTitle?: string;
    onClick?: () => void;
}

export const LoadingContainer = React.memo((props: ILoadingContainerProps) => {
    const { showMessage, message, title, subTitle, buttonTitle, onClick } = props;
    return (
        <Styled className="preload-container">
            <AppIcon />
            <p className="fw-medium fs-medium sub-text" dangerouslySetInnerHTML={{ __html: title }} />
            {!!showMessage && (
                <>
                    <p className="sub-text" dangerouslySetInnerHTML={{ __html: subTitle }} />
                    {!!message && <p className="sub-text">{message}</p>}
                    {onClick && !!buttonTitle && <Button title={buttonTitle} onClick={onClick} />}
                </>
            )}
        </Styled>
    );
});

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
    const dispatch = useDispatch();
    const { loaded }: IWalletReducer = useSelector(walletSelector);
    const translate: IPreloadLanguage = useSelector(translateByFieldSelector)('preload');
    const { error, isFetching: preloading, isFetched: preloaded } = useSelector(preloadSelector);
    const pTokens = useSelector(pTokensSelector);
    const chainTokens = useSelector(chainTokensSelector);
    const forceSendData = useSelector(forceSendDataSelector);
    const handlePreload = () => dispatch(actionPreloadApp(forceSendData?.accountName));
    const modePreload: number = useSelector(modePreloadSelector);
    React.useEffect(() => {
        if (!isTab()) {
            handlePreload();
        }
    }, []);
    if (isTab() || modePreload === MODE.browser) {
        return (
            <div>
                <AppIcon />
                <div className="fw-bold fs-medium">{translate.openExtension}</div>
                <div className="fs-regular text-color-grey m-t-15">{translate.openExtensionSub}</div>
            </div>
        );
    }
    if (preloading || !loaded || !preloaded || !pTokens || !chainTokens) {
        return (
            <LoadingContainer
                title={translate.title1}
                subTitle={translate.title2}
                showMessage={!!error && !preloaded && !preloading}
                message={error}
                buttonTitle={translate.btnRetry}
                onClick={handlePreload}
            />
        );
    }
    return <WrappedComponent {...props} />;
};

export default enhance;
