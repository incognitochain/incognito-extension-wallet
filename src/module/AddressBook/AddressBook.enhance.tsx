import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { translateByFieldSelector } from 'src/module/Configs/Configs.selector';
import { selectedPrivacySelector } from 'src/module/Token/Token.selector';
import { IAddressBookLanguage } from 'src/i18n/interface';
import { useSearchBox, keySearchSelector } from 'src/components/Header';
import { listMasterKeyWithKeychainsSelector } from 'src/module/HDWallet/HDWallet.selector';
import { IMasterKeyWithKeychains } from 'src/module/HDWallet/HDWallet.interface';
import { externalAddrSelector, incognitoAddrSelector } from './AddressBook.selector';
import { IAddressBook } from './AddressBook.interface';
import { filterAddressByKey } from './AddressBook.utils';
import { actionRemoveSelectedAddrBook } from './AddressBook.actions';

export interface TInner {
    addressBook: IPropsAddrBook[];
}

export interface IPropsAddrBook {
    data: IAddressBook[];
    title: string;
}

export interface IProps {
    onGoBack?: () => any;
    onSelectedAddrBook?: any;
    filterBySelectedPrivacy?: boolean;
}

export interface IMergeProps extends TInner, IProps {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    const dispatch = useDispatch();
    const { filterBySelectedPrivacy } = props;
    const translate: IAddressBookLanguage = useSelector(translateByFieldSelector)('addressBook');
    const keySearch = useSelector(keySearchSelector);
    const selectedPrivacy = useSelector(selectedPrivacySelector);
    const incognitoAddr: IAddressBook[] = useSelector(incognitoAddrSelector);
    const externalAddr: IAddressBook[] = useSelector(externalAddrSelector);
    const extAddrFilBySelPrivacy = [
        ...externalAddr.filter((item) =>
            filterBySelectedPrivacy ? item?.rootNetworkName === selectedPrivacy?.rootNetworkName : true,
        ),
    ];
    const listMasterKeyWithKeychains = useSelector(listMasterKeyWithKeychainsSelector);
    const { result: incognitoAddrFil } = useSearchBox({
        data: incognitoAddr,
        handleFilter: () => filterAddressByKey(incognitoAddr, keySearch),
    });
    const { result: externalAddrFil } = useSearchBox({
        data: extAddrFilBySelPrivacy,
        handleFilter: () => filterAddressByKey(extAddrFilBySelPrivacy, keySearch),
    });
    let addressBook: any[] = [];
    listMasterKeyWithKeychains.map((masterKey: IMasterKeyWithKeychains) => {
        const { listAccount, wallet } = masterKey;
        const data = listAccount.map((account) => ({
            name: account.name,
            address: account.key.keySet.paymentAddressKeySerialized,
        }));
        const { result: keychainAddrFil } = useSearchBox({
            data,
            handleFilter: () => filterAddressByKey(data, keySearch),
        });
        if (keychainAddrFil.length !== 0) {
            const payload = {
                data: [...keychainAddrFil],
                title: wallet.name,
            };
            addressBook.push(payload);
        }
        addressBook.push();
        return masterKey;
    });
    if (incognitoAddrFil.length !== 0) {
        addressBook.push({
            data: incognitoAddrFil,
            title: translate.incognito,
        });
    }
    if (externalAddrFil.length !== 0) {
        addressBook.push({
            data: externalAddrFil,
            title: translate.external,
        });
    }
    React.useEffect(() => {
        dispatch(actionRemoveSelectedAddrBook());
    }, []);
    return (
        <ErrorBoundary>
            <WrappedComponent {...{ ...props, addressBook }} />
        </ErrorBoundary>
    );
};

export default enhance;
