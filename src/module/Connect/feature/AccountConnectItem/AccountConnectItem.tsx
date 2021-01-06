import React from 'react';
import { useSelector } from 'react-redux';
import { LoadingIcon } from 'src/components/Icons';
import { PRV_ID } from 'src/constants/coin';
import { defaultAccountSelector, paymentAddressSelector } from 'src/module/Account';
import { getPrivacyDataByTokenIDSelector } from 'src/module/Token';
import { Styled } from './AccountConnectItem.styled';

interface IProps {
    loading: boolean;
}

const AccountConnectItem = React.memo((props: IProps) => {
    const { loading } = props;
    const prvBalance = useSelector(getPrivacyDataByTokenIDSelector)(PRV_ID);
    const account = useSelector(defaultAccountSelector);
    const paymentAddress = useSelector(paymentAddressSelector);
    const renderAccountName = () => <p className="account-name fs-medium fw-normal">{account?.name}</p>;
    const renderAccountContent = () => (
        <Styled className="wrap-content">
            <p className="account-amount fs-regular fw-normal">{`${prvBalance.amount} PRV `}</p>
            <p className="payment-address ellipsis">{paymentAddress}</p>
        </Styled>
    );
    const renderLoading = () => (
        <Styled className="wrap-content">
            <LoadingIcon />
        </Styled>
    );
    return (
        <Styled className="wrapper">
            {renderAccountName()}
            {loading ? renderLoading() : renderAccountContent()}
        </Styled>
    );
});

export default AccountConnectItem;
