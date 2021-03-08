import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AccountInstance } from 'incognito-js/build/web/browser';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { actionToggleToast, Header, TOAST_CONFIGS } from 'src/components';
import { ILanguage } from 'src/i18n';
import { translateSelector } from 'src/module/Configs';
import { listAccountSelector, actionSwitchAccount, isAccountSelectedSelector } from 'src/module/Account';
import AccountItem from 'src/module/Account/features/AccountItem';
import { keySearchSelector, useSearchBox } from 'src/components/Header';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';

const Styled = styled.div``;

const SelectAccount = React.memo(() => {
    const translate: ILanguage = useSelector(translateSelector);
    const listAccount = useSelector(listAccountSelector);
    const history = useHistory();
    const dispatch = useDispatch();
    const keySearch = useSelector(keySearchSelector);
    const isAccountSelected = useSelector(isAccountSelectedSelector);
    const { result } = useSearchBox({
        data: listAccount,
        handleFilter: () => [
            ...listAccount.filter(
                (account) =>
                    includes(toLower(account.name), keySearch) ||
                    includes(toLower(account.key.keySet.paymentAddressKeySerialized), keySearch),
            ),
        ],
    });
    const handleSelectAccount = async (account: AccountInstance) => {
        try {
            const isSelected = isAccountSelected(account);
            if (isSelected) {
                return;
            }
            dispatch(actionSwitchAccount(account.name));
        } catch (error) {
            dispatch(actionToggleToast({ value: error, toggle: true, type: TOAST_CONFIGS.error }));
        } finally {
            history.goBack();
        }
    };

    return (
        <Styled>
            <Header title={translate.wallet.selectAccount.headerTitle} canSearch />
            <div className="scroll-view">
                {result.map((account: AccountInstance) => (
                    <AccountItem
                        title={account.name}
                        desc={account.key.keySet.paymentAddressKeySerialized}
                        hasCopy={false}
                        hasQrCode={false}
                        selectable
                        onSelectAccount={() => handleSelectAccount(account)}
                        key={account.name}
                    />
                ))}
            </div>
        </Styled>
    );
});

export default SelectAccount;
