import { TxHistoryModelParam } from 'incognito-js/build/web/browser';

export interface IHistoryReducer {
    cacheHistory: ICacheHistoryToken;
    receiveHistory: IReceiveHistoryToken;
    brideHistory: IBrideHistoryToken;
    isFetching: boolean;
    isFetched: boolean;
}

export interface IBrideHistoryToken {
    data: TxBridgeHistoryModel[];
    fetching: boolean;
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
    title?: string;
    desc?: string;
    copyData?: string;
    link?: string;
    descClassName?: string;
    titleClassName?: string;
    descColor?: string;
    customItem?: React.FunctionComponent | React.ReactElement | any;
    disabled?: boolean;
    message?: string;
}

export interface IReceiveHistoryTokenFetched {
    nextPage: number;
    data: TxHistoryReceiveModel[];
    oversize: boolean;
    refreshing: boolean;
    notEnoughData: boolean;
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
    time: string;
    formatType: number;
    lockTime: number;
    statusColor: string;
}

export interface TxHistoryReceiveModel {
    id: string;
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
    statusColor: string;
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
    incognitoTx: string;
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
    timeFormated: string;
    formatType: number;
    lockTime: number;
    amountFormatedNoClip: string;
    symbol: string;
    expiredAtFormated: string;
    statusColor: string;
    memo: string;
    statusDetail: string;
}
