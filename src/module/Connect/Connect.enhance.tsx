import React from 'react';
import { compose } from 'recompose';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { withHeaderApp } from 'src/components/Header';
import withBalance from 'src/module/Account/Acount.enhanceBalance';
import { useSelector } from 'react-redux';
import { defaultAccountNameSelector } from 'src/module/Account/Account.selector';

interface IProps {
    loadBalance: () => void;
}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    const { loadBalance } = props;
    const accountName = useSelector(defaultAccountNameSelector);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [allFollowedTokens, setAllFollowedTokens] = React.useState<any>([]);
    const handleLoadBalance = async () => {
        const tokensBalance = await loadBalance();
        return tokensBalance;
    };
    React.useEffect(() => {
        setLoading(true);
        handleLoadBalance().then((tokens) => {
            setAllFollowedTokens(tokens);
            setLoading(false);
        });
    }, [accountName]);
    return (
        <ErrorBoundary>
            <WrappedComponent {...{ ...props, loading, allFollowedTokens }} />
        </ErrorBoundary>
    );
};

export default compose<IProps, any>(withHeaderApp, withBalance, enhance);
