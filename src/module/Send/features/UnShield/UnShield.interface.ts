export interface ITxs {
    txs: {
        burningTxId: string;
        data: any;
    }[];
}

export interface IUnshieldReducer {
    storage: {
        decentralized: ITxs;
        centralized: ITxs;
    };
}
