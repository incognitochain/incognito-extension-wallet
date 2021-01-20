import { AccountInstance } from 'incognito-js/build/web/browser';
import React from 'react';
import { useSelector } from 'react-redux';
import { PRV, PRV_ID } from 'src/constants/coin';
import { getPrivacyDataByTokenIDSelector } from 'src/module/Token';
import convert from 'src/utils/convert';
import { walletDataSelector } from 'src/module/Wallet/Wallet.selector';
import withEnhance from './DisconnectItem.enhance';
import { Styled, Row } from './DisconnectItem.styled';

interface IProps {
    account: AccountInstance;
    paymentAddress: string;
    connected: boolean;
}

const DisconnectItem = React.memo((props: IProps & any) => {
    const { account, paymentAddress, connected, handleDisconnect } = props;
    const prvBalance = useSelector(getPrivacyDataByTokenIDSelector)(PRV_ID);
    const wallet = useSelector(walletDataSelector);
    const renderButtonDisconnect = () => (
        <div onClick={handleDisconnect}>
            <p className="status fw-regular">Diconnect</p>
        </div>
    );
    return (
        <Styled className="wrapper">
            <p className="account-amount fs-medium fw-medium ellipsis">{wallet?.name}</p>
            <Styled className="wrapper content">
                <Row className="space-between force-height">
                    <p className="account-name fw-medium fs-medium">{account.name}</p>
                    {connected && renderButtonDisconnect()}
                </Row>
                <Row className="space-between">
                    <p className="account-amount fs-regular fw-medium ellipsis">{`${convert.toHumanAmountString({
                        originalAmount: prvBalance.amount || 0,
                        decimals: PRV.pDecimals,
                    })} PRV `}</p>
                    <p className="payment-address fs-regular fw-medium ellipsis">{paymentAddress}</p>
                </Row>
            </Styled>
        </Styled>
    );
});

export default withEnhance(DisconnectItem);
