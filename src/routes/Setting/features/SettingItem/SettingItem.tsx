import React, { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { ToggleSwitch } from 'src/components';
import { Styled } from './SettingItem.styled';

export interface ISettingChildItem {
  desc: string;
  toggle?: boolean;
  onClick?: () => void;
  link?: string;
  toggleValue?: boolean;
}

export interface ISettingItem {
  title: string;
  child: ISettingChildItem[];
}

const ToggleItem = React.memo((props: ISettingChildItem) => {
  const { desc, onClick, toggleValue } = props;
  return (
    <div className='toggle-item'>
      <span className='item'>{desc}</span>
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
  console.debug(`link`, link);
  return (
    <Link className='item' to={!!link ? link : '#'} onClick={handleClickItem}>
      {desc}
    </Link>
  );
});

export const SettingItem = React.memo((props: ISettingItem) => {
  const { title, child } = props;
  return (
    <Styled>
      <label className='title'>{title}</label>
      {child.map((item: ISettingChildItem) =>
        !!item.toggle ? (
          <ToggleItem key={item.desc} {...item} />
        ) : (
          <Item {...item} />
        )
      )}
    </Styled>
  );
});
