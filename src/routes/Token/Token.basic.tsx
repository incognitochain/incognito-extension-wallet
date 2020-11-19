import React from 'react';
import styled from 'styled-components';
import { Name, Balance } from './Token';

interface IProps {
  tokenId: string;
  showBalance?: boolean;
}

const Styled = styled.div`
  .extra {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const TokenBasic = (props: IProps) => {
  const { tokenId, showBalance = true } = props;
  return (
    <Styled>
      <div className='extra'>
        <Name tokenId={tokenId} />
        {showBalance && <Balance tokenId={tokenId} />}
        {/* 
        {shouldShowFollowed && <Follow {...props} />} */}
      </div>
      <div>{/* <Symbol {...props} /> */}</div>
    </Styled>
  );
};

export default React.memo(TokenBasic);
