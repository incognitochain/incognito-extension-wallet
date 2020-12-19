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
    feeText: string;
    totalFee: number;
    totalFeeText: string;
    minAmount: number;
    minAmountText: string;
    maxAmount: number;
    maxAmountText: string;
    isUsedPRVFee: boolean;
    isUseTokenFee: boolean;
    isUnShield: boolean;
    isSend: boolean;
    isIncognitoAddress: boolean;
    inputAmount: string;
    inputMemo: string;
    inputAddress: string;
    titleBtnSubmit: string;
}

export interface ISendReducer {
    isFetching: boolean;
    isFetched: boolean;
    minFeePrv: number;
    minFeePrvText: string;
    feePrv: number;
    feePrvText: string;
    maxFeePrv: number;
    maxFeePrvText: string;
    feePToken: number;
    feePTokenText: string;
    feeBurnPToken: number;
    feeBurnPTokenText: string;
    minFeePToken: number;
    minFeePTokenText: string;
    maxFeePToken: number;
    maxFeePTokenText: string;
    amount: number;
    amountText: string;
    minAmount: number;
    minAmountText: string;
    init: boolean;
    screen: string;
    types: IFeeTypes[];
    actived: string;
    rate: number;
    isAddressValidated: boolean;
    isValidETHAddress: boolean;
    userFees: {
        isFetching: boolean;
        isFetched: boolean;
        data: IUserFeesData | any;
        hasMultiLevel: boolean;
        isMemoRequired: boolean;
    };
    isValidating: boolean;
    fast2x: boolean;
    totalFeePrv: number;
    totalFeePrvText: string;
    userFeePrv: number;
    totalFeePToken: number;
    totalFeePTokenText: string;
    userFeePToken: number;
}
