import React from 'react';
import { useSelector } from 'react-redux';
import { LoadingIcon } from 'src/components/Icons';
import { PRV, PRV_ID } from 'src/constants/coin';
import { defaultAccountSelector, paymentAddressSelector } from 'src/module/Account';
import { getPrivacyDataByTokenIDSelector } from 'src/module/Token';
import { convert } from 'src/utils';
import { walletDataSelector } from 'src/module/Wallet/Wallet.selector';
import { Styled } from './AccountConnectItem.styled';

interface IProps {
    loading: boolean;
}

const AccountConnectItem = React.memo((props: IProps) => {
    const { loading } = props;
    const prvBalance = useSelector(getPrivacyDataByTokenIDSelector)(PRV_ID);
    const account = useSelector(defaultAccountSelector);
    const wallet = useSelector(walletDataSelector);
    const paymentAddress = useSelector(paymentAddressSelector);
    const renderAccountName = () => <p className="account-name fs-medium fw-medium">{account?.name}</p>;
    const renderAccountContent = () => (
        <Styled className="wrap-content">
            <p className="account-amount fs-regular fw-medium ellipsis">{`${convert.toHumanAmountString({
                originalAmount: prvBalance.amount || 0,
                decimals: PRV.pDecimals,
            })} PRV `}</p>
            <p className="payment-address  fs-regular fw-medium ellipsis">{paymentAddress}</p>
        </Styled>
    );
    const renderLoading = () => (
        <Styled className="wrap-content">
            <LoadingIcon />
        </Styled>
    );
    return (
        <Styled className="wrapper">
            <p className="account-amount fs-medium fw-medium ellipsis">{wallet?.name}</p>
            <Styled className="content">
                {renderAccountName()}
                {loading ? renderLoading() : renderAccountContent()}
            </Styled>
        </Styled>
    );
});

export default AccountConnectItem;
