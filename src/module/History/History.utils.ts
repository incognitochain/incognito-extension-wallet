import { format } from 'src/utils';
import { BigNumber } from 'bignumber.js';
import { COINS } from 'src/constants';
import isEmpty from 'lodash/isEmpty';
import { COLORS } from 'src/styles';
import { CONSTANT } from 'incognito-js/build/web/browser';
import endsWith from 'lodash/endsWith';
import { TxHistoryReceiveModel, TxCacheHistoryModel, TxBridgeHistoryModel } from './History.interface';

const { HISTORY } = CONSTANT;
const {
    STATUS_CODE_SHIELD_CENTRALIZED,
    STATUS_CODE_SHIELD_DECENTRALIZED,
    STATUS_CODE_UNSHIELD_CENTRALIZED,
    STATUS_CODE_UNSHIELD_DECENTRALIZED,
    TYPE,
    STATUS_TEXT,
} = HISTORY;
const { TX_STATUS } = CONSTANT.TX_CONSTANT;

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
        case TX_STATUS.CONFIRMED:
            statusMessage = 'Pending';
            break;
        case STATUS_TEXT.SUCCESS:
        case TX_STATUS.SUCCESS:
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
                        return HISTORY.TYPE.SEND;
                    }
                }
            }
        } catch (error) {
            throw error;
        }
    }
    return type;
};

export const handleFilterHistoryReceiveByTokenId = ({
    tokenId,
    histories,
    accountSerialNumbers,
}: {
    tokenId: string;
    histories: any[];
    accountSerialNumbers: any[];
}) => {
    let result = histories;
    try {
        result = result
            .filter((history) => {
                const receivedAmounts = history?.ReceivedAmounts;
                const isTokenExisted = Object.keys(receivedAmounts)?.includes(tokenId);
                return isTokenExisted;
            })
            .map((history) => {
                const receivedAmounts = history?.ReceivedAmounts;
                const serialNumbers = history?.InputSerialNumbers[tokenId] || [];
                const metaData = history?.Metadata ? JSON.parse(history?.Metadata) : null;
                let amount = new BigNumber('0');
                let type = getTypeHistoryReceive({ accountSerialNumbers, serialNumbers });
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
                return {
                    txId: history?.Hash,
                    isPrivacy: history?.IsPrivacy,
                    amount: amount.toString(),
                    tokenId,
                    serialNumbers,
                    metaData,
                    privacyCustomTokenProofDetail: history?.PrivacyCustomTokenProofDetail,
                    isMintedToken,
                    typeCode: type,
                    status: TX_STATUS.SUCCESS,
                    isHistoryReceived: true,
                    timeFormated,
                    lockTime: new Date(lockTime).getTime(),
                };
            })
            .filter((history) => !!history.amount && history.typeCode === TYPE.RECEIVE);
    } catch (error) {
        throw error;
    }
    return result;
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
