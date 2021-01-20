import React from 'react';
import { Button, Header } from 'src/components';
import { translateByFieldSelector } from 'src/module/Configs';
import { IConnectLanguage } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { AccountInstance } from 'incognito-js/build/web/browser';
import { paymentAddressSelector, defaultAccountSelector } from 'src/module/Account';
import { isDev } from 'src/configs';
import APP_CONSTANT from 'src/constants/app';
import { sendExtensionMessage } from 'src/utils/sendMessage';
import CheckBox from 'src/components/Core/FillCheckBox';
import {
    actionClearRequestFromDApp as clearRequestFromDApp,
    IRequestDApp,
    requestDAppSelector,
} from 'src/module/Preload';
import { useHistory } from 'react-router';
import withEnhance from './Connect.enhance';
import { Styled } from './Connect.styled';
import AccountConnectItem from './feature/AccountConnectItem';

interface IProps {
    loading: boolean;
    allFollowedTokens: any;
}

const DAppURL = React.memo(() => {
    const requestDApp: IRequestDApp | null = useSelector(requestDAppSelector);
    if (!requestDApp) return null;
    return <p className="original-url fw-regular fs-regular">{requestDApp?.origin}</p>;
});

const Connect = React.memo((props: IProps & any) => {
    const { loading, allFollowedTokens } = props;
    const dispatch = useDispatch();
    const [isAccept, setIsAccept] = React.useState<boolean>(false);
    const [connecting, setConnecting] = React.useState<boolean>(false);
    const translate: IConnectLanguage = useSelector(translateByFieldSelector)('connect');
    const paymentAddress: string = useSelector(paymentAddressSelector);
    const handleChecked = () => setIsAccept(!isAccept);
    const account: AccountInstance = useSelector(defaultAccountSelector);
    const history = useHistory();
    const handleSendAccount = async () => {
        try {
            setConnecting(true);
            const formatAccount = {
                name: account.name,
                paymentAddress,
                tokens: allFollowedTokens,
            };
            setTimeout(() => {
                setConnecting(false);
            }, 2000);
            if (isDev) return;
            sendExtensionMessage(APP_CONSTANT.BACKGROUND_LISTEN.SELECTED_CONNECT_ACCOUNT, {
                account: formatAccount,
            });
        } catch (error) {
            /* Ignore error */
        }
    };
    const handleGoBack = () => {
        dispatch(clearRequestFromDApp());
        history.goBack();
    };
    return (
        <Styled className="hook-container">
            <Header title={translate.headerTitle} onGoBack={handleGoBack} />
            <DAppURL />
            <AccountConnectItem loading={loading} />
            <CheckBox
                checked={isAccept}
                label="I trust this app to view the balance of my current address"
                onHandleChecked={handleChecked}
            />
            <Button title="Connect" onClick={handleSendAccount} disabled={!isAccept || loading} loading={connecting} />
        </Styled>
    );
});

export default withEnhance(Connect);
