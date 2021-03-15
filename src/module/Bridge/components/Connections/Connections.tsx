import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connectMetamask, accountsMetamaskSelector } from 'src/module/Bridge';
import { ConnectWalletContext } from 'src/App.enhanceConnectWallet';
import { isEmpty } from 'lodash';
import { translateByFieldSelector } from 'src/module/Configs';
import { ellipsisCenter } from 'src/utils';
import { actionRemoveTooltip, actionShowTooltip } from 'src/module/Tooltip';
import { paymentAddressSelector } from 'src/module/Account';
import { Wrapper, AccountBox } from 'src/module/Bridge/components/Connections/Connections.styled';
import { ChainIcon } from 'src/components/Icons';

interface IAccountBoxProps {
    ref: any;
    text: string;
    onClick?: () => void;
    onMouseOver?: () => void;
    onMouseLeave?: () => void;
}

const ID_BTN_OUT_CHAIN = 'connect-out-chain';

const Connections = React.memo(() => {
    const outChainAccountRef: any = useRef();
    const incAccountRef: any = useRef(null);
    const dispatch = useDispatch();
    const { ethereum, isMetaMaskInstalled } = React.useContext(ConnectWalletContext);
    const { connectWallet } = useSelector(translateByFieldSelector)('bridge');
    const accounts = useSelector(accountsMetamaskSelector);
    const incPaymentAddress: string = useSelector(paymentAddressSelector);

    const metamaskAccount = React.useMemo(
        () => (isEmpty(accounts) ? connectWallet : ellipsisCenter({ str: accounts[0], limit: 7 })),
        [accounts],
    );
    const addressEllipsis = React.useMemo(
        () =>
            ellipsisCenter({
                str: incPaymentAddress,
                limit: 7,
            }),
        [incPaymentAddress],
    );

    const handleClickButtonConnect = async () => {
        if (!isMetaMaskInstalled) {
            /** Open link install metamask */
            return window.open('https://metamask.io/', '_blank');
        }
        /** Request Connect to metamask */
        if (isEmpty(accounts)) await connectMetamask(ethereum);
    };

    const mouseOutChainMoveHover = () => {
        dispatch(
            actionShowTooltip({
                id: ID_BTN_OUT_CHAIN,
                text: accounts[0],
                ref: outChainAccountRef ? outChainAccountRef.current : null,
                timeout: 0,
            }),
        );
    };

    const mouseOutChainMoveHoverOut = () => dispatch(actionRemoveTooltip(ID_BTN_OUT_CHAIN));

    const renderAccountBox = (payload: IAccountBoxProps) => {
        const { ref, text, onClick } = payload;
        return (
            <AccountBox
                ref={ref}
                className="fs-regular fw-medium"
                onClick={onClick}
                onMouseOver={mouseOutChainMoveHover}
                onMouseLeave={mouseOutChainMoveHoverOut}
            >
                <ChainIcon />
                {text}
            </AccountBox>
        );
    };

    return (
        <Wrapper>
            {renderAccountBox({ ref: outChainAccountRef, text: metamaskAccount, onClick: handleClickButtonConnect })}
            {renderAccountBox({ ref: incAccountRef, text: addressEllipsis })}
        </Wrapper>
    );
});

export default Connections;
