export interface ITx {
    burningTxId: string;
    data: any;
}

export interface ITxs {
    txs: ITx[];
}

export interface IUnshieldReducer {
    storage: {
        decentralized: ITxs;
        centralized: ITxs;
        decentralizedRawTxs: ITxs;
        centralizedRawTxs: ITxs;
    };
}
