import React from 'react';
import { compose } from 'recompose';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { withHeaderApp } from 'src/components/Header';
import withBalance from 'src/module/Account/Acount.enhanceBalance';
import { useSelector } from 'react-redux';
import { switchAccountSelector } from 'src/module/Account/Account.selector';
import debounce from 'lodash/debounce';

interface IProps {
    loadBalance: () => void;
}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    const { loadBalance } = props;
    const [loading, setLoading] = React.useState<boolean>(true);
    const switchAccount = useSelector(switchAccountSelector);
    const [allFollowedTokens, setAllFollowedTokens] = React.useState<any>([]);
    const handleLoadBalance = debounce(async () => {
        setLoading(true);
        const tokensBalance = await loadBalance();
        setAllFollowedTokens(tokensBalance);
        setTimeout(() => setLoading(false), 1000);
    }, 1000);
    React.useEffect(() => {
        if (switchAccount) return;
        handleLoadBalance.cancel();
        handleLoadBalance();
    }, [switchAccount]);
    return (
        <ErrorBoundary>
            <WrappedComponent {...{ ...props, loading, allFollowedTokens }} />
        </ErrorBoundary>
    );
};

export default compose<IProps, any>(withBalance, enhance, withHeaderApp);
