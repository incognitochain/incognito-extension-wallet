import React from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { useDispatch, useSelector } from 'react-redux';
import { selectedPrivacySelector } from '../../Token.selector';
import { ISelectedPrivacy } from '../../Token.interface';
import format from 'src/utils/format';
import { serverSelector } from 'src/module/Preload';
import { IServer } from 'src/services';
import { actionToggleModal } from 'src/components/Modal';
import TokenInfoVerify from './TokenInfo.verify';
import { COINS } from 'src/constants';

export interface IInfo {
  label: string;
  value: string;
  link?: string;
  copyable?: boolean;
}

const enhance = (WrappedComp: React.FunctionComponent) => (props: any) => {
  const dispatch = useDispatch();
  const selectedPrivacy: ISelectedPrivacy = useSelector(
    selectedPrivacySelector
  );
  const {
    tokenId,
    isVerified,
    isBep2Token,
    contractId,
    amount,
    pDecimals,
    incognitoTotalSupply,
    pSymbol,
    symbol,
    networkName,
  } = selectedPrivacy;
  const server: IServer = useSelector(serverSelector);
  console.debug(symbol, selectedPrivacy.isPrivateCoin, networkName)
  const getNetworkName = () => {
    if (selectedPrivacy?.isErc20Token) {
      return 'Ethereum network (ERC20)';
    }
    if (selectedPrivacy?.isBep2Token) {
      return 'Binance network (BEP2)';
    }
    if (symbol === COINS.CRYPTO_SYMBOL.BNB) {
      return 'Binance network';
    }
    return `${networkName} network`;
  };
  const infosFactories: IInfo[] = [
    {
      label: 'Balance',
      value: format.formatAmount({
        originalAmount: amount,
        decimals: pDecimals,
      }),
    },
    {
      label: 'Origin',
      value: getNetworkName(),
    },
    {
      label: 'Original Ticker',
      value: symbol || pSymbol,
      link: isBep2Token
        ? `${server.exploreBinanceURL}/asset/${symbol}`
        : undefined,
    },

    {
      label: 'Coin ID',
      value: tokenId,
      copyable: true,
    },
    {
      label: 'Contract ID',
      value: contractId,
      link: `${server.etherscanURL}/token/${contractId}`,
    },
    {
      label: 'Coin supply',
      value: incognitoTotalSupply
        ? format.formatAmount({
            originalAmount: incognitoTotalSupply,
            decimals: pDecimals,
          })
        : '',
    },
    {
      label: 'Owner name',
      value: selectedPrivacy?.ownerName,
      copyable: true,
    },
    {
      label: 'Owner address',
      value: selectedPrivacy?.ownerAddress,
      copyable: true,
    },
    {
      label: 'Owner email',
      value: selectedPrivacy?.ownerEmail,
      copyable: true,
    },
    {
      label: 'Owner website',
      value: selectedPrivacy?.ownerWebsite,
      link: selectedPrivacy?.ownerWebsite,
    },
  ];
  const handlePressVerifiedInfo = () =>
    dispatch(
      actionToggleModal({
        visible: true,
        data: <TokenInfoVerify />,
      })
    );
  return (
    <ErrorBoundary>
      <WrappedComp
        {...{
          ...props,
          infosFactories,
          tokenId,
          isVerified,
          handlePressVerifiedInfo,
        }}
      />
    </ErrorBoundary>
  );
};

export default enhance;
