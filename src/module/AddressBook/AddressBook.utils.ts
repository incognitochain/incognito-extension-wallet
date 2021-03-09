import isEqual from 'lodash/isEqual';
import toLower from 'lodash/toLower';
import includes from 'lodash/includes';
import { IAddressBook } from './AddressBook.interface';

export const isAddressBookExistByName = (list: IAddressBook[], name: string) =>
    list.some((item) => isEqual(toLower(item.name), toLower(name)));

export const isAddressBookExist = (list: IAddressBook[], addressBook: { name: string; address: string }) =>
    list.some(
        (item) => isEqual(item.address, addressBook.address) || isEqual(toLower(item.name), toLower(addressBook.name)),
    );

export const filterAddressByKey = (addressBook: { name: string; address: string }[], keySearch: string) =>
    addressBook?.filter(
        (item) =>
            includes(toLower(item?.name), toLower(keySearch)) || includes(toLower(item?.address), toLower(keySearch)),
    );
