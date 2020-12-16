import { AccountInstance } from 'incognito-js/build/web/browser';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, Header } from 'src/components';
import { isDev } from 'src/configs';
import { IAccountLanguage } from 'src/i18n';
import { translateByFieldSelector } from 'src/module/Configs';
import Item from 'src/module/Account/features/AccountItem';
import styled from 'styled-components';
import { actionFetchRemoveAccount } from 'src/module/Account';
import { withLayout } from 'src/components/Layout';

const Styled = styled.div``;

const AccountDetails = () => {
  const location: any = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const translate: IAccountLanguage = useSelector(translateByFieldSelector)(
    'account'
  );
  const translateAccountDetail = translate.accountDetail;
  const { account }: { account: AccountInstance } = location.state;
  const {
    paymentAddressKeySerialized,
    privateKeySerialized,
    publicKeyCheckEncode,
    validatorKey,
    publicKeySerialized,
  } = account.key.keySet;

  const renderItem = React.useCallback(() => {
    const factories = [
      <Item
        {...{
          title: translateAccountDetail.title1,
          desc: paymentAddressKeySerialized,
        }}
        key={translateAccountDetail.title1}
      />,
      <Item
        {...{
          title: translateAccountDetail.title2,
          desc: privateKeySerialized,
        }}
        key={translateAccountDetail.title2}
      />,
      <Item
        {...{
          title: translateAccountDetail.title3,
          desc: publicKeyCheckEncode,
        }}
        key={translateAccountDetail.title3}
      />,
      <Item
        {...{ title: translateAccountDetail.title4, desc: '' }}
        key={translateAccountDetail.title4}
      />,
      <Item
        {...{ title: translateAccountDetail.title5, desc: validatorKey }}
        key={translateAccountDetail.title5}
      />,
    ];
    const devFactories = [
      ...factories,
      <Item
        {...{ title: translateAccountDetail.title6, desc: validatorKey }}
        key={translateAccountDetail.title6}
      />,
      <Item
        {...{ title: translateAccountDetail.title7, desc: '' }}
        key={translateAccountDetail.title7}
      />,
      <Item
        {...{ title: translateAccountDetail.title8, desc: publicKeySerialized }}
        key={translateAccountDetail.title8}
      />,
    ];
    return isDev ? devFactories : factories;
  }, []);

  const handleRemoveKeychain = () => {
    try {
      dispatch(actionFetchRemoveAccount(account.name));
      history.goBack();
    } catch (error) {
      console.debug(error);
    }
  };
  return (
    <Styled>
      <Header title={`${account.name}'s ${translateAccountDetail.keychain}`} />
      {renderItem()}
      <Button
        onClick={handleRemoveKeychain}
        title={translateAccountDetail.delete}
      ></Button>
    </Styled>
  );
};

export default withLayout(AccountDetails);
