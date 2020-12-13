import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'recompose';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { withLayout } from 'src/components/Layout';
import { selectedPrivacySelector } from 'src/module/Token';
import { useLocation } from 'react-router-dom';
import { translateByFieldSelector } from 'src/module/Configs';
import { IAddressBookLanguage } from 'src/i18n/interface';
import {
  externalAddrSelector,
  incognitoAddrSelector,
  keychainAddrSelector,
} from './AddressBook.selector';
import { IAddressBook } from './AddressBook.interface';
import { useSearchBox } from 'src/components/Header';
import { keySearchSelector } from 'src/components/Header/Header.selector';
import { filterAddressByKey } from './AddressBook.utils';
import { actionRemoveSelectedReceiver } from './AddressBook.actions';

export interface TInner {
  addressBook: IPropsAddrBook[];
}

export interface IPropsAddrBook {
  data: IAddressBook[];
  title: string;
}

export interface IProps {}

export interface IMergeProps extends TInner, IProps {}

const enhance = (WrappedComponent: React.FunctionComponent) => (
  props: IProps & any
) => {
  const dispatch = useDispatch();
  const { state }: { state: any } = useLocation();
  const translate: IAddressBookLanguage = useSelector(translateByFieldSelector)(
    'addressBook'
  );
  const keySearch = useSelector(keySearchSelector);
  const selectedPrivacy = useSelector(selectedPrivacySelector);
  const incognitoAddr: IAddressBook[] = useSelector(incognitoAddrSelector);
  const externalAddr: IAddressBook[] = useSelector(externalAddrSelector);
  let keychainAddr: IAddressBook[] = useSelector(keychainAddrSelector);
  const filterBySelectedPrivacy: boolean = !!state?.filterBySelectedPrivacy;
  const extAddrFilBySelPrivacy = [
    ...externalAddr.filter((item) =>
      filterBySelectedPrivacy
        ? item?.rootNetworkName === selectedPrivacy?.rootNetworkName
        : true
    ),
  ];
  let { result: keychainAddrFil } = useSearchBox({
    data: keychainAddr,
    handleFilter: () => filterAddressByKey(keychainAddr, keySearch),
  });
  let { result: incognitoAddrFil } = useSearchBox({
    data: incognitoAddr,
    handleFilter: () => filterAddressByKey(incognitoAddr, keySearch),
  });
  let { result: externalAddrFil } = useSearchBox({
    data: extAddrFilBySelPrivacy,
    handleFilter: () => filterAddressByKey(extAddrFilBySelPrivacy, keySearch),
  });
  const addressBook = [
    {
      data: keychainAddrFil,
      title: translate.keychains,
    },
    {
      data: incognitoAddrFil,
      title: translate.incognito,
    },
    {
      data: externalAddrFil,
      title: translate.external,
    },
  ];

  React.useEffect(() => {
    dispatch(actionRemoveSelectedReceiver());
  }, []);

  return (
    <ErrorBoundary>
      <WrappedComponent {...{ ...props, addressBook }} />
    </ErrorBoundary>
  );
};

export default compose<IMergeProps, any>(withLayout, enhance);
