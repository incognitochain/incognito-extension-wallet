export interface ConfirmTxItem {
    txId: string;
    paymentAddress: string;
    time: string;
    amount: string;
    fee: string;
    feeSymbol: string;
    symbol: string;
    isIncognitoAddress?: boolean;
    isExternalAddress?: boolean;
    addressBookType?: number;
    tokenId?: string;
}
