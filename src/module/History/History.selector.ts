import memoize from 'lodash/memoize';
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
import { HISTORY_FORMAT_TYPE } from './History.constant';
import { getStatusData, getTypeData, handleCombineHistory } from './History.utils';
import { TxBridgeHistoryModel, TxCacheHistoryModel, TxHistoryReceiveModel } from './History.interface';

const { TYPE, STATUS_CODE_SHIELD_CENTRALIZED } = CONSTANT.HISTORY;
const { HISTORY_TYPE } = CONSTANT.TX_CONSTANT;

export const historySelector = createSelector(
    (state: IRootState) => state,
    (state) => state.history,
);

export const historyCacheSelector = createSelector(historySelector, (history) => history.cacheHistory);

export const historyCacheDataSelector = createSelector(
    historyCacheSelector,
    selectedPrivacySelector,
    decimalDigitsSelector,
    (historyState, selectedPrivacy, decimalDigits) => {
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
            const feePDecimals = useNativeFee ? COINS.PRV.pDecimals : selectedPrivacy.pDecimals;
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
                decimals: feePDecimals,
                decimalDigits: false,
                clipAmount: false,
            });
            const { statusMessage, statusColor } = getStatusData(history);
            const lockTime = history.lockTime * 1000;
            const historyItem = {
                id: history.txId,
                txId: history.txId,
                amountFormated,
                timeFormated: format.formatUnixDateTime(lockTime),
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
                statusColor,
            };
            return historyItem;
        });
        return cacheHistory;
    },
);

export const getHistoryCacheByTxIdSelector = createSelector(
    (state: IRootState) => historyCacheDataSelector(state),
    (history) => memoize((txId: string) => history && history.find((h: TxCacheHistoryModel) => h.txId === txId)),
);

export const receiveHistorySelector = createSelector(historySelector, (history) => history.receiveHistory);

export const receiveHistoryDataSelector = createSelector(
    receiveHistorySelector,
    selectedPrivacySelector,
    decimalDigitsSelector,
    (history, selectedPrivacy, decimalDigits) => {
        return history.data.map((h) => {
            const type = getTypeData(h.typeCode, history);
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
            const { statusMessage, statusColor } = getStatusData(h);
            return {
                ...h,
                id: h.txId,
                type,
                amountFormated,
                amountFormatedNoClip,
                statusMessage,
                formatType: HISTORY_FORMAT_TYPE.receive,
                symbol: selectedPrivacy.symbol || selectedPrivacy.pSymbol,
                statusColor,
            };
        });
    },
);

export const getHistoryReceiveByTxIdSelector = createSelector(receiveHistoryDataSelector, (history) =>
    memoize((txId: string) => history && history.find((h: TxHistoryReceiveModel) => h.txId === txId)),
);

export const historyBridgeSelector = createSelector(historySelector, (history) => history.brideHistory);

export const historyBridgeDataSelector = createSelector(
    historyBridgeSelector,
    selectedPrivacySelector,
    decimalDigitsSelector,
    (history, selectedPrivacy, decimalDigits) => {
        return history.data.map((h: TxBridgeHistoryModel) => {
            const { status, address, addressType, updatedAt, incognitoAmount, expiredAt, decentralized } = h;
            const depositTmpAddress = addressType === TYPE.SHIELD && address;
            const isShieldTx = !!depositTmpAddress;
            const isDecentralized = decentralized === 1;
            const historyDt = { ...h, isShieldTx, isDecentralized };
            const { statusMessage, statusColor } = getStatusData(historyDt);
            const type = getTypeData(addressType, h);
            const timeFormated = format.formatUnixDateTime(updatedAt);
            const lockTime = new Date(updatedAt).getTime();
            const amountFormated = format.formatAmount({
                originalAmount: new BigNumber(incognitoAmount).toNumber(),
                decimals: selectedPrivacy.pDecimals,
                decimalDigits,
            });
            const amountFormatedNoClip = format.formatAmount({
                originalAmount: new BigNumber(incognitoAmount).toNumber(),
                decimals: selectedPrivacy?.pDecimals,
                decimalDigits,
                clipAmount: false,
            });
            const expiredAtFormated = isDecentralized ? '' : format.formatUnixDateTime(expiredAt);
            const canRetryExpiredDeposit =
                !isDecentralized &&
                addressType === TYPE.SHIELD &&
                STATUS_CODE_SHIELD_CENTRALIZED.TIMED_OUT.includes(status);
            return {
                ...historyDt,
                statusMessage,
                type,
                timeFormated,
                lockTime,
                amountFormated: amountFormated === '0' ? '' : amountFormated,
                amountFormatedNoClip,
                formatType: HISTORY_FORMAT_TYPE.bridge,
                symbol: selectedPrivacy.symbol || selectedPrivacy.pSymbol,
                expiredAtFormated,
                statusColor,
                canRetryExpiredDeposit,
            };
        });
    },
);

export const getHistoryBridgeByIdSelector = createSelector(historyBridgeDataSelector, (history) =>
    memoize((id: string) => history.find((h) => h.id === id)),
);

export const combineHistorySelector = createSelector(
    historyCacheDataSelector,
    receiveHistoryDataSelector,
    historyBridgeDataSelector,
    (cacheHistory, receiveHistory, bridgeHistory) =>
        handleCombineHistory({
            cacheHistory,
            receiveHistory,
            bridgeHistory,
        }),
);
