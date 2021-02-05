import React from 'react';
import { useSelector } from 'react-redux';
import { LoadingIcon } from 'src/components/Icons';
import { PRV } from 'src/constants/coin';
import { defaultAccountSelector, paymentAddressSelector } from 'src/module/Account';
import { convert } from 'src/utils';
import { walletDataSelector } from 'src/module/Wallet/Wallet.selector';
import { Styled } from './AccountConnectItem.styled';

interface IProps {
    loading: boolean;
    followedTokens: any[];
}

const AccountConnectItem = React.memo((props: IProps) => {
    const { loading, followedTokens } = props;
    let prvBalance: any = null;
    if (followedTokens && followedTokens.length > 0) {
        const [prvToken] = followedTokens;
        prvBalance = prvToken;
    }
    const account = useSelector(defaultAccountSelector);
    const wallet = useSelector(walletDataSelector);
    const paymentAddress = useSelector(paymentAddressSelector);
    const renderAccountName = () => <p className="account-name fs-medium fw-medium">{account?.name}</p>;
    const renderAccountContent = () => {
        if (!prvBalance) return;
        return (
            <Styled className="wrap-content">
                <p className="account-amount fs-regular fw-medium ellipsis">{`${convert.toHumanAmountString({
                    originalAmount: prvBalance.amount || 0,
                    decimals: PRV.pDecimals,
                })} PRV `}</p>
                <p className="payment-address  fs-regular fw-medium ellipsis">{paymentAddress}</p>
            </Styled>
        );
    };
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
                {loading || !prvBalance ? renderLoading() : renderAccountContent()}
            </Styled>
        </Styled>
    );
});

export default AccountConnectItem;
