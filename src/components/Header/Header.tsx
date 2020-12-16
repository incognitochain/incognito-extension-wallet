import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';
import { FONT_SIZES } from 'src/styles';
import { BtnSelectAccount } from 'src/module/Account/features/SelectAccount';
import withHeader, { IMergeProps } from './Header.enhance';
import { ArrowLeftIcon } from '../Icons';

const Styled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  .left {
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
  }
  .left p.header-title {
    line-height: ${FONT_SIZES.medium + 3}px;
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
        <ArrowLeftIcon
          to='#'
          onClick={(e: SyntheticEvent) => {
            e.preventDefault();
            handleClick();
          }}
        />
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
