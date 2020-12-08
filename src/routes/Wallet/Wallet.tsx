import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import { Header } from 'src/components';
import { ILanguage } from 'src/i18n';
import styled from 'styled-components';
import { translateSelector } from '../Configs';
import {
  ListToken,
  TokenBasic,
  followedTokensIdsSelector,
  actionSetSelectedToken,
} from 'src/routes/Token';
import withWallet from './Wallet.enhance';
// import { route as routeAddToken } from 'src/routes/Token/features/AddToken';
// import FollowToken from 'src/routes/Token/features/FollowToken';

interface IProps {}

interface IListFollowToken {}

const Styled = styled.div``;

const ListFollowToken = (props: IListFollowToken) => {
  const listFollowTokenIds = useSelector(followedTokensIdsSelector)(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleSelectToken = (tokenId: string) => {
    dispatch(actionSetSelectedToken(tokenId));
    history.push(`/token/${tokenId}`);
  };
  const renderItem = (tokenId: string) => (
    <TokenBasic
      tokenId={tokenId}
      handleSelectToken={() => handleSelectToken(tokenId)}
    />
  );
  return <ListToken data={listFollowTokenIds} renderItem={renderItem} />;
};

// const TotalShield = () => {

//   const getTotalBalance = async () => {
//     return await account.nativeToken.getTotalBalance();
//   };
//   return <div className='total-shield'>{getTotalBalance()}</div>;
// };

// const TotalShield = () => {
//   return <div className='total-shield'>0</div>;
// };

// const AddCoin = React.memo(() => {
//   const translate: ILanguage = useSelector(translateSelector);
//   const wallet = translate.wallet;
//   return <Link to={routeAddToken}>{wallet.addCoin}</Link>;
// });

const Wallet = (props: IProps) => {
  const translate: ILanguage = useSelector(translateSelector);
  const wallet = translate.wallet;
  return (
    <Styled>
      <Header title={wallet.headerTitle} selectAccount />
      {/* <TotalShield /> */}
      {/* <AddCoin /> */}
      <ListFollowToken />
    </Styled>
  );
};

export default withWallet(React.memo(Wallet));
