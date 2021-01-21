import React from 'react';
import { compose } from 'recompose';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { withHeaderApp } from 'src/components/Header';
import withBalance from 'src/module/Account/Acount.enhanceBalance';
import { useSelector } from 'react-redux';
import { defaultAccountNameSelector, switchAccountSelector } from 'src/module/Account/Account.selector';
import { WalletInstance } from 'incognito-js/build/web/browser';
import throttle from 'lodash/throttle';
import { walletDataSelector } from 'src/module/Wallet/Wallet.selector';
import withWalletBalance from 'src/module/Wallet/Wallet.enhanceBalance';

interface IProps {
    loadBalance: () => void;
}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    const { loadBalance } = props;
    const [loading, setLoading] = React.useState<boolean>(true);
    const defaultAccount: string = useSelector(defaultAccountNameSelector);
    const wallet: WalletInstance = useSelector(walletDataSelector);
    const switchAccount = useSelector(switchAccountSelector);
    const [allFollowedTokens, setAllFollowedTokens] = React.useState<any>([]);
    const handleLoadBalance = throttle(
        async () => {
            const tokensBalance = await loadBalance();
            setAllFollowedTokens(tokensBalance);
            setLoading(false);
        },
        1000,
        { trailing: true },
    );
    React.useEffect(() => {
        setLoading(true);
        handleLoadBalance();
    }, [wallet, defaultAccount, switchAccount]);
    return (
        <ErrorBoundary>
            <WrappedComponent {...{ ...props, loading, allFollowedTokens }} />
        </ErrorBoundary>
    );
};

export default compose<IProps, any>(withBalance, withWalletBalance, enhance, withHeaderApp);
