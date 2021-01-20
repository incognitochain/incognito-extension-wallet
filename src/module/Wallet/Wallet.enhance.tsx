import { compose } from 'redux';
import { withHeaderApp } from 'src/components/Header';
import enhanceInitData from 'src/module/Wallet/Wallet.enhanceInitData';
import withWalletBalance from 'src/module/Wallet/Wallet.enhanceBalance';
import withBalance from 'src/module/Account/Acount.enhanceBalance';
import enhanceDApp from './Wallet.enhanceDApp';

export default compose(withBalance, enhanceInitData, withWalletBalance, enhanceDApp, withHeaderApp);
