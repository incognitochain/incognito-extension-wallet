import React from 'react';
import { compose } from 'recompose';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { withHeaderApp } from 'src/components/Header';
import withBalance from '../Account/Acount.enhanceBalance';

interface IProps {
    loadBalance: () => void;
}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    const { loadBalance } = props;
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
    }, []);
    return (
        <ErrorBoundary>
            <WrappedComponent {...{ ...props, loading, allFollowedTokens }} />
        </ErrorBoundary>
    );
};

export default compose<IProps, any>(withHeaderApp, withBalance, enhance);
