import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Header } from 'src/components';
import { ILanguage } from 'src/i18n';
import { themeSelector, translateSelector } from 'src/module/Configs';
import { IGlobalStyle } from 'src/styles';
import styled from 'styled-components';
import {
  Amount,
  Balance,
  ISelectedPrivacy,
  selectedPrivacySelector,
  PerChange,
} from 'src/module/Token';
import { route as routeTokenInfo } from 'src/module/Token/features/TokenInfo';
import { HistoryList } from 'src/module/History';
import { route as routeSend } from 'src/module/Send';
import { useHistory } from 'react-router-dom';
import withDetail from './Detail.enhance';
import { InfoIcon, VerifiedIcon } from 'src/components/Icons';

interface IProps {}

const Styled = styled.div`
  .token-balance {
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
  }
  .token-balance .amount-token {
    margin-bottom: 10px;
  }
  .token-balance .balance-token {
    color: ${(props: IGlobalStyle) => props.theme.text};
  }
  .btn-container {
    margin: 30px 0;
  }
  .hook-container {
    display: flex;
    align-items: flex-start;
  }
  .hook-container .verified-icon {
    width: 18px;
    margin-top: 2px;
  }
  .hook-container {
    > :first-child {
      margin-right: 5px;
    }
  }
  .hook-container .amount-token {
    max-width: 200px;
  }
  .header-title {
    max-width: 100px;
  }
`;

const TokenBalance = React.memo(() => {
  const selectedPrivacy: ISelectedPrivacy = useSelector(
    selectedPrivacySelector
  );
  const tokenId = selectedPrivacy.tokenId;
  return (
    <div className='token-balance'>
      <div className='hook-container'>
        <Amount
          tokenId={tokenId}
          classNameTextCustom='fw-bold fs-avglarge amount-token'
          showVerifiedToken={true}
        />
        {selectedPrivacy.isVerified && <VerifiedIcon />}
      </div>
      <div className='hook-container'>
        <Balance tokenId={tokenId} classNameTextCustom='balance-token' />
        <PerChange tokenId={tokenId} />
      </div>
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
  return <Button title={translateDetail.btnSend} onClick={handleSend} />;
});

const Detail = (props: IProps) => {
  const token = useSelector(selectedPrivacySelector);
  const theme = useSelector(themeSelector);
  const history = useHistory();
  return (
    <Styled theme={theme}>
      <Header
        title={token.name}
        customHeader={<InfoIcon onClick={() => history.push(routeTokenInfo)} />}
      />
      <TokenBalance />
      <GroupButton />
      <HistoryList />
    </Styled>
  );
};

export default withDetail(Detail);
