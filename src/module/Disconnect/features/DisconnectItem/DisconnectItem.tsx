import { AccountInstance } from 'incognito-js/build/web/browser';
import React from 'react';
import withEnhance from './DisconnectItem.enhance';
import { Styled, Row } from './DisconnectItem.styled';

interface IProps {
    account: AccountInstance;
    paymentAddress: string;
    connected: boolean;
}

const DisconnectItem = React.memo((props: IProps & any) => {
    const { account, paymentAddress, connected, handleDisconnet } = props;
    const renderButtonDisconnect = () => (
        <div onClick={handleDisconnet}>
            <p className="status fw-regular">Diconnect</p>
        </div>
    );
    return (
        <Styled className="wrapper">
            <Row className="space-between">
                <Row>
                    <p className="account-name fw-medium">{account.name}</p>
                    <Row className="margin-left">
                        <p className="payment-address fw-medium">(</p>
                        <p className="payment-address ellipsis fw-medium">{paymentAddress}</p>
                        <p className="payment-address fw-medium">)</p>
                    </Row>
                </Row>
                {connected && renderButtonDisconnect()}
            </Row>
            <p className="bottom-status">Active</p>
        </Styled>
    );
});

export default withEnhance(DisconnectItem);
