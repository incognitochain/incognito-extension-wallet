import React from 'react';
import { ICategory, ICategoryItem } from './Category.interface';
import withCategory from './Category.enhance';

interface IProps {
  interactionById: (item: ICategoryItem) => void;
}

interface IItemProps {
  item: ICategoryItem;
  onClickItem: (item: ICategoryItem) => void;
}

const CategoryItem = React.memo((props: IItemProps) => {
  const { onClickItem, item } = props;
  const { title, icoUrl, desc } = item;
  const handleOnClick = () => onClickItem(item);
  return (
    <div className='category-item' onClick={handleOnClick}>
      <div className='left'>
        <div className='icon'>
          <img src={icoUrl} alt='' />
        </div>
      </div>
      <div className='right'>
        <p className='title'>{title}</p>
        <p className='desc'>{desc}</p>
      </div>
    </div>
  );
});

const Category = React.memo((props: ICategory & IProps) => {
  const { title, buttons, interactionById } = props;
  return (
    <div className='category'>
      <p className='title'>{title}</p>
      {buttons.map((item: ICategoryItem) => (
        <CategoryItem
          {...{
            item,
            onClickItem: interactionById,
          }}
          key={String(item.id)}
        />
      ))}
    </div>
  );
});

export default withCategory(Category);
