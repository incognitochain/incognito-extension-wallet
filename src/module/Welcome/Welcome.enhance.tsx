import React, { useCallback, useMemo, useState } from 'react';
import { compose } from 'recompose';
import { withLayout } from 'src/components/Layout';
import { useSelector } from 'react-redux';
import { walletIdSelector } from 'src/module/Wallet';
import { IProps } from './Welcome.interface';

const enhance = (WrappedComponent: any) => () => {
    const [isReset, setIsReset] = useState(false);
    const walletId = useSelector(walletIdSelector);

    const isInitWallet = useMemo(() => {
        return walletId > -1;
    }, [walletId]);

    const handleForgot = useCallback(() => {
        setIsReset(true);
    }, []);

    return <WrappedComponent isReset={isReset} isInitWallet={isInitWallet} onForgot={handleForgot} />;
};

export default compose<IProps, any>(withLayout, enhance);
