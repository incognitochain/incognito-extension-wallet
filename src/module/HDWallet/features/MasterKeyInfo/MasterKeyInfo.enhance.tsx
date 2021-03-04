import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AccountInstance, WalletInstance } from 'incognito-js/build/web/browser';
import { actionToggleModal } from 'src/components/Modal';
import AccountDetails from 'src/module/Account/features/AccountDetail';
import {
    isMasterlessSelector,
    listIdsWalletSelector,
    walletDataSelector,
    walletIdSelector,
} from 'src/module/Wallet/Wallet.selector';
import { darkModeSelector } from 'src/module/Setting';
import { actionToggleToast, TOAST_CONFIGS } from 'src/components';
import { actionFetchRemoveMasterKey } from 'src/module/Wallet/Wallet.actions';
import { useHistory } from 'react-router-dom';

interface TInner {
    onShowMnemonic: () => void;
    showMnemonic: boolean;
    onClickKey: (account: AccountInstance) => void;
    mnemonic: string;
    keychains: AccountInstance[];
    handleRemoveMasterKey: () => any;
    shouldShowRemove: boolean;
}

interface IProps {}

export interface IMergeProps extends IProps, TInner {}

const enhance = (WrappedComponent: any) => (props: IProps & any) => {
    const [showMnemonic, setShowMnemonic] = useState(false);
    const wallet: WalletInstance = useSelector(walletDataSelector);
    const darkMode = useSelector(darkModeSelector);
    const listIdsMasterKey = useSelector(listIdsWalletSelector);
    const walletId = useSelector(walletIdSelector);
    const isMasterless = useSelector(isMasterlessSelector)(walletId);
    const shouldShowRemove = !isMasterless && listIdsMasterKey.length > 1;
    const { mnemonic, masterAccount } = wallet;
    const keychains = masterAccount.getAccounts();
    const dispatch = useDispatch();
    const history = useHistory();
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
    const handleRemoveMasterKey = () => {
        try {
            dispatch(actionFetchRemoveMasterKey());
            history.goBack();
        } catch (error) {
            dispatch(actionToggleToast({ toggle: true, value: error, type: TOAST_CONFIGS.error }));
        }
    };
    return (
        <WrappedComponent
            {...{
                ...props,
                handleRemoveMasterKey,
                showMnemonic,
                onShowMnemonic,
                onClickKey,
                mnemonic,
                keychains,
                shouldShowRemove,
            }}
        />
    );
};

export default enhance;
