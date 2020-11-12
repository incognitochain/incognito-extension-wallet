export interface IProps {}

export interface IHistoryToken {
  isFetching: boolean;
  isFetched: boolean;
  histories: any[];
  refreshing: boolean;
}

export interface IHistoryReceiveToken {
  isFetching: boolean;
  isFetched: boolean;
  data: any[];
  oversize: boolean;
  page: number;
  limit: number;
  refreshing: boolean;
  tokenId: string;
  notEnoughData: boolean;
}

export interface IPTokenFromApi {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
  TokenID: string;
  Symbol: string;
  OriginalSymbol: string;
  Name: string;
  ContractID: string;
  Decimals: number;
  PDecimals: number;
  Status: number;
  Type: number;
  CurrencyType: number;
  PSymbol: string;
  Default: boolean;
  UserID: number;
  PriceUsd: number;
  Verified: boolean;
  LiquidityReward: number;
  PercentChange1h: string;
  PercentChangePrv1h: string;
  CurrentPrvPool: number;
  PricePrv: number;
  volume24: number;
}

export interface IPToken {
  id: number;
  tokenId: string;
  symbol: string;
  pSymbol: string;
  decimals: number;
  pDecimals: number;
  currencyType: number;
}
