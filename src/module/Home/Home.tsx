import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Styled } from './Home.styled';
import withHome from './Home.enhance';
import { homeSelector } from './Home.selector';
import { IProps } from './Home.interface';
import Category, { ICategory } from './features/Category';

const Home: FunctionComponent<IProps> = () => {
  const homeData = useSelector(homeSelector);
  return (
    <Styled className='home-container'>
      <p className='title'>{homeData.headerTitle}</p>
      {homeData.categories.map((category: ICategory) => (
        <Category {...category} key={category.id} />
      ))}
    </Styled>
  );
};

export default withHome(React.memo(Home));
