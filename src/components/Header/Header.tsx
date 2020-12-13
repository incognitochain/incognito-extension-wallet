import React from 'react';
import styled from 'styled-components';
import { FaAngleLeft } from 'react-icons/fa';
import { FONT_SIZES } from 'src/styles';
import { BtnSelectAccount } from 'src/module/Account/features/SelectAccount';
import withHeader, { IMergeProps } from './Header.enhance';

const Styled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 42px;
  .left {
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
  }
  .left h1.title {
    font-weight: 200;
    font-size: ${FONT_SIZES.medium}px;
    line-height: ${FONT_SIZES.medium + 4}px;
    &.ellipsis {
      max-width: 100%;
    }
  }
`;

const Header = (props: IMergeProps) => {
  const { rightHeader, selectAccount, handleClick, renderHeaderTitle } = props;
  return (
    <Styled className='header'>
      <div className='left'>
        <FaAngleLeft size={20} onClick={handleClick} />
        {renderHeaderTitle()}
      </div>
      <div className='right'>
        {rightHeader}
        {selectAccount && <BtnSelectAccount />}
      </div>
    </Styled>
  );
};

export default withHeader(Header);
