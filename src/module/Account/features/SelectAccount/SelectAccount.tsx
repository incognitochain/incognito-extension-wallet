import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AccountInstance } from 'incognito-js/build/web/browser';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { actionToggleToast, Header, TOAST_CONFIGS } from 'src/components';
import { withLayout } from 'src/components/Layout';
import { ILanguage } from 'src/i18n';
import { translateSelector } from 'src/module/Configs';
import { listAccountSelector, actionSwitchAccount } from 'src/module/Account';
import AccountItem from 'src/module/Account/features/AccountItem';

const Styled = styled.div``;

const SelectAccount = React.memo(() => {
    const translate: ILanguage = useSelector(translateSelector);
    const listAccount = useSelector(listAccountSelector);
    const history = useHistory();
    const dispatch = useDispatch();
    const handleSelectAccount = async (accountName: string) => {
        try {
            dispatch(actionSwitchAccount(accountName));
        } catch (error) {
            dispatch(actionToggleToast({ value: error, toggle: true, type: TOAST_CONFIGS.error }));
        } finally {
            history.goBack();
        }
    };

    return (
        <Styled>
            <Header title={translate.wallet.selectAccount.headerTitle} />
            {listAccount.map((account: AccountInstance) => (
                <AccountItem
                    title={account.name}
                    desc={account.key.keySet.paymentAddressKeySerialized}
                    hasCopy={false}
                    hasQrCode={false}
                    selectable
                    onSelectAccount={() => handleSelectAccount(account.name)}
                    key={account.name}
                />
            ))}
        </Styled>
    );
});

export default withLayout(SelectAccount);
