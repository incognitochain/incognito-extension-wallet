import React from 'react';
import styled from 'styled-components';
import { FaCog } from 'react-icons/fa';

interface IProps {}

const Styled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Header = (props: IProps) => {
  return (
    <Styled className='header'>
      <div className='left'>
        <p className='title'>Incognito Wallet</p>
      </div>
      <div className='right'>
        <FaCog />
      </div>
    </Styled>
  );
};

export default Header;
