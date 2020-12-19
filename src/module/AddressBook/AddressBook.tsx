import React, { SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
import { Header } from 'src/components';
import { IAddressBookLanguage } from 'src/i18n/interface';
import styled from 'styled-components';
import { translateByFieldSelector } from 'src/module/Configs';
import { Link } from 'react-router-dom';
import { ArrowDownIcon, ArrowUpIcon } from 'src/components/Icons';
import withAddressBook, { IPropsAddrBook, IMergeProps } from './AddressBook.enhance';

import { IAddressBook } from './AddressBook.interface';

const Styled = styled.div`
    .item {
        margin-bottom: 30px;
    }
    .item .hook {
        margin-top: 30px;
        padding-left: 15px;
    }
    .item .hook .name {
        margin-bottom: 15px;
    }
    .item .hook .address {
    }
    .item .sub {
        justify-content: space-between;
    }
`;

const Item = (props: { item: IPropsAddrBook; onSelectedAddrBook?: any }) => {
    const { item, onSelectedAddrBook } = props;
    const { title, data } = item;
    const [toggle, setToggle] = React.useState(false);
    const handleToggle = () => setToggle(!toggle);
    const onSelectedAddress = async (e: SyntheticEvent, addressBook: IAddressBook) => {
        e.preventDefault();
        if (typeof onSelectedAddrBook === 'function') {
            return onSelectedAddrBook(addressBook);
        }
        return null;
    };
    return (
        <div className="item">
            <div className="sub flex">
                <p className="title fs-medium fw-bold">{title}</p>
                {toggle ? <ArrowUpIcon onClick={handleToggle} /> : <ArrowDownIcon onClick={handleToggle} />}
            </div>
            {toggle &&
                data.map((addressBook: IAddressBook) => (
                    <button
                        type="button"
                        key={addressBook.address}
                        onClick={(e: SyntheticEvent) => onSelectedAddress(e, addressBook)}
                        className="hook"
                    >
                        <p className="name fs-medium fw-bold main-text ellipsis">{addressBook.name}</p>
                        <p className="address fw-medium sub-text ellipsis">{addressBook.address}</p>
                    </button>
                ))}
        </div>
    );
};

const AddressBook = (props: IMergeProps & any) => {
    const { addressBook, onGoBack, onSelectedAddrBook } = props;
    const translate: IAddressBookLanguage = useSelector(translateByFieldSelector)('addressBook');
    return (
        <Styled>
            <Header onGoBack={onGoBack} title={translate.headerTitle} />
            {addressBook.map((item: { data: IAddressBook[]; title: string }) => (
                <Item key={item.title} item={item} onSelectedAddrBook={onSelectedAddrBook} />
            ))}
            <Link to="/create-address-book">Create</Link>
        </Styled>
    );
};

export default withAddressBook(AddressBook);
