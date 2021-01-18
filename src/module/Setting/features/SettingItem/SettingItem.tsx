import React, { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { ToggleSwitch } from 'src/components';
import { Styled } from './SettingItem.styled';

export interface ISettingChildItem {
    desc?: string;
    toggle?: boolean;
    onClick?: () => void;
    link?: string;
    toggleValue?: boolean;
}

export interface ISettingItem {
    title: string;
    child?: ISettingChildItem[];
    button?: boolean;
    onClick?: () => void;
}

const ToggleItem = React.memo((props: ISettingChildItem) => {
    const { desc, onClick, toggleValue } = props;
    return (
        <div className="toggle-item">
            {!!desc && <span className="item sub-text" dangerouslySetInnerHTML={{ __html: desc }} />}
            <ToggleSwitch toggleValue={toggleValue} onToggle={onClick} />
        </div>
    );
});

const Item = React.memo((props: ISettingChildItem) => {
    const { desc, link, onClick } = props;
    const handleClickItem = (e: SyntheticEvent) => {
        if (typeof onClick === 'function') {
            e.preventDefault();
            onClick();
        }
    };
    return (
        <Link className="item sub-text" to={link || '#'} onClick={handleClickItem}>
            {desc}
        </Link>
    );
});

export const SettingItem = React.memo((props: ISettingItem) => {
    const { title, child, button, onClick } = props;
    const renderChild = () => {
        if (!child) return null;
        return child.map((item: ISettingChildItem) =>
            item.toggle ? <ToggleItem key={item.desc} {...item} /> : <Item key={item.desc} {...item} />,
        );
    };
    if (button) {
        return (
            <Styled onClick={onClick}>
                <p className="title fs-medium fw-medium pointer">{title}</p>
            </Styled>
        );
    }
    return (
        <Styled>
            <p className="title fs-medium fw-medium">{title}</p>
            {renderChild()}
        </Styled>
    );
});
