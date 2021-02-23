import React, { useCallback, useState } from 'react';
import { compose } from 'recompose';
import { withLayout } from 'src/components/Layout';
import { useSelector } from 'react-redux';
import { walletIdSelector } from 'src/module/Wallet';
import { isTab, openAsTab } from 'src/utils';
import { IProps } from './Welcome.interface';

const enhance = (WrappedComponent: any) => () => {
    const walletId = useSelector(walletIdSelector);
    const [isReset, setIsReset] = useState(walletId > -1 && isTab());
    const handleForgot = useCallback(() => {
        setIsReset(true);
        if (!isTab()) {
            openAsTab();
        }
    }, []);
    const handleBack = useCallback(() => {
        setIsReset(false);
    }, []);
    return <WrappedComponent isReset={isReset} onForgot={handleForgot} onBack={handleBack} />;
};

export default compose<IProps, any>(withLayout, enhance);
