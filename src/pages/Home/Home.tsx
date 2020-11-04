import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.div``;

const Home: FunctionComponent<IProps> = (props) => {
  return <Styled className='home'></Styled>;
};

export default Home;
