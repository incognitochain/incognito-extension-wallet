import React, { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionToggleToast, Header, TOAST_CONFIGS } from 'src/components';
import { IAddressBookLanguage, IGeneralLanguage } from 'src/i18n/interface';
import styled from 'styled-components';
import { translateByFieldSelector } from 'src/module/Configs';
import { themeSelector } from 'src/module/Setting';
import { ArrowDownIcon, ArrowUpIcon, TrashBinIcon } from 'src/components/Icons';
import { ITheme } from 'src/styles';
import { Link, useHistory, useLocation } from 'react-router-dom';
import withAddressBook, { IPropsAddrBook, IMergeProps } from './AddressBook.enhance';
import { IAddressBook } from './AddressBook.interface';
import { route as routeAction } from './features/Action/Action.route';
import { actionDelete, actionSelectedAddrBook } from './AddressBook.actions';

const Styled = styled.div`
    .item {
        margin-bottom: 30px;
        cursor: pointer;
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

const Item = React.memo((props: { item: IPropsAddrBook; onSelectedAddrBook?: any }) => {
    const { item, onSelectedAddrBook } = props;
    const { title, data } = item;
    const [toggle, setToggle] = React.useState(false);
    const location: any = useLocation();
    const { state = {} }: { state: any } = location;
    const { showRemoveAddressBook = false } = state || {};
    const { removed }: IGeneralLanguage = useSelector(translateByFieldSelector)('general');
    const history = useHistory();
    const dispatch = useDispatch();
    const handleToggle = () => setToggle(!toggle);
    const handleRemoveAddrBook = async (addressBook: IAddressBook) => {
        try {
            if (!addressBook) {
                return;
            }
            dispatch(actionDelete({ addressBook }));
            dispatch(
                actionToggleToast({
                    toggle: true,
                    value: removed,
                    type: TOAST_CONFIGS.success,
                }),
            );
        } catch (error) {
            dispatch(
                actionToggleToast({
                    toggle: true,
                    value: error,
                    type: TOAST_CONFIGS.error,
                }),
            );
        }
    };
    const onSelectedAddress = async (addressBook: IAddressBook) => {
        if (typeof onSelectedAddrBook === 'function') {
            return onSelectedAddrBook(addressBook);
        }
        if (!addressBook.isKeychain && addressBook?.canBeEdit) {
            await dispatch(actionSelectedAddrBook({ addressBook }));
            return history.push(routeAction, {});
        }
        return null;
    };
    const renderRemoveAddressBook = (addressBook: IAddressBook) => {
        if (!showRemoveAddressBook) {
            return null;
        }
        if (addressBook.canBeRemoved && !addressBook.isKeychain) {
            return (
                <div>
                    <TrashBinIcon onClick={() => handleRemoveAddrBook(addressBook)} />
                </div>
            );
        }
        return null;
    };
    return (
        <div className="item">
            <div className="sub flex" onClick={handleToggle}>
                <p className="title fs-medium fw-medium ellipsis">{title}</p>
                <div className="arrow-icon">{toggle ? <ArrowUpIcon /> : <ArrowDownIcon />}</div>
            </div>
            {toggle &&
                data.map((addressBook: IAddressBook) => (
                    <div key={addressBook.address} className="hook">
                        <p className="name fs-medium fw-medium ellipsis">{addressBook.name}</p>
                        <div className="flex">
                            <Link
                                to="#"
                                className="address fw-medium sub-text ellipsis"
                                onClick={(e: SyntheticEvent) => {
                                    e.preventDefault();
                                    onSelectedAddress(addressBook);
                                }}
                            >
                                {addressBook.address}
                            </Link>
                            {renderRemoveAddressBook(addressBook)}
                        </div>
                    </div>
                ))}
        </div>
    );
});

const AddressBook = React.memo((props: IMergeProps & any) => {
    const { addressBook, onGoBack, onSelectedAddrBook } = props;
    const translate: IAddressBookLanguage = useSelector(translateByFieldSelector)('addressBook');
    const theme: ITheme = useSelector(themeSelector);
    return (
        <Styled theme={theme}>
            <Header onGoBack={onGoBack} title={translate.headerTitle} canSearch />
            <div className="scroll-view">
                {addressBook.map((item: { data: IAddressBook[]; title: string }) => (
                    <Item key={item.title} item={item} onSelectedAddrBook={onSelectedAddrBook} />
                ))}
            </div>
        </Styled>
    );
});

export default withAddressBook(AddressBook);
