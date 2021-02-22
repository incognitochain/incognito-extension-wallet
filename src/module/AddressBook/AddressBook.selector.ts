import { IAddressBook } from 'src/module/AddressBook';
import { AccountInstance } from 'incognito-js/build/web/browser';
import { createSelector } from 'reselect';
import { IRootState } from 'src/redux/interface';
import { isMainnetSelector } from 'src/module/Preload/Preload.selector';
import { defaultAccountSelector, listAccountSelector } from 'src/module/Account/Account.selector';

export const addressBookSelector = createSelector(
    (state: IRootState) => state.addressBook,
    isMainnetSelector,
    (addressBook, mainnet) => ({
        ...addressBook,
        incognitoAddress: addressBook.incognitoAddress.filter((item: IAddressBook) => item.mainnet === mainnet) || [],
        externalAddress: addressBook.externalAddress.filter((item: IAddressBook) => item.mainnet === mainnet) || [],
    }),
);

export const incognitoAddrSelector = createSelector(addressBookSelector, (addressBook) => addressBook.incognitoAddress);

export const externalAddrSelector = createSelector(addressBookSelector, (addressBook) => addressBook.externalAddress);

export const keychainAddrSelector = createSelector(
    listAccountSelector,
    defaultAccountSelector,
    isMainnetSelector,
    (accounts, defaultAccount, mainnet) => (filterByDefaultAccount = true) =>
        (accounts &&
            defaultAccount &&
            accounts
                .filter((account: AccountInstance) =>
                    filterByDefaultAccount
                        ? account.key.keySet.paymentAddressKeySerialized !==
                          defaultAccount.key.keySet.paymentAddressKeySerialized
                        : true,
                )
                .map((account: AccountInstance) => ({
                    name: account.name,
                    address: account.key.keySet.paymentAddressKeySerialized,
                    type: 1,
                    mainnet,
                    isKeychain: true,
                }))) ||
        [],
);

export const selectedAddressBookSelector = createSelector(
    addressBookSelector,
    (addressBookState) => addressBookState.selected,
);

export const isIncognitoAddressExistSelector = createSelector(
    incognitoAddrSelector,
    keychainAddrSelector,
    (incognitoAddr: IAddressBook[], keychainAddr: (filterByDefaultAccount: boolean) => IAddressBook[]) => (
        address: string,
    ) =>
        incognitoAddr.find((item) => item.address === address) ||
        keychainAddr(false).find((item) => item.address === address),
);

export const isExternalAddressExistSelector = createSelector(
    externalAddrSelector,
    (externalAddr: IAddressBook[]) => (address: string) => externalAddr.find((item) => item.address === address),
);
