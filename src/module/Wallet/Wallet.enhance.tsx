import { compose } from 'redux';
import { withHeaderApp } from 'src/components/Header';
import enhanceInitData from 'src/module/Wallet/Wallet.enhanceInitData';
import withWalletBalance from 'src/module/Wallet/Wallet.enhanceBalance';
import enhanceDApp from './Wallet.enhanceDApp';
import withBalance from '../Account/Acount.enhanceBalance';

export default compose(withBalance, enhanceInitData, withWalletBalance, enhanceDApp, withHeaderApp);
