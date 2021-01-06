import React, { useState } from 'react';
import { compose } from 'recompose';
import { withLayout } from 'src/components/Layout';
import { useDispatch } from 'react-redux';
import { AccountInstance } from 'incognito-js/build/web/browser';
import { actionToggleModal } from 'src/components/Modal';
import AccountDetails from 'src/module/Account/features/AccountDetail';
import { IProps } from './MasterKeyInfo.inteface';

const enhance = (WrappedComponent: any) => (props: IProps) => {
    const [showMnemonic, setShowMnemonic] = useState(false);
    const dispatch = useDispatch();

    const handleShow = () => {
        setShowMnemonic(true);
    };

    const handleClickKey = (account: AccountInstance) => {
        dispatch(
            actionToggleModal({
                data: <AccountDetails account={account} />,
                closeable: true,
                title: account.name,
            }),
        );
    };

    return (
        <WrappedComponent
            {...props}
            showMnemonic={showMnemonic}
            onShowMnemonic={handleShow}
            onClickKey={handleClickKey}
        />
    );
};

export default compose<IProps, any>(withLayout, enhance);
