import BigNumber from 'bignumber.js';
import toNumber from 'lodash/toNumber';

export const checkAmount = (amount: number) => {
  if (!Number.isFinite(amount))
    throw new Error('Can not format invalid amount');
};

export const replaceDecimals = ({
  text,
  autoCorrect = false,
  decimalSeparator,
}: {
  text: string;
  autoCorrect?: boolean;
  decimalSeparator: string;
}) => {
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
  originAmount: number;
  decimals: number;
}

export const toHumanAmount: (payload: IHunmanAmount) => number = (
  payload: IHunmanAmount
) => {
  const { originAmount, decimals } = payload;
  const amount = new BigNumber(originAmount);
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
  decimalSeparator,
}: {
  humanAmount: string;
  decimals: number;
  round?: boolean;
  decimalSeparator: string;
}) => {
  let amount = 0;
  try {
    const amountRepDecimals = replaceDecimals({
      text: humanAmount,
      decimalSeparator,
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

const convert = {
  checkAmount,
  replaceDecimals,
  toHumanAmount,
  toOriginalAmount,
};

export default convert;
