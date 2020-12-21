import React from 'react';
import { useSelector } from 'react-redux';
import { Header } from 'src/components';
import { IAddressBookLanguage } from 'src/i18n/interface';
import styled from 'styled-components';
import { translateByFieldSelector } from 'src/module/Configs';
import { ArrowDownIcon, ArrowUpIcon } from 'src/components/Icons';
import withAddressBook, { IPropsAddrBook, IMergeProps } from './AddressBook.enhance';
import { IAddressBook } from './AddressBook.interface';

const Styled = styled.div`
    .item {
        margin-bottom: 30px;
        cursor: pointer;
    }
    .item .hook {
        margin-top: 30px;
        padding-left: 15px;
        cursor: pointer;
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
    const onSelectedAddress = async (addressBook: IAddressBook) => {
        if (typeof onSelectedAddrBook === 'function') {
            return onSelectedAddrBook(addressBook);
        }
        return null;
    };
    return (
        <div className="item" onClick={handleToggle}>
            <div className="sub flex">
                <p className="title fs-medium fw-bold">{title}</p>
                {toggle ? <ArrowUpIcon /> : <ArrowDownIcon />}
            </div>
            {toggle &&
                data.map((addressBook: IAddressBook) => (
                    <div key={addressBook.address} onClick={() => onSelectedAddress(addressBook)} className="hook">
                        <p className="name fs-medium fw-bold main-text ellipsis">{addressBook.name}</p>
                        <p className="address fw-medium sub-text ellipsis">{addressBook.address}</p>
                    </div>
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
        </Styled>
    );
};

export default withAddressBook(AddressBook);
