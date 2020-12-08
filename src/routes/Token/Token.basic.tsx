import React, { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Name, Balance, Amount, Price } from './Token';

interface IProps {
  tokenId: string;
  showBalance?: boolean;
  handleSelectToken?: () => void;
}

const Styled = styled(Link)`
  margin: 15px 0;
  .extra {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .extra .extra-item {
    flex: 1 0 auto;
    width: 100%;
    max-width: 45%;
  }
  .extra .extra-item {
    :last-child {
      .text {
        text-align: right;
      }
    }
  }
`;

const TokenBasic = (props: IProps) => {
  const { tokenId, handleSelectToken } = props;
  const handleOnClick = (e: SyntheticEvent) => {
    e.preventDefault();
    if (typeof handleSelectToken === 'function') {
      handleSelectToken();
    }
  };
  return (
    <Styled to='#' onClick={handleOnClick}>
      <div className='extra'>
        <Name classNameCustom={'extra-item'} tokenId={tokenId} />
        <Amount classNameCustom={'extra-item'} tokenId={tokenId} />
      </div>
      <div className='extra extra-bottom'>
        <Price tokenId={tokenId} classNameCustom={'extra-item'} />
        <Balance tokenId={tokenId} classNameCustom={'extra-item'} />
      </div>
    </Styled>
  );
};

export default React.memo(TokenBasic);
