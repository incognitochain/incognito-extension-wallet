import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from 'src/components';
import { withLayout } from 'src/components/Layout';
import { ILanguage } from 'src/i18n';
import { translateSelector } from 'src/module/Configs';
import styled from 'styled-components';
import { listAccountSelector } from 'src/module/Account';
import { AccountInstance } from 'incognito-js/build/web/browser';
import AcccountItem from 'src/module/Account/features/AcccountItem';
import { actionSwitchAccount } from 'src/module/Account';
import { useHistory } from 'react-router-dom';

interface IProps {}

const Styled = styled.div``;

const SelectAccount = (props: IProps) => {
  const translate: ILanguage = useSelector(translateSelector);
  const listAccount = useSelector(listAccountSelector);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleSelectAccount = async (accountName: string) => {
    try {
      dispatch(actionSwitchAccount(accountName, true));
    } catch (error) {
      console.debug(error);
    }
    history.goBack();
  };

  return (
    <Styled>
      <Header title={translate.wallet.selectAccount.headerTitle} />
      {listAccount.map((account: AccountInstance) => (
        <AcccountItem
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
};

export default withLayout(SelectAccount);
