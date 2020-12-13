import isEqual from 'lodash/isEqual';
import toLower from 'lodash/toLower';
import includes from 'lodash/includes';
import { IAddressBook } from './AddressBook.interface';

export const isAddressBookExist = (
  oldReceivers: IAddressBook[],
  addressBook: IAddressBook
) =>
  oldReceivers.some(
    (item) =>
      isEqual(item.address, addressBook.address) ||
      isEqual(toLower(item.name), toLower(addressBook.name))
  );

export const ADDRESS_BOOK_TYPE: {
  [x: number]: string;
} = {
  1: 'incognitoAddress',
  2: 'externalAddress',
};

export const filterAddressByKey = (
  addressBook: IAddressBook[],
  keySearch: string
) =>
  addressBook?.filter(
    (item) =>
      includes(item?.name.toLowerCase(), keySearch) ||
      includes(item?.address.toLowerCase(), keySearch)
  );
