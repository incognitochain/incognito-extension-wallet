import BigNumber from 'bignumber.js';
import { getDecimalSeparator } from './separator';

export const checkAmount = (amount: number) => {
  if (!Number.isFinite(amount))
    throw new Error('Can not format invalid amount');
};

export const replaceDecimals = ({
  text,
  autoCorrect = false,
}: {
  text: string;
  autoCorrect?: boolean;
}) => {
  const decimalSeparator = getDecimalSeparator();
  if (typeof text !== 'string') {
    return text;
  }
  if (
    decimalSeparator === ',' &&
    !text?.includes?.('e+') &&
    !text?.includes?.('e-')
  ) {
    text = text.replace(/\./g, '_');
    text = text.replace(/,/g, '.');
    text = text.replace(/_/g, ',');
  }
  if (autoCorrect) {
    text = text.replace(/,/g, '');
  }
  return text;
};

interface IHunmanAmount {
  originalAmount?: number;
  decimals: number;
}

export const toHumanAmount: (payload: IHunmanAmount) => number = (payload) => {
  const { originalAmount = 0, decimals } = payload;
  const amount = new BigNumber(originalAmount);
  if (amount.isNaN()) {
    return 0;
  }
  const indexNumber = new BigNumber(10).pow(decimals);
  return amount.dividedBy(indexNumber).toNumber();
};

export const toOriginalAmount = ({
  humanAmount,
  decimals,
  round = true,
}: {
  humanAmount: string;
  decimals: number;
  round?: boolean;
}) => {
  let amount = 0;
  try {
    const amountRepDecimals = replaceDecimals({
      text: humanAmount,
    });
    const bnAmount = new BigNumber(amountRepDecimals);
    if (bnAmount.isNaN()) {
      return 0;
    }
    const indexNumber = new BigNumber(10).pow(decimals || 0).toNumber();
    amount = bnAmount.multipliedBy(new BigNumber(indexNumber)).toNumber();
    if (round) {
      amount = Math.floor(amount);
    }
  } catch (error) {
    amount = 0;
    throw error;
  }
  return amount;
};

const toNumber = ({
  text,
  autoCorrect = false,
}: {
  text: string;
  autoCorrect?: boolean;
}) => {
  const number = replaceDecimals({
    text,
    autoCorrect,
  });
  return new BigNumber(number).toNumber();
};

const toString = ({
  text,
  autoCorrect = false,
}: {
  text: string;
  autoCorrect?: boolean;
}) => {
  const number = replaceDecimals({
    text,
    autoCorrect,
  });
  return new BigNumber(number).toString();
};

const convert = {
  checkAmount,
  replaceDecimals,
  toHumanAmount,
  toOriginalAmount,
  toNumber,
  toString,
};

export default convert;
