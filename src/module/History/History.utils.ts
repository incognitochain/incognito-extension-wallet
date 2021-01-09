import { format } from 'src/utils';
import { BigNumber } from 'bignumber.js';
import { COINS } from 'src/constants';
import isEmpty from 'lodash/isEmpty';
import { COLORS } from 'src/styles';
import { CONSTANT, TxHistoryModelParam } from 'incognito-js/build/web/browser';
import endsWith from 'lodash/endsWith';
import toString from 'lodash/toString';
import { TxHistoryReceiveModel, TxCacheHistoryModel, TxBridgeHistoryModel } from './History.interface';
import { ISelectedPrivacy } from '../Token';
import { HISTORY_FORMAT_TYPE } from './History.constant';

const { HISTORY } = CONSTANT;
const {
    STATUS_CODE_SHIELD_CENTRALIZED,
    STATUS_CODE_SHIELD_DECENTRALIZED,
    STATUS_CODE_UNSHIELD_CENTRALIZED,
    STATUS_CODE_UNSHIELD_DECENTRALIZED,
    TYPE,
    STATUS_TEXT,
} = HISTORY;
const { TX_STATUS, HISTORY_TYPE } = CONSTANT.TX_CONSTANT;

const getStatusDataShield = (history: TxBridgeHistoryModel) => {
    const { status, statusMessage } = history;
    let statusColor = '';
    if (history?.isDecentralized) {
        if (STATUS_CODE_SHIELD_DECENTRALIZED.COMPLETE === status) {
            statusColor = COLORS.green;
        } else {
            statusColor = COLORS.colorGreyBold;
        }
    } else if (STATUS_CODE_SHIELD_CENTRALIZED.COMPLETE.includes(status)) {
        statusColor = COLORS.green;
    } else {
        statusColor = COLORS.colorGreyBold;
    }
    return { statusColor, statusMessage };
};

const getStatusDataUnShield = (history: any) => {
    const { statusCode, statusMessage } = history;
    let statusColor;
    if (history?.isDecentralized) {
        if (STATUS_CODE_UNSHIELD_DECENTRALIZED.COMPLETE === statusCode) {
            statusColor = COLORS.green;
        } else {
            statusColor = COLORS.colorGreyBold;
        }
    } else if (STATUS_CODE_UNSHIELD_CENTRALIZED.COMPLETE === statusCode) {
        statusColor = COLORS.green;
    } else {
        statusColor = COLORS.colorGreyBold;
    }
    return { statusColor, statusMessage };
};

export const getStatusData = (history: any) => {
    const { status } = history;
    if (history?.isShieldTx) {
        const statusData = getStatusDataShield(history);
        return statusData;
    }
    if (history?.isUnshieldTx) {
        const statusData = getStatusDataUnShield(history);
        return statusData;
    }
    let statusMessage = '';
    let statusColor = '';
    switch (status) {
        case STATUS_TEXT.PENDING:
        case TX_STATUS.SUCCESS:
            statusMessage = 'Pending';
            break;
        case STATUS_TEXT.SUCCESS:
        case TX_STATUS.CONFIRMED:
            statusMessage = 'Complete';
            statusColor = COLORS.green;
            break;
        case STATUS_TEXT.FAILED:
        case TX_STATUS.FAILED:
            statusMessage = 'Failed';
            break;
        case STATUS_TEXT.EXPIRED:
            statusMessage = 'Expired';
            break;
        default:
            statusMessage = '';
            statusColor = COLORS.colorGreyBold;
    }
    return {
        statusMessage,
        statusColor,
    };
};

export const getTypeData = (type: number | undefined, history: any, paymentAddress?: string) => {
    let typeText = '';
    if (!type) {
        return typeText;
    }
    switch (type) {
        case TYPE.SHIELD:
            typeText = history?.address ? 'Shield' : 'Receive';
            break;
        case TYPE.SEND: {
            const metaData: any = HISTORY.META_DATA_TYPE;
            const isUTXO = history?.memo === 'Defragment' && history?.toAddress === paymentAddress;
            typeText = isUTXO ? 'Consolidation' : metaData[history?.metaDataType] || 'Send';
            if (typeText === HISTORY.META_DATA_TYPE[90]) {
                typeText = 'Send';
            }
            break;
        }
        case TYPE.RECEIVE: {
            typeText = 'Receive';
            break;
        }
        default:
            break;
    }
    return typeText;
};

export const getTypeHistoryReceive = ({
    accountSerialNumbers,
    serialNumbers,
}: {
    accountSerialNumbers: any[];
    serialNumbers: any[];
}) => {
    let type = TYPE.RECEIVE;
    if (!serialNumbers) {
        return type;
    }
    if (serialNumbers) {
        try {
            for (let key in accountSerialNumbers) {
                if (Object.prototype.hasOwnProperty.call(accountSerialNumbers, key)) {
                    const accountSerialNumber = accountSerialNumbers[key];
                    const isExisted = serialNumbers?.includes(accountSerialNumber);
                    if (isExisted) {
                        return TYPE.SEND;
                    }
                }
            }
        } catch (error) {
            throw error;
        }
    }
    return type;
};

export const filterCacheByReceive = (cacheHistory: TxCacheHistoryModel[], receiveHistory: TxHistoryReceiveModel[]) => {
    let _cacheHistory = [...cacheHistory];
    try {
        receiveHistory.map((h) => {
            const metaData = h?.metaData;
            const typeOf = metaData?.Type;
            let txId = '';
            switch (typeOf) {
                case 45: // Node withdraw
                    txId = metaData?.TxRequest;
                    break;
                case 94: // Remove liquidity
                    txId = metaData?.RequestedTxID;
                    break;
                default:
                    break;
            }
            if (!typeOf && h?.isMintedToken) {
                txId = h.txId;
            }
            if (txId) {
                _cacheHistory = [..._cacheHistory.filter((ch) => ch?.txId !== txId)];
            }
            return h;
        });
    } catch (error) {
        console.debug(error);
    }
    return _cacheHistory;
};

export const filterReceiveByBridge = (
    receiveHistory: TxHistoryReceiveModel[],
    bridgeHistory: TxBridgeHistoryModel[],
) => {
    let _receiveHistory = [...receiveHistory];
    try {
        _receiveHistory = _receiveHistory.filter((h: TxHistoryReceiveModel) => {
            const metaData = h?.metaData;
            const typeOf = metaData?.Type;
            switch (typeOf) {
                case 25:
                case 81: {
                    const requestTxId = metaData?.RequestedTxID;
                    const tx = bridgeHistory.find((bh) => bh.incognitoTx === requestTxId);
                    if (tx) {
                        return false;
                    }
                    break;
                }
                default:
                    break;
            }
            return true;
        });
    } catch (error) {
        console.debug(error);
    }
    return _receiveHistory;
};

export const handleCombineHistory = ({
    cacheHistory,
    receiveHistory,
    bridgeHistory,
}: {
    cacheHistory: TxCacheHistoryModel[];
    receiveHistory: TxHistoryReceiveModel[];
    bridgeHistory: TxBridgeHistoryModel[];
}) => {
    const _cacheHistory = filterCacheByReceive(cacheHistory, receiveHistory);
    const _receiveHistory = filterReceiveByBridge(receiveHistory, bridgeHistory);
    const combineHistory = [..._cacheHistory, ..._receiveHistory, ...bridgeHistory];
    return combineHistory.map((h: TxCacheHistoryModel | TxHistoryReceiveModel | TxBridgeHistoryModel) => ({
        id: h.id,
        type: h.type,
        amountFormated: h.amountFormated,
        timeFormated: h.timeFormated,
        statusMessage: h.statusMessage,
        formatType: h.formatType,
        lockTime: h.lockTime,
    }));
};

// Get history details

export const getHistoryCacheData = ({
    history,
    selectedPrivacy,
    decimalDigits,
}: {
    selectedPrivacy: ISelectedPrivacy;
    history: TxHistoryModelParam;
    decimalDigits: boolean;
}) => {
    const { historyType, nativeTokenInfo, privacyTokenInfo, memo = '' } = history;
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
        memo,
    };
    return historyItem;
};

export const getHistoryReceiveData = ({
    selectedPrivacy,
    history,
    accountSerialNumbers,
    decimalDigits,
}: {
    selectedPrivacy: ISelectedPrivacy;
    history: any;
    accountSerialNumbers: any[];
    decimalDigits: boolean;
}) => {
    try {
        const { tokenId } = selectedPrivacy;
        const receivedAmounts = history?.ReceivedAmounts;
        const serialNumbers = history?.InputSerialNumbers[tokenId] || [];
        const metaData = history?.Metadata ? JSON.parse(history?.Metadata) : null;
        let amount = new BigNumber('0');
        let typeCode = getTypeHistoryReceive({ accountSerialNumbers, serialNumbers });
        let hasOutputs = false;
        let hasInputs = !isEmpty(serialNumbers[tokenId]);
        try {
            for (let id in receivedAmounts) {
                if (id === tokenId) {
                    const item = receivedAmounts[id][0];
                    amount = new BigNumber(item?.CoinDetails?.Value);
                    id !== COINS.PRV.id ? (hasOutputs = true) : false;
                    break;
                }
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.debug('ERROR', error);
        }
        const isMintedToken = !hasInputs && !!hasOutputs;
        const lockTime = endsWith(history?.LockTime, 'Z') ? history?.LockTime : `${history?.LockTime}Z`;
        const timeFormated = format.formatUnixDateTime(lockTime);
        const type = getTypeData(typeCode, history);
        const amountFormated = format.formatAmount({
            originalAmount: amount.toNumber(),
            decimals: selectedPrivacy?.pDecimals,
            decimalDigits,
        });
        const amountFormatedNoClip = format.formatAmount({
            originalAmount: amount.toNumber(),
            decimals: selectedPrivacy?.pDecimals,
            decimalDigits,
            clipAmount: false,
        });
        const { statusMessage, statusColor } = getStatusData({ status: TX_STATUS.CONFIRMED });
        return {
            id: history?.Hash,
            txId: history?.Hash,
            isPrivacy: history?.IsPrivacy,
            amount: amount.toString(),
            tokenId,
            serialNumbers,
            metaData,
            privacyCustomTokenProofDetail: history?.PrivacyCustomTokenProofDetail,
            isMintedToken,
            type,
            status: TX_STATUS.CONFIRMED,
            typeCode,
            lockTime: new Date(lockTime).getTime(),
            amountFormated,
            amountFormatedNoClip,
            timeFormated,
            statusMessage,
            formatType: HISTORY_FORMAT_TYPE.receive,
            symbol: selectedPrivacy.symbol || selectedPrivacy.pSymbol,
            statusColor,
            memo: history?.Info,
        };
    } catch (error) {
        console.debug(`ERROR`, error);
        throw error;
    }
};

export const getHistoryBridgeData = ({
    selectedPrivacy,
    history,
    decimalDigits,
}: {
    selectedPrivacy: ISelectedPrivacy;
    history: any;
    decimalDigits: boolean;
}) => {
    try {
        const {
            status,
            address,
            addressType,
            createdAt,
            incognitoAmount,
            expiredAt,
            decentralized,
            statusMessage,
        } = history;
        const depositTmpAddress = addressType === TYPE.SHIELD && address;
        const isShieldTx = !!depositTmpAddress;
        const isDecentralized = decentralized === 1;
        const { statusColor } = getStatusData({
            isShieldTx,
            isDecentralized,
            status,
        });
        const type = getTypeData(addressType, history);
        const timeFormated = format.formatUnixDateTime(createdAt);
        const lockTime = new Date(createdAt).getTime();
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
        const canRetryExpiredShield =
            !isDecentralized &&
            addressType === TYPE.SHIELD &&
            STATUS_CODE_SHIELD_CENTRALIZED.TIMED_OUT.includes(status);
        const canRemoveExpiredOrPendingShield =
            addressType === TYPE.SHIELD &&
            (STATUS_CODE_SHIELD_CENTRALIZED.PENDING === status ||
                STATUS_CODE_SHIELD_CENTRALIZED.TIMED_OUT.includes(status) ||
                STATUS_CODE_SHIELD_DECENTRALIZED.PENDING === status ||
                STATUS_CODE_SHIELD_DECENTRALIZED.TIMED_OUT === status);
        return {
            ...history,
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
            canRetryExpiredShield,
            canRemoveExpiredOrPendingShield,
        };
    } catch (error) {
        throw error;
    }
};
