import { TxHistoryModelParam } from 'incognito-js/build/web/browser';

export interface IHistoryReducer {
    cacheHistory: ICacheHistoryToken;
    receiveHistory: IHistoryReceiveToken;
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

export interface ICacheHistoryToken {
    fetching: boolean;
    histories: TxHistoryModelParam[];
}

export interface ICacheHistoryTokenSelector extends TxHistoryModelParam {
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
}

export interface IHistoryItem {
    title: string;
    desc: string;
    copyData?: string;
    link?: string;
    descClassName?: string;
    titleClassName?: string;
}
