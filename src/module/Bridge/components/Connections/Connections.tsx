import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connectMetamask, accountsMetamaskSelector } from 'src/module/Bridge';
import { ConnectWalletContext } from 'src/App.enhanceConnectWallet';
import { isEmpty } from 'lodash';
import { translateByFieldSelector } from 'src/module/Configs';
import { ellipsisCenter } from 'src/utils';
import { actionRemoveTooltip, actionShowTooltip } from 'src/module/Tooltip';
import { paymentAddressSelector } from 'src/module/Account';
import { Wrapper, AccountOutChain, AccountInChain } from 'src/module/Bridge/components/Connections/Connections.styled';
import { ChainIcon } from 'src/components/Icons';

const ID_BTN_OUT_CHAIN = 'connect-out-chain';

const Connections = React.memo(() => {
    const outChainAccountRef: any = useRef();
    const incAccountRef: any = useRef(null);
    const dispatch = useDispatch();
    const { ethereum, isMetaMaskInstalled } = React.useContext(ConnectWalletContext);
    const { connectWallet } = useSelector(translateByFieldSelector)('bridge');
    const accounts = useSelector(accountsMetamaskSelector);
    const incPaymentAddress: string = useSelector(paymentAddressSelector);
    console.log(incPaymentAddress);
    const handleClickButtonConnect = async () => {
        if (!isMetaMaskInstalled) {
            /** Open link install metamask */
            return window.open('https://metamask.io/', '_blank');
        }
        await connectMetamask(ethereum);
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

    return (
        <Wrapper>
            <AccountOutChain
                ref={outChainAccountRef}
                className="fs-regular fw-medium"
                onClick={handleClickButtonConnect}
                onMouseOver={mouseOutChainMoveHover}
                onMouseLeave={mouseOutChainMoveHoverOut}
            >
                {isEmpty(accounts)
                    ? connectWallet
                    : ellipsisCenter({
                          str: accounts[0],
                          limit: 7,
                      })}
            </AccountOutChain>
            <AccountInChain ref={incAccountRef} className="ml-10 fs-regular fw-medium">
                <ChainIcon />
                {isEmpty(accounts)
                    ? connectWallet
                    : ellipsisCenter({
                          str: incPaymentAddress,
                          limit: 7,
                      })}
            </AccountInChain>
        </Wrapper>
    );
});

export default Connections;
