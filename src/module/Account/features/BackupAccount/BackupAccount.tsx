import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Header } from 'src/components';
import { ILanguage } from 'src/i18n';
import { translateByFieldSelector } from 'src/module/Configs';
import styled from 'styled-components';
import { listAccountSelector } from 'src/module/Account';
import AccountItem from 'src/module/Account/features/AccountItem';
import { AccountInstance } from 'incognito-js/build/web/browser';
import copy from 'copy-to-clipboard';

const Styled = styled.div``;

const Backup = React.memo(() => {
    const [state, setState] = React.useState({
        copied: false,
    });
    const { copied } = state;
    const translate: ILanguage = useSelector(translateByFieldSelector)('account');
    const { backup } = translate;
    const listAccount = useSelector(listAccountSelector);
    const backupData = listAccount
        .map((account: AccountInstance) => `${account.name}: ${account.key.keySet.privateKeySerialized}`)
        .join('\n');
    const handleCopyAll = () => {
        setState({ ...state, copied: true });
        copy(backupData);
    };
    return (
        <Styled>
            <Header title={backup.headerTitle} />
            {listAccount.map((account: AccountInstance) => (
                <AccountItem
                    title={account.name}
                    desc={account.key.keySet.privateKeySerialized}
                    key={account.name}
                    limit={17}
                />
            ))}
            <Button title={copied ? backup.copied : backup.copyAll} onClick={handleCopyAll} />
        </Styled>
    );
});

export default Backup;
