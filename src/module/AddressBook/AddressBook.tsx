import React, { SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
import { Header } from 'src/components';
import { IAddressBookLanguage } from 'src/i18n/interface';
import styled from 'styled-components';
import { translateByFieldSelector } from 'src/module/Configs';
import withAddressBook, { IPropsAddrBook } from './AddressBook.enhance';
import { IMergeProps } from './AddressBook.enhance';
import { IAddressBook } from './AddressBook.interface';
import { Link, useLocation } from 'react-router-dom';

const Styled = styled.div`
  .item {
    margin-bottom: 30px;
  }
  .item .hook {
    margin-top: 30px;
  }
  .item .hook .name {
    margin-bottom: 10px;
  }
  .item .hook .address {
  }
`;

const Item = (props: { item: IPropsAddrBook }) => {
  const { item } = props;
  const { title, data } = item;
  const { state }: { state: any } = useLocation();
  const onSelectedAddrBook = state?.onSelectedAddrBook || null;
  const onSelectedAddress = async (
    e: SyntheticEvent,
    addressBook: IAddressBook
  ) => {
    e.preventDefault();
    if (typeof onSelectedAddrBook === 'function') {
      return onSelectedAddrBook(addressBook);
    }
  };
  return (
    <div className='item'>
      <p className='title fw-bold fs-medium'>{title}</p>
      {data.map((addressBook: IAddressBook) => (
        <Link
          key={addressBook.address}
          to='#'
          onClick={(e: SyntheticEvent) => onSelectedAddress(e, addressBook)}
          className='hook'
        >
          <p className='name fw-medium fs-regular ellipsis'>
            {addressBook.name}
          </p>
          <p className='address fw-medium fs-regular ellipsis'>
            {addressBook.address}
          </p>
        </Link>
      ))}
    </div>
  );
};

const AddressBook = (props: IMergeProps) => {
  const { addressBook } = props;
  const translate: IAddressBookLanguage = useSelector(translateByFieldSelector)(
    'addressBook'
  );
  return (
    <Styled>
      <Header title={translate.headerTitle} />
      {addressBook.map((item) => (
        <Item key={item.title} item={item} />
      ))}
      <Link to='/create-address-book'>Create</Link>
    </Styled>
  );
};

export default withAddressBook(AddressBook);
