/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import { rpcClient } from 'incognito-js/build/web/browser';
import { delay } from 'src/utils/delay';
import { ITx } from './UnShield.interface';

export const filterLastRawWithdrawTx = async ({ tx }: { tx: ITx }) => {
    try {
        let count = 0;
        while (count < 5) {
            let _txInfo;
            try {
                _txInfo = await rpcClient.getTransactionByHash(tx.burningTxId);
                if (_txInfo) {
                    return !!_txInfo.IsInBlock || !!_txInfo.IsInMempool;
                }
            } catch (error) {
                console.debug(error);
            } finally {
                count += 1;
            }
            await delay(60 * 1000);
        }
    } catch (error) {
        console.debug(error);
    }
    return false;
};
