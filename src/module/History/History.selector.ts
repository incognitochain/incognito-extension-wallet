import BigNumber from 'bignumber.js';
import { TxHistoryModelParam, CONSTANT } from 'incognito-js/build/web/browser';
import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import toString from 'lodash/toString';
import { IRootState } from 'src/redux/interface';
import { format } from 'src/utils';
import { selectedPrivacySelector } from 'src/module/Token';
import { COINS } from 'src/constants';
import { decimalDigitsSelector } from 'src/module/Setting/Setting.selector';
import { paymentAddressSelector } from 'src/module/Account/Account.selector';
import { HISTORY_FORMAT_TYPE } from './History.constant';
import { getStatusData, getTypeData, combineReceiveAndCacheHistory } from './History.utils';
import { TxCacheHistoryModel, TxHistoryReceiveModel } from './History.interface';

const { TYPE } = CONSTANT.HISTORY;
const { HISTORY_TYPE } = CONSTANT.TX_CONSTANT;

export const historySelector = createSelector(
    (state: IRootState) => state,
    (state) => state.history,
);

export const historyCacheSelector = createSelector(historySelector, (history) => history.cacheHistory);

export const historyCacheDataSelector = createSelector(
    historyCacheSelector,
    selectedPrivacySelector,
    paymentAddressSelector,
    decimalDigitsSelector,
    (historyState, selectedPrivacy, paymen, decimalDigits) => {
        const { histories } = historyState;
        if (!histories) {
            return [];
        }
        const cacheHistory: TxCacheHistoryModel[] = histories.map((history) => {
            const { historyType, nativeTokenInfo, privacyTokenInfo }: TxHistoryModelParam = history;
            let amount = '';
            let fee = '';
            let useNativeFee = false;
            let usePrivacyFee = false;
            let paymentAddress = '';
            let type = historyType;
            if (historyType === HISTORY_TYPE.SEND_NATIVE_TOKEN) {
                amount = nativeTokenInfo.amount;
                fee = nativeTokenInfo.fee;
                useNativeFee = true;
                usePrivacyFee = false;
                paymentAddress = nativeTokenInfo.paymentInfoList[0].paymentAddressStr || '';
                type = TYPE.SEND;
            }
            if (historyType === HISTORY_TYPE.SEND_PRIVACY_TOKEN) {
                amount = privacyTokenInfo?.amount || '';
                paymentAddress = privacyTokenInfo?.paymentInfoList[0].paymentAddressStr || '';
                type = TYPE.SEND;
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
            const lockTime = history.lockTime * 1000;
            const historyItem = {
                txId: history.txId,
                amountFormated,
                timeFormated: format.formatUnixDateTime(lockTime, 'DD MMM hh:mm A'),
                feeFormated,
                statusMessage,
                type: getTypeData(type, history, paymentAddress),
                isIncognitoTx: true,
                fee,
                amount,
                useNativeFee,
                usePrivacyFee,
                symbol,
                feeSymbol,
                paymentAddress,
                amountFormatedNoClip,
                time: toString(history.lockTime),
                formatType: HISTORY_FORMAT_TYPE.cache,
                lockTime,
            };
            return historyItem;
        });
        return cacheHistory;
    },
);

export const getHistoryCacheByTxIdSelector = createSelector(historyCacheDataSelector, (history) => (txId: string) =>
    history && history.find((h: TxCacheHistoryModel) => h.txId === txId),
);

export const receiveHistorySelector = createSelector(historySelector, (history) => history.receiveHistory);

export const receiveHistoryDataSelector = createSelector(
    receiveHistorySelector,
    paymentAddressSelector,
    selectedPrivacySelector,
    decimalDigitsSelector,
    (history, paymentAddress, selectedPrivacy, decimalDigits) => {
        return history.data.map((h) => {
            const type = getTypeData(h.typeCode, history, paymentAddress);
            const amountFormated = format.formatAmount({
                originalAmount: new BigNumber(h.amount).toNumber(),
                decimals: selectedPrivacy?.pDecimals,
                decimalDigits,
            });
            const amountFormatedNoClip = format.formatAmount({
                originalAmount: new BigNumber(h.amount).toNumber(),
                decimals: selectedPrivacy?.pDecimals,
                decimalDigits,
                clipAmount: false,
            });
            const { statusMessage } = getStatusData(h);
            return {
                ...h,
                type,
                amountFormated,
                amountFormatedNoClip,
                statusMessage,
                formatType: HISTORY_FORMAT_TYPE.receive,
                symbol: selectedPrivacy.symbol || selectedPrivacy.pSymbol,
            };
        });
    },
);

export const combineHistorySelector = createSelector(
    historyCacheDataSelector,
    receiveHistoryDataSelector,
    (cacheHistory, receiveHistory) =>
        combineReceiveAndCacheHistory({
            cacheHistory,
            receiveHistory,
        }),
);

export const getHistoryReceiveByTxIdSelector = createSelector(receiveHistoryDataSelector, (history) => (txId: string) =>
    history && history.find((h: TxHistoryReceiveModel) => h.txId === txId),
);
