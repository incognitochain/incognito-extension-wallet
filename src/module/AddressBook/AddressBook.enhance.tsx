import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErrorBoundary from 'src/components/ErrorBoundary';
// import { useLocation } from 'react-router-dom';
import { translateByFieldSelector } from 'src/module/Configs';
// import { selectedPrivacySelector } from 'src/module/Token';
import { IAddressBookLanguage } from 'src/i18n/interface';
import { useSearchBox, keySearchSelector } from 'src/components/Header';
import {
    //  externalAddrSelector, incognitoAddrSelector,

    keychainAddrSelector,
} from './AddressBook.selector';
import { IAddressBook } from './AddressBook.interface';
import { filterAddressByKey } from './AddressBook.utils';
import { actionRemoveSelectedReceiver } from './AddressBook.actions';

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
}

export interface IMergeProps extends TInner, IProps {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    const dispatch = useDispatch();
    // const { state }: { state: any } = useLocation();
    const translate: IAddressBookLanguage = useSelector(translateByFieldSelector)('addressBook');
    const keySearch = useSelector(keySearchSelector);
    // const selectedPrivacy = useSelector(selectedPrivacySelector);
    // const incognitoAddr: IAddressBook[] = useSelector(incognitoAddrSelector);
    // const externalAddr: IAddressBook[] = useSelector(externalAddrSelector);
    const keychainAddr: IAddressBook[] = useSelector(keychainAddrSelector);
    // const filterBySelectedPrivacy = !!state?.filterBySelectedPrivacy;
    // const extAddrFilBySelPrivacy = [
    //     ...externalAddr.filter((item) =>
    //         filterBySelectedPrivacy ? item?.rootNetworkName === selectedPrivacy?.rootNetworkName : true,
    //     ),
    // ];
    const { result: keychainAddrFil } = useSearchBox({
        data: keychainAddr,
        handleFilter: () => filterAddressByKey(keychainAddr, keySearch),
    });
    // const { result: incognitoAddrFil } = useSearchBox({
    //     data: incognitoAddr,
    //     handleFilter: () => filterAddressByKey(incognitoAddr, keySearch),
    // });
    // const { result: externalAddrFil } = useSearchBox({
    //     data: extAddrFilBySelPrivacy,
    //     handleFilter: () => filterAddressByKey(extAddrFilBySelPrivacy, keySearch),
    // });
    const addressBook = [
        {
            data: keychainAddrFil,
            title: translate.keychains,
        },
        // {
        //     data: incognitoAddrFil,
        //     title: translate.incognito,
        // },
        // {
        //     data: externalAddrFil,
        //     title: translate.external,
        // },
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

export default enhance;
