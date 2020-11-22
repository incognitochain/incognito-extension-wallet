import { BigNumber } from 'bignumber.js';
import convert from './convert';
import floor from 'lodash/floor';
import { CONSTANT_COMMONS } from 'src/constants';
import { toNumber } from 'lodash';
interface IAmount {
  amount: number;
  decimals: number;
  clipAmount?: boolean;
  decimalDigits?: boolean;
  decimalSeparator: string;
  groupSeparator: string;
  maxDigits?: number;
}

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
  amount: number;
}

export const getMaxDecimalDigits: (
  payload: IMaxDigits
) => {
  maxDigits: number;
  humanAmount: number;
} = (payload: IMaxDigits) => {
  const { decimals, decimalDigits = true, clipAmount = true, amount } = payload;
  let maxDigits = decimals;
  let humanAmount = 0;
  try {
    humanAmount = convert.toHumanAmount({
      originAmount: amount,
      decimals,
    });
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
      if (decimals) {
        humanAmount = floor(humanAmount, Math.min(decimals, maxDigits));
      } else {
        humanAmount = floor(humanAmount, maxDigits);
      }
    }
  } catch (error) {
    maxDigits = decimals;
    humanAmount = 0;
    throw error;
  }
  return {
    maxDigits,
    humanAmount,
  };
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
    amount,
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
    const { maxDigits, humanAmount } = getMaxDecimalDigits({
      amount,
      clipAmount,
      decimalDigits,
      decimals,
    });
    const fixedString = toFixed({
      number: humanAmount,
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

const format = {
  formatAmount,
};

export default format;
