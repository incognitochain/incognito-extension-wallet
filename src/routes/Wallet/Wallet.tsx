import { AccountInstance } from 'incognito-js/build/web/browser';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header } from 'src/components';
import { ILanguage } from 'src/i18n';
import styled from 'styled-components';
import { defaultAccountSelector } from '../Account';
import { translateSelector } from '../Configs';
import withWallet from './Wallet.enhance';
import { route as routeAddToken } from 'src/routes/Token/features/AddToken';

interface IProps {}

const Styled = styled.div``;

// const TotalShield = () => {

//   const getTotalBalance = async () => {
//     return await account.nativeToken.getTotalBalance();
//   };
//   return <div className='total-shield'>{getTotalBalance()}</div>;
// };

const TotalShield = () => {
  const account: AccountInstance = useSelector(defaultAccountSelector);
  const [balance, setBalance] = React.useState(0);
  const handleLoadBalance = async () => {
    const _balance: any = await account.nativeToken.getTotalBalance();
    console.debug(_balance);
    setBalance(_balance);
  };
  React.useEffect(() => {
    handleLoadBalance();
  }, []);
  return <div className='total-shield'>0</div>;
};

const AddCoin = React.memo(() => {
  const translate: ILanguage = useSelector(translateSelector);
  const wallet = translate.wallet;
  return <Link to={routeAddToken}>{wallet.addCoin}</Link>;
});

const Wallet = (props: IProps) => {
  const translate: ILanguage = useSelector(translateSelector);
  const wallet = translate.wallet;
  return (
    <Styled>
      <Header title={wallet.headerTitle} selectAccount />
      <TotalShield />
      <AddCoin />
    </Styled>
  );
};

export default withWallet(React.memo(Wallet));
