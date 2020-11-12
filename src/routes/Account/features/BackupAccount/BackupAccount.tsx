import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Header } from 'src/components';
import { withLayout } from 'src/components/Layout';
import { ILanguage } from 'src/i18n';
import { translateSelector } from 'src/routes/Configs';
import styled from 'styled-components';
import { listAccountSelector } from 'src/routes/Account';
import AcccountItem from 'src/routes/Account/features/AcccountItem';
import { AccountInstance } from 'incognito-js/build/web/browser';
import copy from 'copy-to-clipboard';

interface IProps {}

const Styled = styled.div``;

const Backup = (props: IProps) => {
  const [state, setState] = React.useState({
    copied: false,
  });
  const { copied } = state;
  const translate: ILanguage = useSelector(translateSelector);
  const backup = translate.keychain.backup;
  const listAccount = useSelector(listAccountSelector);
  const backupData = listAccount
    .map(
      (account: AccountInstance) =>
        `${account.name}: ${account.key.keySet.privateKeySerialized}`
    )
    .join('\n');
  const handleCopyAll = () => {
    setState({ ...state, copied: true });
    copy(backupData);
  };
  return (
    <Styled>
      <Header title={backup.headerTitle} />
      {listAccount.map((account: AccountInstance) => (
        <AcccountItem
          title={account.name}
          desc={account.key.keySet.privateKeySerialized}
          key={account.name}
          limit={17}
        />
      ))}
      <Button
        title={copied ? backup.copied : backup.copyAll}
        onClick={handleCopyAll}
      />
    </Styled>
  );
};

export default withLayout(React.memo(Backup));
