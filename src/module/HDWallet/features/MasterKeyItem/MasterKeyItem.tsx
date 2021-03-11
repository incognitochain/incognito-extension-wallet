import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';
import { ArrowDownIcon, ArrowUpIcon, TrashBinIcon } from 'src/components/Icons';
import { Link } from 'react-router-dom';
import { IGlobalStyle } from 'src/styles';
import { useSelector } from 'react-redux';
import { themeSelector } from 'src/module/Configs';

const Styled = styled.div`
    margin-bottom: 30px;
    .hook {
        margin-top: 30px;
        padding-left: 15px;
        :hover {
            color: ${(props: IGlobalStyle) => props.theme.text};
        }
    }
    .hook .name {
        margin-bottom: 15px;
    }
    .hook .address {
        margin-right: 15px;
    }
    .sub {
        justify-content: space-between;
    }
`;

interface IItem {
    name: string;
    address: string;
    canBeRemoved?: boolean;
    isSelected?: boolean;
    [x: string]: any;
}

interface IProps {
    data: { masterKeyName: string; listAccount: IItem[] };
    onSelectedItem: (item: IItem | any) => any;
    onRemoveItem?: (item: IItem | any) => any;
    showRemoveItem?: boolean;
}

const MasterKeyItem = React.memo((props: IProps) => {
    const { data, onSelectedItem, showRemoveItem, onRemoveItem } = props;
    const { masterKeyName, listAccount } = data;
    const theme = useSelector(themeSelector);
    const [toggle, setToggle] = React.useState(true);
    const handleToggle = () => setToggle(!toggle);
    const onSelectedAddress = async (item: IItem) => {
        if (typeof onSelectedItem === 'function') {
            return onSelectedItem(item);
        }
    };
    const renderRemoveAddressBook = (item: IItem) => {
        if (!showRemoveItem) {
            return null;
        }
        if (item?.canBeRemoved) {
            return (
                <div>
                    <TrashBinIcon
                        onClick={() => {
                            if (typeof onRemoveItem === 'function') {
                                onRemoveItem(item);
                            }
                        }}
                    />
                </div>
            );
        }
        return null;
    };
    return (
        <Styled className="item" theme={theme}>
            <div className="sub flex" onClick={handleToggle}>
                <p className="title fs-medium fw-medium ellipsis">{masterKeyName}</p>
                <div className="arrow-icon">{toggle ? <ArrowUpIcon /> : <ArrowDownIcon />}</div>
            </div>
            {toggle &&
                listAccount.map((item: IItem) => (
                    <div key={item.address} className={`hook ${item?.isSelected ? 'main-text' : 'sub-text'}`}>
                        <p className="name fs-medium fw-medium ellipsis">{item.name}</p>
                        <div className="flex">
                            <Link
                                to="#"
                                className="address fw-medium ellipsis"
                                onClick={(e: SyntheticEvent) => {
                                    e.preventDefault();
                                    onSelectedAddress(item);
                                }}
                            >
                                {item.address}
                            </Link>
                            {renderRemoveAddressBook(item)}
                        </div>
                    </div>
                ))}
        </Styled>
    );
});

export default React.memo(MasterKeyItem);
