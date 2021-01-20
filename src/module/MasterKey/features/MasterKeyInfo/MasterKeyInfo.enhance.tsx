import React, { useState } from 'react';
import { compose } from 'recompose';
import { withLayout } from 'src/components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { AccountInstance } from 'incognito-js/build/web/browser';
import { actionClearAllModal, actionToggleModal } from 'src/components/Modal';
import AccountDetails from 'src/module/Account/features/AccountDetail';
import { actionFetchRemoveAccount } from 'src/module/Account';
import { translateSelector } from 'src/module/Configs';
import { actionToggleToast, SmallButton, TOAST_CONFIGS } from 'src/components';
import { IProps } from './MasterKeyInfo.inteface';

const enhance = (WrappedComponent: any) => (props: IProps) => {
    const [showMnemonic, setShowMnemonic] = useState(false);
    const dispatch = useDispatch();
    const translate = useSelector(translateSelector);
    const dictionary = translate.masterKey.info;
    const { general } = translate;

    const handleShow = () => {
        setShowMnemonic(true);
    };

    const handleClickKey = (account: AccountInstance) => {
        const { masterKey } = props;
        const keys = masterKey.masterAccount.getAccounts();

        const handleRemoveKeychain = () => {
            try {
                dispatch(actionFetchRemoveAccount(account.name));
                dispatch(actionClearAllModal());
                dispatch(
                    actionToggleToast({
                        toggle: true,
                        value: `${general.removed} ${account.name}`,
                        type: TOAST_CONFIGS.success,
                    }),
                );
            } catch (error) {
                console.debug(error);
            }
        };

        dispatch(
            actionToggleModal({
                data: <AccountDetails account={account} />,
                closeable: true,
                title: `${account.name} ${general.keys}`,
                rightHeader: keys.length > 1 && (
                    <SmallButton title={dictionary.removeKey} onClick={handleRemoveKeychain} />
                ),
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
