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

export const toHumanAmount = ({
  originAmount,
  decimals,
}: {
  originAmount: number;
  decimals: number;
}) => {
  try {
    const amount = toNumber(originAmount);
    checkAmount(amount);
    const decision_rate = Number(decimals) ? 10 ** Number(decimals) : 1;
    return amount / decision_rate;
  } catch {
    return originAmount;
  }
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
  try {
    const amountRepDecimals = replaceDecimals({
      text: humanAmount,
      decimalSeparator,
    });
    const amount = toNumber(amountRepDecimals);
    checkAmount(amount);
    const decision_rate = Number(decimals) ? 10 ** Number(decimals) : 1;
    if (round) {
      return Math.floor(
        new BigNumber(amount)
          .multipliedBy(new BigNumber(decision_rate))
          .toNumber()
      );
    }
    return new BigNumber(amount)
      .multipliedBy(new BigNumber(decision_rate))
      .toNumber();
  } catch (error) {
    throw error;
  }
};

const convert = {
  checkAmount,
  replaceDecimals,
  toHumanAmount,
  toOriginalAmount,
};

export default convert;
