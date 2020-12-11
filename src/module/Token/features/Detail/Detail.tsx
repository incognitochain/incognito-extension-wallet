import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Header } from 'src/components';
import { ILanguage } from 'src/i18n';

import { translateSelector } from 'src/module/Configs';
import { FONT_SIZES } from 'src/styles';
import styled from 'styled-components';
import { Amount, Balance } from 'src/module/Token';
import { HistoryList } from 'src/module/History';
import {
  selectedTokenIdSelector,
  selectedPrivacySelector,
} from 'src/module/Token';
import { route as routeSend } from 'src/module/Send';
import { useHistory } from 'react-router-dom';
import withDetail from './Detail.enhance';

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
  const history = useHistory();
  const handleSend = () => {
    history.push(routeSend);
  };
  return (
    <div className='group-button'>
      <Button title={translateDetail.btnSend} onClick={handleSend} />
      <Button title={translateDetail.btnReceive} />
    </div>
  );
});

const Detail = (props: IProps) => {
  const token = useSelector(selectedPrivacySelector);
  return (
    <Styled>
      <Header title={token.name} />
      <TokenBalance />
      <GroupButton />
      <HistoryList />
    </Styled>
  );
};

export default withDetail(Detail);
