import React from 'react';
import { useDispatch } from 'react-redux';
import Web3 from 'web3';
import { actionUpdateMetamaskConnectAccounts as updateMetamaskConnectAccounts } from './module/Bridge/Bridge.actions';

interface IProps {}
interface IContext {
    ethereum: any;
    isMetaMaskInstalled: boolean;
    currentWeb3: any;
}
export const ConnectWalletContext = React.createContext<IContext>({
    ethereum: undefined,
    isMetaMaskInstalled: false,
    currentWeb3: undefined,
});

/** listen event connect Metamask, etc... */
const enhanceConnectWallet = (WrappedComponent: React.FunctionComponent) => (props: IProps) => {
    const { ethereum, web3 } = window;
    let currentWeb3;
    if (web3 && web3.currentProvider) {
        currentWeb3 = new Web3(web3.currentProvider);
    }
    const dispatch = useDispatch();

    const isMetaMaskInstalled = Boolean(ethereum && ethereum?.isMetaMask);

    const checkConnectAccount = async () => {
        let accounts = [];
        if (typeof ethereum !== 'undefined') {
            accounts = (await ethereum.request({ method: 'eth_accounts' })) || [];
        }
        dispatch(updateMetamaskConnectAccounts({ accounts }));
    };

    const handleAccountsChanged = (accounts: string[]) => dispatch(updateMetamaskConnectAccounts({ accounts }));

    const handleDisconnectAccount = () => dispatch(updateMetamaskConnectAccounts({ accounts: [] }));

    React.useEffect(() => {
        if (typeof ethereum === 'undefined') return;
        checkConnectAccount().then();
        ethereum.on('disconnect', handleDisconnectAccount);
        ethereum.on('accountsChanged', handleAccountsChanged);
    }, []);

    const connectWalletContextValue = {
        ethereum,
        isMetaMaskInstalled,
        currentWeb3,
    };

    return (
        <ConnectWalletContext.Provider value={connectWalletContextValue}>
            <WrappedComponent {...props} />
        </ConnectWalletContext.Provider>
    );
};

export default enhanceConnectWallet;
