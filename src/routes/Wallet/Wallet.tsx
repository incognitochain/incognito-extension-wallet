import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Button, Header } from 'src/components';
import { ILanguage } from 'src/i18n';
import styled from 'styled-components';
import { translateSelector } from '../Configs';
import {
  ListToken,
  Token,
  followedTokensIdsSelector,
  actionSetSelectedToken,
  totalShieldedTokensSelector,
  ITotalShielded,
} from 'src/routes/Token';
import withWallet from './Wallet.enhance';
import { route as routeAddToken } from 'src/routes/Token/features/AddToken';

interface IProps {}

interface IListFollowToken {}

const Styled = styled.div`
  .list-token {
    height: 300px;
    overflow: scroll;
  }
  .total-shield {
    > p {
      :nth-child(2) {
        margin-top: 15px;
      }
    }
    .btn-container {
      margin: 50px 0;
      width: 100%;
    }
  }
  .btn-add-coin {
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

const ListFollowToken = (props: IListFollowToken) => {
  const listFollowTokenIds = useSelector(followedTokensIdsSelector)(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleSelectToken = (tokenId: string) => {
    dispatch(actionSetSelectedToken(tokenId));
    history.push(`/token/${tokenId}`);
  };
  const renderItem = (tokenId: string) => (
    <Token
      tokenId={tokenId}
      handleSelectToken={() => handleSelectToken(tokenId)}
      showBalance
      showAmount
    />
  );
  return <ListToken data={listFollowTokenIds} renderItem={renderItem} />;
};

const TotalShield = () => {
  const totalShield: ITotalShielded = useSelector(totalShieldedTokensSelector);
  const translate: ILanguage = useSelector(translateSelector);
  const { btnShield, totalShielded } = translate.wallet.blockShield;
  return (
    <div className='total-shield'>
      <p className='fontsize-verylarge fontweight-medium center-text'>
        {`$${totalShield.formatTotalAmountUSD}`}
      </p>
      <p className='fontsize-regular fontweight-medium center-text'>
        {totalShielded}
      </p>
      <Button title={btnShield}></Button>
    </div>
  );
};

const AddCoin = React.memo(() => {
  const translate: ILanguage = useSelector(translateSelector);
  const wallet = translate.wallet;
  return (
    <Link className='btn-add-coin' to={routeAddToken}>
      {wallet.addCoin}
    </Link>
  );
});

const Wallet = (props: IProps) => {
  const translate: ILanguage = useSelector(translateSelector);
  const wallet = translate.wallet;
  return (
    <Styled className='wrapper'>
      <Header title={wallet.headerTitle} selectAccount />
      <TotalShield />
      <ListFollowToken />
      <AddCoin />
    </Styled>
  );
};

export default withWallet(React.memo(Wallet));
