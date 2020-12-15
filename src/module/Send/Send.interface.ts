export interface IProps {}

export interface IApiGenCenUnShieldAddr {}

export interface IApiUnShield {}

export interface IApiUpdatePTokenFee {}

export interface IApiEstimateUserFees {}

export interface IUserFeesData {
  PrivacyFees: {
    Level1: string;
    Level2: string;
  };
  TokenFees: {
    Level1: string;
    Level2: string;
  };
}

export interface IFeeTypes {
  tokenId: string;
  symbol: string;
}

export interface ISendData {
  fee: number;
  feeUnitByTokenId: string;
  feePDecimals: number;
  minAmount: number;
  minAmountText: string;
  maxAmount: number;
  maxAmountText: string;
  isUsedPRVFee: boolean;
  isUseTokenFee: boolean;
  isUnShield: boolean;
  isSend: boolean;
  // hasMultiLevel: boolean;
  isIncognitoAddress: boolean;
  inputAmount: string;
  inputMemo: string;
  inputAddress: string;
}
