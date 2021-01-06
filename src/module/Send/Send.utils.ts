import floor from 'lodash/floor';
import format from 'src/utils/format';
import BigNumber from 'bignumber.js';
import { keyServices } from 'incognito-js/build/web/browser';
import { ISelectedPrivacy } from 'src/module/Token';
import { COINS } from 'src/constants';
import { IRootState } from 'src/redux/interface';
import { formValueSelector, isSubmitting, isValid } from 'redux-form';
import { isEmpty } from 'lodash';
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
        totalFeePrv,
        // userFeePrv,
        totalFeePrvText,
        totalFeePToken,
        // userFeePToken,
        totalFeePTokenText,
        feePrv,
        feePToken,
        screen,
        minAmount,
        minAmountText,
        isAddressValidated,
        isValidETHAddress,
        // userFees,
        // fast2x,
        // feePrvText,
        // feePTokenText,
        // minFeePTokenText,
        // minFeePrvText,
        // maxFeePTokenText,
        // maxFeePrvText,
        // amountText,
        // rate,
    } = send;
    // const { amount } = selectedPrivacy;
    const isUseTokenFee = actived !== COINS.PRV.id;
    // const feeUnit = isUseTokenFee
    //   ? selectedPrivacy?.symbol || selectedPrivacy.pSymbol
    //   : COINS.PRV.symbol;
    const feePDecimals = isUseTokenFee ? selectedPrivacy?.pDecimals : COINS.PRV.pDecimals;
    const fee = isUseTokenFee ? feePToken : feePrv;
    const feeText = format.toFixed({
        number: convert.toHumanAmount({ originalAmount: fee, decimals: feePDecimals }),
        decimals: feePDecimals,
    });
    // const userFee = isUseTokenFee ? userFeePToken : userFeePrv;
    const totalFeeText = isUseTokenFee ? totalFeePTokenText : totalFeePrvText;
    const totalFee = isUseTokenFee ? totalFeePToken : totalFeePrv;
    const { maxAmount, maxAmountText } = getMaxAmount({
        selectedPrivacy,
        isUseTokenFee,
        totalFee,
    });
    const selector = formValueSelector(FORM_CONFIGS.formName);
    const inputAmount = selector(state, FORM_CONFIGS.amount);
    const inputAddress = selector(state, FORM_CONFIGS.toAddress);
    const inputMemo = selector(state, FORM_CONFIGS.memo);
    const valid = isValid(FORM_CONFIGS.formName)(state);
    const submitting = isSubmitting(FORM_CONFIGS.formName)(state);
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
    const disabledForm = !valid || submitting || !fee || isFetching || !isAddressValidated || !isValidETHAddress;
    return {
        fee,
        feeText,
        feeUnitByTokenId: actived,
        feePDecimals,

        totalFee,
        totalFeeText,

        minAmount,
        minAmountText,

        maxAmount,
        maxAmountText,

        isUsedPRVFee: !isUseTokenFee,
        isUseTokenFee,

        isUnShield: screen === 'UnShield',
        isSend: screen === 'Send',

        // hasMultiLevel: userFees?.hasMultiLevel,

        isIncognitoAddress,

        inputAmount,
        inputAddress,
        inputMemo,

        titleBtnSubmit,
        forceSendTitleBtnSubmit,

        disabledForm,

        // amount,
        // isUseTokenFee,
        // feeUnit,
        // feePDecimals,
        // userFee,

        // totalFee,
        // totalFeeText,

        // minAmount,
        // minAmountText,
        // maxAmount,
        // maxAmountText,

        // fee,
        // titleBtnSubmit,
        // feeText,

        // isETH,
        // isBTC,

        // fee,
        // feeText,
        // feeUnit,
        // feeUnitByTokenId: actived,
        // feePDecimals,
        // minFee: isUseTokenFee ? minFeePTokenText : minFeePrvText,
        // maxFee: isUseTokenFee ? maxFeePTokenText : maxFeePrvText,
        // amount,
        // amountText,
        // screen,
        // rate,

        // maxAmount,
        // maxAmountText,

        // pDecimals: selectedPrivacy?.pDecimals,
        // titleBtnSubmit,

        // isAddressValidated,
        // isValidETHAddress,
        // isETH,
        // userFees,
        // userFee,
        // totalFee,
        // totalFeeText,
        // types,
        // actived,
        // fast2x,
        // feePrv,
        // feePToken,
        // feePrvText,
        // feePTokenText,
        // isBTC,
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
    return { totalFee, totalFeeText, userFee };
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
