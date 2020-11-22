import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Header } from 'src/components';
import { withLayout } from 'src/components/Layout';
import { ILanguage } from 'src/i18n';
import { translateSelector } from 'src/routes/Configs';
import { FONT_SIZES } from 'src/styles';
import styled from 'styled-components';
import { Amount, Balance } from '../../Token';
import {
  getPrivacyDataByTokenIDSelector,
  selectedTokenIdSelector,
} from '../../Token.selector';

interface IProps {}

const Styled = styled.div`
  .token-balance {
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
  }
  .token-balance p.text.bold {
    font-size: ${FONT_SIZES.large}px;
    line-height: ${FONT_SIZES.large + 5}px;
    margin-bottom: 10px;
  }
  .group-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 50px;
  }
  .group-button .btn-container {
    width: 45%;
  }
`;

const TokenBalance = React.memo(() => {
  const tokenId = useSelector(selectedTokenIdSelector);
  return (
    <div className='token-balance'>
      <Amount tokenId={tokenId} />
      <Balance tokenId={tokenId} />
    </div>
  );
});

export const GroupButton = React.memo(() => {
  const translate: ILanguage = useSelector(translateSelector);
  const translateDetail = translate.token.detail;
  return (
    <div className='group-button'>
      <Button title={translateDetail.btnSend} />
      <Button title={translateDetail.btnReceive} />
    </div>
  );
});

const Detail = (props: IProps) => {
  const tokenId = useSelector(selectedTokenIdSelector);
  const token = useSelector(getPrivacyDataByTokenIDSelector)(tokenId);
  return (
    <Styled>
      <Header title={token.name} />
      <TokenBalance />
      <GroupButton />
    </Styled>
  );
};

export default withLayout(Detail);
