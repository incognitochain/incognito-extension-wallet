import floor from 'lodash/floor';
import format from 'src/utils/format';
import BigNumber from 'bignumber.js';
import { walletServices } from 'incognito-js/build/web/browser';
import { ISendData, IUserFeesData } from './Send.interface';
import { ISelectedPrivacy } from 'src/module/Token';
import { ISendReducer } from './Send.reducer';
import { COINS } from 'src/constants';
import { IRootState } from 'src/redux/interface';
import { formValueSelector } from 'redux-form';
import { FORM_CONFIGS } from './Send.enhance';

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
  let amountNumber = bnAmount.toNumber();
  if (isUseTokenFee || isNativeToken) {
    const newAmount = bnAmount.minus(totalFee);
    amountNumber = Math.max(newAmount.toNumber(), 0);
  }
  const maxAmount = Math.max(floor(amountNumber), 0);
  const maxAmountText = format.formatAmount({
    originalAmount: maxAmount,
    decimals: pDecimals,
    decimalDigits: false,
    clipAmount: false,
  });
  return {
    maxAmount,
    maxAmountText,
  };
};

export const getSendData: (props: {
  send: ISendReducer;
  selectedPrivacy: ISelectedPrivacy;
  state: IRootState;
}) => ISendData = ({ send, selectedPrivacy, state }) => {
  const {
    actived,
    isFetching,
    totalFeePrv,
    userFeePrv,
    totalFeePrvText,
    totalFeePToken,
    userFeePToken,
    totalFeePTokenText,
    feePrv,
    feePToken,
    screen,
    minAmount,
    minAmountText,
    // isAddressValidated,
    // isValidETHAddress,
    // userFees,
    // types,
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
  const feePDecimals = isUseTokenFee
    ? selectedPrivacy?.pDecimals
    : COINS.PRV.pDecimals;
  const fee = isUseTokenFee ? feePToken : feePrv;
  const userFee = isUseTokenFee ? userFeePToken : userFeePrv;
  const totalFeeText = isUseTokenFee ? totalFeePTokenText : totalFeePrvText;
  const totalFee = isUseTokenFee ? totalFeePToken : totalFeePrv;
  const { maxAmount, maxAmountText } = getMaxAmount({
    selectedPrivacy,
    isUseTokenFee,
    totalFee,
  });
  let titleBtnSubmit =
    screen === 'Send' ? 'Send anonymously' : 'Unshield my crypto';
  if (isFetching) {
    titleBtnSubmit = 'Calculating fee...';
  }
  // const feeText = format.formatAmount({
  //   originalAmount: fee,
  //   decimalDigits: false,
  //   clipAmount: false,
  //   decimals: feePDecimals,
  // });

  const selector = formValueSelector(FORM_CONFIGS.formName);
  const inputAmount = selector(state, FORM_CONFIGS.amount);
  const inputAddress = selector(state, FORM_CONFIGS.toAddress);
  const inputMemo = selector(state, FORM_CONFIGS.memo);
  const isIncognitoAddress =
    walletServices.checkPaymentAddress(inputAddress) ||
    selectedPrivacy.isNativeToken;
  return {
    fee,
    feeUnitByTokenId: actived,
    feePDecimals,

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
  let totalFee, totalFeeText, userFee;
  try {
    const userFees = isUsedPRVFee
      ? userFeesData?.PrivacyFees
      : userFeesData?.TokenFees;
    userFee = new BigNumber(userFees?.Level1 || '');
    if (hasMultiLevel) {
      userFee = new BigNumber(
        fast2x ? userFees?.Level2 || '' : userFees?.Level1 || ''
      );
    }
    totalFee = userFee.plus(feeEst || 0);
    totalFee = floor(totalFee.toNumber());
    totalFeeText = format.formatAmount({
      originalAmount: totalFee,
      decimals,
      clipAmount: false,
      decimalDigits: false,
    });
  } catch (error) {
    throw error;
  }
  return { totalFee, totalFeeText, userFee };
};

export const hasMultiLevelUsersFee = (data: IUserFeesData) =>
  !!data?.PrivacyFees?.Level2 || !!data?.TokenFees?.Level2;
