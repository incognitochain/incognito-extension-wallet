import { BigNumber } from 'bignumber.js';
import convert from './convert';
import floor from 'lodash/floor';
import moment from 'moment';
interface IAmount {
  originalAmount?: number;
  humanAmount?: number;
  decimals: number;
  clipAmount?: boolean;
  decimalDigits?: boolean;
  decimalSeparator: string;
  groupSeparator: string;
  maxDigits?: number;
}

interface IAmountFromHunman {}

export const removeTrailingZeroes = ({
  amountString,
  decimalSeparator,
}: {
  amountString: string;
  decimalSeparator: string;
}) => {
  let formattedString = amountString;
  while (
    formattedString.length > 0 &&
    ((formattedString.includes(decimalSeparator) &&
      formattedString[formattedString.length - 1] === '0') ||
      formattedString[formattedString.length - 1] === decimalSeparator)
  ) {
    formattedString = formattedString.slice(0, formattedString.length - 1);
  }

  return formattedString;
};

interface IMaxDigits {
  decimalDigits?: boolean;
  clipAmount?: boolean;
  decimals: number;
  humanAmount: number;
}

export const getMaxDecimalDigits: (payload: IMaxDigits) => number = (
  payload: IMaxDigits
) => {
  const {
    decimals,
    decimalDigits = true,
    clipAmount = true,
    humanAmount,
  } = payload;
  let maxDigits = decimals;
  try {
    if (clipAmount) {
      if (humanAmount > 0 && humanAmount < 1 && !!decimalDigits) {
        maxDigits = 5;
      }
      if (humanAmount > 1) {
        maxDigits = 4;
      }
      if (humanAmount > 1e3) {
        maxDigits = 2;
      }
      if (humanAmount > 1e5) {
        maxDigits = 0;
      }
    }
  } catch (error) {
    maxDigits = decimals;
    throw error;
  }
  return maxDigits;
};

interface IToFixed {
  number: number;
  decimals: number;
  decimalSeparator: string;
}

export const toFixed: (payload: IToFixed) => string = (payload: IToFixed) => {
  const { number, decimals, decimalSeparator } = payload;
  const bigNumber = new BigNumber(number);
  if (bigNumber.isNaN()) {
    return '0';
  }
  return bigNumber.toFixed(decimals).replace('.', decimalSeparator);
};

export const formatAmount: (payload: IAmount) => string = (
  payload: IAmount
) => {
  const {
    originalAmount,
    humanAmount,
    decimals,
    decimalSeparator,
    groupSeparator,
    clipAmount = true,
    decimalDigits = true,
  } = payload;
  const fmt = {
    decimalSeparator,
    groupSeparator,
    groupSize: 3,
  };
  let formatAmount;
  try {
    const convertHumanAmount =
      humanAmount ||
      convert.toHumanAmount({
        originalAmount,
        decimals,
      });
    const maxDigits = getMaxDecimalDigits({
      clipAmount,
      decimalDigits,
      decimals,
      humanAmount: convertHumanAmount,
    });
    let fixedNumber = convertHumanAmount;
    if (decimals) {
      fixedNumber = floor(convertHumanAmount, Math.min(decimals, maxDigits));
    } else {
      fixedNumber = floor(convertHumanAmount, maxDigits);
    }
    const fixedString = toFixed({
      number: fixedNumber,
      decimals,
      decimalSeparator,
    });
    const amountString = new BigNumber(fixedString).toFormat(
      maxDigits,
      BigNumber.ROUND_DOWN,
      fmt
    );
    formatAmount = removeTrailingZeroes({
      amountString,
      decimalSeparator,
    });
  } catch (error) {
    formatAmount = '0';
    throw error;
  }
  return formatAmount;
};

export const formatUnixDateTime = (
  dateTime: number,
  formatPattern = 'MMM DD YYYY, HH:mm'
) => moment.unix(dateTime).format(formatPattern);

export const formatAmountFromHunman: (payload: IAmountFromHunman) => string = (
  payload
) => {
  return '';
};

const format = {
  formatAmount,
  formatUnixDateTime,
};

export default format;
