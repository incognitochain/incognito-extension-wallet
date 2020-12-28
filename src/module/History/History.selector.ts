import BigNumber from 'bignumber.js';
import { TxHistoryModelParam, CONSTANT } from 'incognito-js/build/web/browser';
import { createSelector } from 'reselect';
import { keySetAccountSelector } from 'src/module/Account';
import { IRootState } from 'src/redux/interface';
import { isEmpty } from 'lodash';
import { format } from 'src/utils';
import { selectedPrivacySelector } from 'src/module/Token';
import { COINS } from 'src/constants';
import { decimalDigitsSelector } from 'src/module/Setting/Setting.selector';
import { getStatusData, getTypeData } from './History.utils';
import { ICacheHistoryTokenSelector } from './History.interface';

const { HISTORY_TYPE } = CONSTANT.TX_CONSTANT;

export const historySelector = createSelector(
    (state: IRootState) => state,
    (state) => state.history,
);

export const historyCacheSelector = createSelector(historySelector, (history) => history.cacheHistory);

export const historyCacheDataSelector = createSelector(
    historyCacheSelector,
    selectedPrivacySelector,
    keySetAccountSelector,
    decimalDigitsSelector,
    (historyState, selectedPrivacy, keySet, decimalDigits) => {
        const { histories } = historyState;
        if (!histories) {
            return [];
        }
        const cacheHistory: ICacheHistoryTokenSelector[] = histories.map((history: TxHistoryModelParam) => {
            const { historyType, nativeTokenInfo, privacyTokenInfo } = history;
            let amount = '';
            let fee = '';
            let useNativeFee = false;
            let usePrivacyFee = false;
            let paymentAddress = '';
            if (historyType === HISTORY_TYPE.SEND_NATIVE_TOKEN) {
                amount = nativeTokenInfo.amount;
                fee = nativeTokenInfo.fee;
                useNativeFee = true;
                usePrivacyFee = false;
                paymentAddress = nativeTokenInfo.paymentInfoList[0].paymentAddressStr || '';
            }
            if (historyType === HISTORY_TYPE.SEND_PRIVACY_TOKEN) {
                amount = privacyTokenInfo?.amount || '';
                paymentAddress = privacyTokenInfo?.paymentInfoList[0].paymentAddressStr || '';
                if (isEmpty(nativeTokenInfo.fee)) {
                    useNativeFee = false;
                    usePrivacyFee = true;
                    fee = privacyTokenInfo?.fee || '';
                }
                if (isEmpty(privacyTokenInfo?.fee)) {
                    useNativeFee = true;
                    usePrivacyFee = false;
                    fee = nativeTokenInfo.fee;
                }
            }
            const symbol = selectedPrivacy.symbol || selectedPrivacy.pSymbol;
            const feeSymbol = useNativeFee ? COINS.PRV.symbol : selectedPrivacy.symbol || selectedPrivacy.pSymbol;
            const amountFormated = format.formatAmount({
                originalAmount: new BigNumber(amount).toNumber(),
                decimals: selectedPrivacy?.pDecimals,
                decimalDigits,
            });
            const amountFormatedNoClip = format.formatAmount({
                originalAmount: new BigNumber(amount).toNumber(),
                decimals: selectedPrivacy?.pDecimals,
                decimalDigits,
                clipAmount: false,
            });
            const feeFormated = format.formatAmount({
                originalAmount: new BigNumber(fee).toNumber(),
                decimals: selectedPrivacy?.pDecimals,
                decimalDigits: false,
                clipAmount: false,
            });
            const { statusMessage } = getStatusData(history);
            const historyItem = {
                ...history,
                amountFormated,
                timeFormated: format.formatUnixDateTime(history?.lockTime, 'MMM DD HH:mm A'),
                feeFormated,
                statusMessage,
                type: getTypeData(
                    history?.historyType || HISTORY_TYPE.SEND_NATIVE_TOKEN,
                    history,
                    keySet.paymentAddressKeySerialized,
                ),
                isIncognitoTx: true,
                fee,
                amount,
                useNativeFee,
                usePrivacyFee,
                symbol,
                feeSymbol,
                paymentAddress,
                amountFormatedNoClip,
            };
            return historyItem;
        });
        return cacheHistory;
    },
);

export const historyCacheByTxIdSelector = createSelector(historyCacheDataSelector, (history) => (txId: string) =>
    history && history.find((h: ICacheHistoryTokenSelector) => h.txId === txId),
);
