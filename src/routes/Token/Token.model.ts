import { COINS, CONSTANT_CONFIGS } from 'src/constants';
import { IPCustomToken, IPToken, ISelectedPrivacy } from './Token.interface';

function getNetworkName(this: ISelectedPrivacy) {
  let name = 'Unknown';
  const isETH = this?.symbol === COINS.CRYPTO_SYMBOL.ETH;
  const isBNB = this?.symbol === COINS.CRYPTO_SYMBOL.BNB;
  if (this.isPrivateCoin) {
    name = `${name}`;
  } else if (this.isErc20Token) {
    name = 'ERC20';
  } else if (this.isBep2Token) {
    name = 'BEP2';
  } else if (this.isIncognitoToken || this.isNativeToken) {
    name = 'Incognito';
  }
  let rootNetworkName = name;
  if (isETH || this?.isErc20Token) {
    rootNetworkName = COINS.NETWORK_NAME.ETHEREUM;
  } else if (isBNB || this?.isBep2Token) {
    rootNetworkName = COINS.NETWORK_NAME.BINANCE;
  }
  return {
    networkName: name,
    rootNetworkName,
  };
}

function combineData(
  this: SelectedPrivacy,
  pTokenData: any,
  pCustomTokenData: any,
  defaultData: any
) {
  if (this?.isPToken) {
    return pTokenData;
  }
  if (this?.isIncognitoToken) {
    return pCustomTokenData;
  }
  return defaultData;
}

function getIconUrl(this: SelectedPrivacy, chainTokenImageUri: string) {
  let uri;
  if (!!this.isNativeToken || this.isPToken) {
    let formatedSymbol = String(this.pSymbol || this.symbol).toLowerCase();
    uri = `${CONSTANT_CONFIGS.CRYPTO_ICON_URL}/${formatedSymbol}@2x.png`;
  } else {
    uri = chainTokenImageUri;
  }

  return uri;
}

class SelectedPrivacy {
  tokenId: string;
  currencyType: number;
  isToken: boolean;
  isNativeToken: boolean;
  isPrivateToken: boolean;
  isPrivateCoin: boolean;
  isPToken: boolean;
  isIncognitoToken: boolean;
  isErc20Token: boolean;
  isBep2Token: boolean;
  symbol: string;
  name: string;
  displayName: string;
  contractId: string;
  decimals: number;
  pDecimals: number;
  pSymbol: string;
  isWithdrawable: boolean;
  isDeposable: boolean;
  isDecentralized: boolean;
  isCentralized: boolean;
  incognitoTotalSupply: number;
  isVerified: boolean;
  iconUrl: string;
  priceUsd: number;
  change: string;
  pricePrv: number;
  pairWithPrv: boolean;
  networkName: string;
  rootNetworkName: string;
  amount: number;
  isFollowed: boolean;
  formatAmount: string;
  formatBalanceByUsd: string;
  formatPriceByUsd: string;
  constructor(
    pCustomTokenData: IPCustomToken | any,
    pTokenData: IPToken | any
  ) {
    this.tokenId =
      pTokenData?.tokenId || pCustomTokenData?.tokenId || COINS.PRV.id;
    this.currencyType = pTokenData?.currencyType;
    this.isToken = this.tokenId !== COINS.PRV.id && !!this.tokenId; // all kind of tokens (private tokens, incognito tokens)
    this.isNativeToken = this.tokenId === COINS.PRV.id || !this.isToken; // PRV
    this.isPrivateToken = pTokenData?.type === COINS.PRIVATE_TOKEN_TYPE.TOKEN; // ERC20 tokens, BEP2 tokens
    this.isPrivateCoin = pTokenData?.type === COINS.PRIVATE_TOKEN_TYPE.COIN; // pETH, pBTC, pTOMO,...
    this.isPToken = !!pTokenData?.pSymbol; // pToken is private token (pETH <=> ETH, pBTC <=> BTC, ...)
    this.isIncognitoToken = !this.isPToken && !this.isNativeToken; // is tokens were issued from users
    this.isErc20Token =
      this.isPrivateToken &&
      this.currencyType === COINS.PRIVATE_TOKEN_CURRENCY_TYPE.ERC20;
    this.isBep2Token =
      this.isPrivateToken &&
      this.currencyType === COINS.PRIVATE_TOKEN_CURRENCY_TYPE.BNB_BEP2;
    this.symbol = combineData.call(
      this,
      pTokenData?.symbol,
      pCustomTokenData?.symbol,
      COINS.PRV.symbol
    );
    this.name = combineData.call(
      this,
      pTokenData?.name,
      pCustomTokenData?.name,
      'Privacy'
    );
    this.displayName = combineData.call(
      this,
      `Privacy ${pTokenData?.symbol}`,
      pCustomTokenData?.name,
      'Privacy'
    );
    this.contractId = pTokenData?.contractId;
    this.decimals = this.isNativeToken
      ? COINS.PRV.pDecimals
      : pTokenData?.decimals;
    this.pDecimals = this.isNativeToken
      ? COINS.PRV.pDecimals
      : pTokenData?.pDecimals;
    this.pSymbol = pTokenData?.pSymbol;
    this.isWithdrawable = !!this.isPToken;
    this.isDeposable = !!this.isPToken;
    this.isDecentralized =
      (this.isToken && this.symbol === COINS.CRYPTO_SYMBOL.ETH) ||
      this.isErc20Token;
    this.isCentralized = !!this.isToken && !this.isDecentralized;
    this.incognitoTotalSupply =
      (this.isIncognitoToken && Number(pCustomTokenData?.totalSupply)) || 0;
    this.isVerified = combineData.call(
      this,
      pTokenData?.verified,
      pCustomTokenData?.verified,
      true
    ); // PRV always is verified
    this.iconUrl = getIconUrl.call(this, pCustomTokenData?.image);
    this.priceUsd = pTokenData?.priceUsd || 0;
    this.change = pTokenData?.change || '0';
    this.pricePrv = pTokenData?.pricePrv || 0;
    this.pairWithPrv = pTokenData?.pairPrv;
    const { networkName, rootNetworkName } = getNetworkName.call(this);
    this.networkName = networkName;
    this.rootNetworkName = rootNetworkName;
    this.amount = 0;
    this.isFollowed = false;
    this.formatAmount = '0';
    this.formatPriceByUsd = '0';
    this.formatBalanceByUsd = '0';
  }
}
export default SelectedPrivacy;
