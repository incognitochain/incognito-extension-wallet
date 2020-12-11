import React, { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from 'src/components';
import { IProps, translateSelector } from 'src/module/Configs';
import { ILanguage } from 'src/i18n';
import {
  actionFetchSelectAccount,
  defaultAccountSelector,
  listAccountSelector,
} from 'src/module/Account';
import { FaKey } from 'react-icons/fa';
import { AccountInstance } from 'incognito-js/build/web/browser';
import { Link, useHistory } from 'react-router-dom';
import { IAccountItem, IHook } from './Keychain.interface';
import { Styled } from './Keychain.styled';
import { withLayout } from 'src/components/Layout';
import { route } from 'src/module/Account/features/AccountDetail';

const Hook = (props: IHook) => {
  const { title, desc, path } = props;
  return (
    <Link className='hook-container' to={path}>
      <p className='title'>{title}</p>
      <p className='desc'>{desc}</p>
    </Link>
  );
};

const AccountItem = React.memo((props: IAccountItem) => {
  const { account } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const defaultAccount = useSelector(defaultAccountSelector);
  const isSelected = defaultAccount.name === account.name;
  const handleNavDetail = (e: SyntheticEvent) => {
    e.preventDefault();
    history.push(route, {
      account,
    });
  };
  const handleSelectAccount = () =>
    dispatch(actionFetchSelectAccount(account.name));
  return (
    <div
      onClick={handleSelectAccount}
      className={`account-item ${isSelected ? 'selected' : ''}`}
    >
      <p className='account-name ellipsis'>{account.name}</p>
      <Link to={route} className='account-details' onClick={handleNavDetail}>
        <FaKey size={16} />
      </Link>
    </div>
  );
});

const YourKeychains = React.memo(() => {
  const translate: ILanguage = useSelector(translateSelector);
  const listAccount = useSelector(listAccountSelector);
  return (
    <div className='hook-container'>
      <p className='title'>{translate.keychain.yourKeychain}</p>
      {listAccount.map((account: AccountInstance) => (
        <AccountItem key={account.name} account={account} />
      ))}
    </div>
  );
});

const Keychain = (props: IProps) => {
  const translate: ILanguage = useSelector(translateSelector);
  const hookFactories = React.useMemo(
    () => [
      {
        ...translate.keychain.create,
        path: '/create-account',
      },
      {
        ...translate.keychain.import,
        path: '/import-account',
      },

      {
        ...translate.keychain.backup,
        path: '/backup-account',
      },
    ],
    []
  );
  return (
    <Styled>
      <Header title={translate.keychain.headerTitle} />
      <YourKeychains />
      {hookFactories.map((item) => (
        <Hook {...item} key={item.title} />
      ))}
    </Styled>
  );
};

export default withLayout(Keychain);
