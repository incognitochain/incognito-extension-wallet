import { COLORS } from 'src/styles';
import { CONSTANT } from 'incognito-js/build/web/browser';

const { HISTORY } = CONSTANT;
const { TX_STATUS } = CONSTANT.TX_CONSTANT;
const { HISTORY_TYPE } = CONSTANT.TX_CONSTANT;

const getStatusDataShield = (history: any) => {
    const { statusCode, statusMessage } = history;
    let statusColor;
    const { STATUS_CODE_SHIELD_CENTRALIZED, STATUS_CODE_SHIELD_DECENTRALIZED } = HISTORY;
    if (history?.isDecentralized) {
        if (STATUS_CODE_SHIELD_DECENTRALIZED.COMPLETE === statusCode) {
            statusColor = COLORS.green;
        } else {
            statusColor = COLORS.colorGreyBold;
        }
    } else if (STATUS_CODE_SHIELD_CENTRALIZED.COMPLETE.includes(statusCode)) {
        statusColor = COLORS.green;
    } else {
        statusColor = COLORS.colorGreyBold;
    }
    return { statusColor, statusMessage };
};

const getStatusDataUnShield = (history: any) => {
    const { statusCode, statusMessage } = history;
    const { STATUS_CODE_UNSHIELD_CENTRALIZED, STATUS_CODE_UNSHIELD_DECENTRALIZED } = HISTORY;
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
    let statusMessage;
    let statusColor;
    switch (status) {
        case HISTORY.STATUS_TEXT.PENDING:
        case TX_STATUS.CONFIRMED:
            statusMessage = 'Pending';
            break;
        case HISTORY.STATUS_TEXT.SUCCESS:
        case TX_STATUS.SUCCESS:
            statusMessage = 'Complete';
            statusColor = COLORS.green;
            break;
        case HISTORY.STATUS_TEXT.FAILED:
        case TX_STATUS.FAILED:
            statusMessage = 'Failed';
            break;
        case HISTORY.STATUS_TEXT.EXPIRED:
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

export const getTypeData = (type: number, history: any, paymentAddress: string) => {
    let typeText = '';
    switch (type) {
        case HISTORY_TYPE.SEND_NATIVE_TOKEN:
        case HISTORY_TYPE.SEND_PRIVACY_TOKEN: {
            const metaData: any = HISTORY.META_DATA_TYPE;
            const isUTXO = history?.memo === 'Defragment' && history?.toAddress === paymentAddress;
            typeText = isUTXO ? 'Consolidation' : metaData[history?.metaDataType] || 'Send';
            if (typeText === HISTORY.META_DATA_TYPE[90]) {
                typeText = 'Send';
            }
            break;
        }
        default:
            break;
    }
    return typeText;
};
