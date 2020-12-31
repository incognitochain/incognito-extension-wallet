import { TxHistoryModelParam } from 'incognito-js/build/web/browser';

export interface IHistoryReducer {
    cacheHistory: ICacheHistoryToken;
    receiveHistory: IReceiveHistoryToken;
}

export interface IReceiveHistoryToken {
    isFetching: boolean;
    isFetched: boolean;
    data: TxHistoryReceiveModel[];
    oversize: boolean;
    page: number;
    limit: number;
    refreshing: boolean;
    tokenId: string;
    notEnoughData: boolean;
}

export interface ICacheHistoryToken {
    fetching: boolean;
    histories: TxHistoryModelParam[];
}

export interface IHistoryItem {
    title: string;
    desc: string;
    copyData?: string;
    link?: string;
    descClassName?: string;
    titleClassName?: string;
}

export interface IReceiveHistoryTokenFetched {
    nextPage: number;
    data: TxHistoryReceiveModel[];
    oversize: boolean;
    refreshing: boolean;
    notEnoughData: boolean;
}

export interface TxHistoryItem {
    txId: string;
    type: string;
    amountFormated: string;
    timeFormated: string;
    statusMessage: string;
    formatType: number; // 0: cache; 1: receive;
    lockTime: number;
}

export interface TxCacheHistoryModel {
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
    time: string;
    formatType: number;
    lockTime: number;
}

export interface TxHistoryReceiveModel {
    txId: string;
    time: string;
    isPrivacy: boolean;
    amount: string;
    tokenId: string;
    serialNumbers: any[];
    metaData: any;
    privacyCustomTokenProofDetail: any;
    isMintedToken: boolean;
    type: string;
    status: number;
    isHistoryReceived: boolean;
    typeCode: number;
    lockTime: number;
    amountFormated: string;
    amountFormatedNoClip: string;
    timeFormated: string;
    feeFormated: string;
    statusMessage: string;
    formatType: number;
    symbol: string;
}
