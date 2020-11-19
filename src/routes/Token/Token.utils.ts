import includes from 'lodash/includes';
import toLower from 'lodash/toLower';
import isNaN from 'lodash/isNaN';
import { IPToken, ISelectedPrivacy } from './Token.interface';

export const handleFilterTokenByKeySearch = ({
  tokens,
  keySearch = '',
}: {
  tokens: any[];
  keySearch?: string;
}) =>
  tokens.filter(
    (token) =>
      includes(toLower(token?.displayName), keySearch) ||
      includes(toLower(token?.name), keySearch) ||
      includes(toLower(token?.symbol), keySearch) ||
      includes(toLower(token?.pSymbol), keySearch) ||
      includes(toLower(token?.networkName), keySearch)
  ) || tokens;

export const getPrice = ({
  token,
  tokenUSDT,
}: {
  token: ISelectedPrivacy;
  tokenUSDT: IPToken | any;
}) => {
  const defaultValue = {
    pricePrv: 0,
    change: '0',
    priceUsd: 0,
  };
  if (!tokenUSDT) {
    return defaultValue;
  }
  const { pricePrv: priceOneUsdtByPrv } = tokenUSDT;
  const priceOnePrvToUsdt = 1 / priceOneUsdtByPrv;
  if (token?.isNativeToken) {
    return {
      change: '0',
      pricePrv: 1,
      priceUsd: priceOnePrvToUsdt || 0,
    };
  }
  const _pricePrv =
    Number(token?.pricePrv) !== 0
      ? token?.pricePrv
      : token?.priceUsd / priceOnePrvToUsdt;
  const _priceUsd =
    Number(token?.priceUsd) !== 0
      ? token?.priceUsd
      : _pricePrv * priceOnePrvToUsdt;
  return {
    change: token?.change || defaultValue.change,
    pricePrv:
      token?.pricePrv !== 0
        ? token?.pricePrv
        : isNaN(_pricePrv)
        ? 0
        : _pricePrv,
    priceUsd: _priceUsd,
  };
};
