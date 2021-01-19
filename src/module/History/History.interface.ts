import { TxHistoryModelParam } from 'incognito-js/build/web/browser';

export interface IHistoryReducer {
    isFetching: boolean;
    isFetched: boolean;
    cacheHistory: ICacheHistoryToken;
    receiveHistory: IReceiveHistoryToken;
    brideHistory: IBrideHistoryToken;
}

export interface IBrideHistoryToken {
    data: any[];
    fetching: boolean;
}

export interface IReceiveHistoryToken {
    isFetching: boolean;
    isFetched: boolean;
    data: any[];
    oversize: boolean;
    page: number;
    limit: number;
    refreshing: boolean;
    tokenId: string;
    accountSerialNumbers: any[];
}

export interface ICacheHistoryToken {
    fetching: boolean;
    histories: TxHistoryModelParam[];
}

export interface IReceiveHistoryTokenFetched {
    nextPage: number;
    data: any[];
    oversize: boolean;
    refreshing: boolean;
}

export interface TxHistoryItem {
    id: string;
    type: string;
    amountFormated: string;
    timeFormated: string;
    statusMessage: string;
    formatType: number; // 0: cache; 1: receive;
    lockTime: number;
}

export interface TxCacheHistoryModel {
    id: string;
    txId: string;
    amountFormated: string;
    timeFormated: string;
    feeFormated: string;
    statusMessage: string;
    type: string;
    isIncognitoTx: boolean;
    fee: string;
    amount: string;
    useNativeFee: boolean;
    usePrivacyFee: boolean;
    symbol: string;
    feeSymbol: string;
    paymentAddress: string;
    amountFormatedNoClip: string;
    formatType: number;
    lockTime: number;
    statusColor: string;
    memo: string;
}

export interface TxHistoryReceiveModel {
    id: string;
    txId: string;
    isPrivacy: boolean;
    amount: string;
    tokenId: string;
    serialNumbers: any[];
    metaData: any;
    privacyCustomTokenProofDetail: any;
    isMintedToken: boolean;
    type: string;
    status: number;
    typeCode: number;
    lockTime: number;
    amountFormated: string;
    amountFormatedNoClip: string;
    timeFormated: string;
    statusMessage: string;
    formatType: number;
    symbol: string;
    statusColor: string;
    memo: string;
}

export interface TxBridgeHistoryModel {
    id: string;
    userID: number;
    address: string;
    expiredAt: string;
    addressType: number;
    status: number;
    currencyType: number;
    walletAddress: string;
    userPaymentAddress: string;
    requestedAmount: string;
    receivedAmount: string;
    incognitoAmount: string;
    ethereumTx: string;
    erc20TokenTx: string;
    privacyTokenAddress: string;
    erc20TokenAddress: string;
    createdAt: string;
    updatedAt: string;
    decentralized: number;
    outChainTx: string;
    inChainTx: string;
    statusMessage: string;
    type: string;
    amountFormated: string;
    amountFormatedNoClip: string;
    timeFormated: string;
    formatType: number;
    lockTime: number;
    symbol: string;
    expiredAtFormated: string;
    statusColor: string;
    memo?: string;
    statusDetail: string;
    canRetryExpiredShield: boolean;
    isDecentralized: boolean;
    canRemoveExpiredOrPendingShield: boolean;
    isShieldTx: boolean;
    isUnShieldTx: boolean;
    privacyFee?: string;
    burnPrivacyFee?: string;
    tokenFee?: string;
    burnTokenFee?: string;
    inchainFee?: string;
    outchainFee?: string;
    inchainFeeFormated?: string;
    inchainFeeFormatedNoClip?: string;
    outchainFeeFormated?: string;
    outchainFeeFormatedNoClip?: string;
    feeSymbol?: string;
    incognitoTx: string;
    incognitoTxToPayOutsideChainFee?: string;
}
