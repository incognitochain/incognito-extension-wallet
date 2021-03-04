import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AccountInstance, WalletInstance } from 'incognito-js/build/web/browser';
import { actionToggleModal } from 'src/components/Modal';
import AccountDetails from 'src/module/Account/features/AccountDetail';
import { walletDataSelector } from 'src/module/Wallet';
import { darkModeSelector } from 'src/module/Setting';

interface TInner {
    onShowMnemonic: () => void;
    showMnemonic: boolean;
    onClickKey: (account: AccountInstance) => void;
    mnemonic: string;
    keychains: AccountInstance[];
}

interface IProps {}

export interface IMergeProps extends IProps, TInner {}

const enhance = (WrappedComponent: any) => (props: IProps & any) => {
    const [showMnemonic, setShowMnemonic] = useState(false);
    const wallet: WalletInstance = useSelector(walletDataSelector);
    const darkMode = useSelector(darkModeSelector);
    const { mnemonic, masterAccount } = wallet;
    const keychains = masterAccount.getAccounts();
    const dispatch = useDispatch();
    const onShowMnemonic = () => {
        setShowMnemonic(true);
    };
    const onClickKey = (account: AccountInstance) => {
        dispatch(
            actionToggleModal({
                data: <AccountDetails account={account} canRemove={keychains.length > 1} />,
                customModalStyle: {
                    backgroundColor: darkMode && '#121212',
                },
            }),
        );
    };
    return <WrappedComponent {...{ ...props, showMnemonic, onShowMnemonic, onClickKey, mnemonic, keychains }} />;
};

export default enhance;
