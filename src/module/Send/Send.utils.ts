import { ERROR_MESSAGE, ERROR_CODE } from 'src/constants/error';
import floor from 'lodash/floor';
import format from 'src/utils/format';
import isEmpty from 'lodash/isEmpty';
import toString from 'lodash/toString';
import trim from 'lodash/trim';
import BigNumber from 'bignumber.js';
import { keyServices } from 'incognito-js/build/web/browser';
import { ISelectedPrivacy } from 'src/module/Token';
import { COINS } from 'src/constants';
import { IRootState } from 'src/redux/interface';
import { formValueSelector, isSubmitting, isValid } from 'redux-form';
import convert from 'src/utils/convert';
import { FORM_CONFIGS } from './Send.constant';
import { IUserFeesData, ISendReducer } from './Send.interface';

export const DEFAULT_FEE_PER_KB_HUMAN_AMOUNT = 0.000000001; // in nano
export const DEFAULT_FEE_PER_KB = DEFAULT_FEE_PER_KB_HUMAN_AMOUNT * 1e9; // in nano
export const MAX_TX_SIZE = 100;
export const MAX_FEE_PER_TX = DEFAULT_FEE_PER_KB * MAX_TX_SIZE;

export const getMaxAmount = ({
    selectedPrivacy,
    isUseTokenFee,
    totalFee,
}: {
    selectedPrivacy: ISelectedPrivacy;
    isUseTokenFee: boolean;
    totalFee: number;
}) => {
    const { amount, isNativeToken, pDecimals } = selectedPrivacy;
    let bnAmount = new BigNumber(amount);
    const bnTotalFee = new BigNumber(totalFee);
    if (isUseTokenFee || isNativeToken) {
        bnAmount = bnAmount.minus(bnTotalFee);
    }
    const maxAmount = Math.max(bnAmount.toNumber(), 0);
    const maxAmountText = format.toFixed({
        number: convert.toHumanAmount({
            originalAmount: maxAmount,
            decimals: pDecimals,
        }),
        decimals: pDecimals,
    });
    return {
        maxAmount,
        maxAmountText,
    };
};

export const getTotalFee = ({
    fast2x = false,
    userFeesData,
    feeEst,
    decimals,
    isUsedPRVFee,
    hasMultiLevel,
}: {
    fast2x?: boolean;
    userFeesData?: IUserFeesData;
    feeEst?: number;
    decimals: number;
    isUsedPRVFee: boolean;
    hasMultiLevel: boolean;
}) => {
    let totalFee;
    let totalFeeText;
    let userFee;
    try {
        const userFees = isUsedPRVFee ? userFeesData?.PrivacyFees : userFeesData?.TokenFees;
        userFee = new BigNumber(userFees?.Level1 || '');
        if (hasMultiLevel) {
            userFee = new BigNumber(fast2x ? userFees?.Level2 || '' : userFees?.Level1 || '');
        }
        totalFee = userFee.plus(feeEst || 0);
        totalFee = floor(totalFee.toNumber());
        totalFeeText = format.toFixed({
            number: convert.toHumanAmount({
                originalAmount: totalFee,
                decimals,
            }),
            decimals,
        });
    } catch (error) {
        throw error;
    }
    return { totalFee, totalFeeText, userFee: userFee.toString() };
};

export const getSendData = ({
    send,
    selectedPrivacy,
    state,
}: {
    send: ISendReducer;
    selectedPrivacy: ISelectedPrivacy;
    state: IRootState;
}) => {
    const {
        actived,
        isFetching,
        isFetched,
        totalFeePrv,
        totalFeePrvText,
        totalFeePToken,
        userFeePrv,
        userFeePToken,
        totalFeePTokenText,
        feePrv,
        feePToken,
        screen,
        minAmount,
        minAmountText,
        isAddressValidated,
        maxFeePToken,
        maxFeePrv,
        userFees,
        maxFeePTokenText,
        maxFeePrvText,
        rate,
        fast2x,
    } = send;
    const isUseTokenFee = actived !== COINS.PRV.id;
    const isUsedPRVFee = !isUseTokenFee;
    const isUnShield = screen === 'UnShield';
    const isSend = screen === 'Send';
    const hasMultiLevel = userFees?.hasMultiLevel && isUnShield;
    const feeSymbol = isUseTokenFee ? selectedPrivacy?.symbol || selectedPrivacy.pSymbol : COINS.PRV.symbol;
    const feePDecimals = isUseTokenFee ? selectedPrivacy?.pDecimals : COINS.PRV.pDecimals;
    const fee = isUseTokenFee ? feePToken : feePrv;
    const feeText = format.toFixed({
        number: convert.toHumanAmount({ originalAmount: fee, decimals: feePDecimals }),
        decimals: feePDecimals,
    });
    const symbol = selectedPrivacy.symbol || selectedPrivacy.pSymbol;
    let userFee = isUseTokenFee ? userFeePToken : userFeePrv;
    let originalFee: any = new BigNumber(fee).dividedBy(rate).toNumber();
    originalFee = floor(originalFee);
    originalFee = new BigNumber(originalFee).toString();
    let totalFeeText = isUseTokenFee ? totalFeePTokenText : totalFeePrvText;
    let totalFee = isUseTokenFee ? totalFeePToken : totalFeePrv;
    if (isUnShield && isFetched) {
        const { totalFee: _totalFee, totalFeeText: _totalFeeText, userFee: _userFee } = getTotalFee({
            fast2x,
            userFeesData: userFees?.data,
            feeEst: fee,
            decimals: feePDecimals,
            isUsedPRVFee,
            hasMultiLevel,
        });
        totalFee = _totalFee;
        totalFeeText = _totalFeeText;
        userFee = _userFee;
    }
    const { maxAmount, maxAmountText } = getMaxAmount({
        selectedPrivacy,
        isUseTokenFee,
        totalFee,
    });
    const maxFee = isUseTokenFee ? maxFeePToken : maxFeePrv;
    const maxFeeText = isUseTokenFee ? maxFeePTokenText : maxFeePrvText;
    const errorMessage = !isFetching && isFetched && totalFee > maxFee ? ERROR_MESSAGE.INSUFFICIENT_BALANCE : '';
    const selector = formValueSelector(FORM_CONFIGS.formName);
    const inputAmount = selector(state, FORM_CONFIGS.amount);
    const inputAddress = selector(state, FORM_CONFIGS.toAddress);
    const inputMemo = selector(state, FORM_CONFIGS.memo);
    const valid = isValid(FORM_CONFIGS.formName)(state);
    const submitting = isSubmitting(FORM_CONFIGS.formName)(state);
    const originalAmount = convert.toOriginalAmount({
        humanAmount: inputAmount,
        decimals: selectedPrivacy.pDecimals,
    });
    const bnAmount = new BigNumber(originalAmount);
    const requestedAmount = convert.toString({ text: inputAmount });
    const incognitoAmount = bnAmount.toString();
    const paymentAddress = trim(inputAddress);
    const memo = inputMemo;
    let titleBtnSubmit = screen === 'Send' ? 'Send anonymously' : 'Unshield my crypto';
    let forceSendTitleBtnSubmit = screen === 'Send' ? 'Confirm' : 'Unshield my crypto';
    if (isFetching) {
        titleBtnSubmit = 'Calculating fee...';
        forceSendTitleBtnSubmit = 'Calculating fee...';
    }
    if (!isFetching && submitting) {
        titleBtnSubmit = `Sending...`;
        forceSendTitleBtnSubmit = `Sending...`;
    }
    const isIncognitoAddress = isEmpty(inputAddress)
        ? false
        : keyServices.checkPaymentAddress(inputAddress) || selectedPrivacy.isNativeToken;
    const isExternalAddress = isEmpty(inputAddress) ? false : !isIncognitoAddress && selectedPrivacy.isWithdrawable;
    const disabledForm = !valid || submitting || !fee || isFetching || !isAddressValidated;
    const userFeeSelection = isUsedPRVFee ? 2 : 1;
    const userFeeLevel = fast2x ? 2 : 1;
    const nativeFee = isUsedPRVFee ? originalFee : '';
    const privacyFee = isUseTokenFee ? originalFee : '';
    const amountFormatedNoClip = format.formatAmount({
        originalAmount: bnAmount.toNumber(),
        decimals: selectedPrivacy.pDecimals,
        clipAmount: false,
    });
    const totalFeeFormatedNoClip = format.formatAmount({
        originalAmount: totalFee,
        decimals: feePDecimals,
        clipAmount: false,
    });
    return {
        feePrv,
        feePToken,
        fee,
        feeText,
        feeUnitByTokenId: actived,
        feePDecimals,
        feeSymbol,
        totalFee,
        totalFeeText,
        maxFee,
        maxFeeText,
        errorMessage,
        minAmount,
        minAmountText,
        maxAmount,
        maxAmountText,
        isUsedPRVFee,
        isUseTokenFee,
        isUnShield,
        isSend,
        hasMultiLevel,
        inputAmount,
        inputAddress,
        inputMemo,
        titleBtnSubmit,
        forceSendTitleBtnSubmit,
        disabledForm,
        isIncognitoAddress,
        isExternalAddress,
        userFee,
        originalFee,
        nativeFee,
        privacyFee,
        requestedAmount,
        incognitoAmount,
        paymentAddress,
        memo,
        userFeeLevel,
        userFeeSelection,
        symbol,
        amountFormatedNoClip,
        totalFeeFormatedNoClip,
    };
};

export const hasMultiLevelUsersFee = (data: IUserFeesData) => !!data?.PrivacyFees?.Level2 || !!data?.TokenFees?.Level2;

export const removeAllSpace = (str: string) => {
    if (isEmpty(str)) return str;
    return str.replace(/\s/g, '');
};

export const standardizedAddress = (address: string) => {
    if (!address) {
        return '';
    }
    const indexParams = address?.indexOf('?');
    let newAddress = address;
    if (indexParams !== -1) {
        newAddress = address.substring(0, indexParams);
    }
    return removeAllSpace(newAddress);
};

export const getErrorMsgSend = (error: any) => {
    if (error?.code || error?.Code || error?.response?.data?.Code) {
        const code = error?.code || toString(error?.Code) || toString(error?.response?.data?.Code);
        const message = ERROR_CODE[code] || ERROR_CODE.DEFAULT;
        return `${message} ERROR_CODE(${code})`;
    }
    if (error instanceof Error) {
        return error?.message || '';
    }
};
