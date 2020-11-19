// import moment from 'moment';
// import _ from 'lodash';
// import { CONSTANT_COMMONS } from '@src/constants';
import { BigNumber } from 'bignumber.js';
// import {
//   getDecimalSeparator,
//   getGroupSeparator,
// } from '@src/resources/separator';
import convert from './convert';
import floor from 'lodash/floor';
import { CONSTANT_COMMONS } from 'src/constants';

// export const SHORT_DATE_TIME_FORMAT = 'DD MMM hh:mm A';
// export const LONG_DATE_TIME_FORMAT = 'DD MMM YYYY hh:mm A';

const removeTrailingZeroes = ({
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

const amountCreator = (maxDigits?: number) => ({
  amount,
  decimals,
  clipAmount = false,
  decimalDigits = false,
  decimalSeparator,
  groupSeparator,
}: {
  amount: number;
  decimals: number;
  clipAmount?: boolean;
  decimalDigits?: boolean;
  decimalSeparator: string;
  groupSeparator: string;
}) => {
  try {
    const fmt = {
      decimalSeparator,
      groupSeparator,
      groupSize: 3,
    };
    let _maxDigits = maxDigits || 0;
    let _amount = convert.toHumanAmount({ originAmount: amount, decimals });
    if (clipAmount) {
      let maxDigits = decimals;
      if (_amount > 0 && _amount < 1 && !!decimalDigits) {
        maxDigits = 5;
      }
      if (_amount > 1) {
        maxDigits = 4;
      }
      if (_amount > 1e3) {
        maxDigits = 2;
      }
      if (_amount > 1e5) {
        maxDigits = 0;
      }
      if (decimals) {
        _amount = floor(_amount, Math.min(decimals, maxDigits));
      } else {
        _amount = floor(_amount, maxDigits);
      }
    }
    convert.checkAmount(_amount);
    if (_amount > 0 && _amount < 1) {
      _maxDigits = 0;
    }
    return _amount
      ? removeTrailingZeroes({
          amountString: new BigNumber(_amount).toFormat(
            _maxDigits,
            BigNumber.ROUND_DOWN,
            fmt
          ),
          decimalSeparator,
        })
      : 0;
  } catch {
    return amount;
  }
};

const amountFull = amountCreator();

const amount = amountCreator(CONSTANT_COMMONS.AMOUNT_MAX_FRACTION_DIGITS);

// const formatDateTime = (dateTime, formatPattern) =>
//   moment(dateTime).format(formatPattern || 'DD MMM hh:mm A');
// const toMiliSecond = (second) => second * 1000;
// //1e9 => 0.000000001
// const toFixed = (number, decimals = 0) => {
//   if (_.isNumber(number) && !_.isNaN(number)) {
//     return removeTrailingZeroes(
//       number.toFixed(decimals).replace('.', getDecimalSeparator()),
//     );
//   }

//   return number;
// };
// const formatUnixDateTime = (dateTime, formatPattern = 'MMM DD YYYY, HH:mm') =>
//   moment.unix(dateTime).format(formatPattern);

// const number = (num) => {
//   const fmt = {
//     decimalSeparator: getDecimalSeparator(),
//     groupSeparator: getGroupSeparator(),
//     groupSize: 3,
//   };

//   const rs = new BigNumber(num);
//   return rs.isFinite() ? rs.toFormat(fmt) : num;
// };

// const numberWithNoGroupSeparator = (num) => {
//   const rs = new BigNumber(num);
//   return rs.isFinite()
//     ? rs.toFormat({
//       ...BigNumber.config().FORMAT,
//       decimalSeparator: getDecimalSeparator(),
//       groupSize: 0,
//     })
//     : num;
// };

// const balance = (amount, decimals, maxDigits) => {
//   try {
//     const fmt = {
//       decimalSeparator: getDecimalSeparator(),
//       groupSeparator: getGroupSeparator(),
//       groupSize: 3,
//     };
//     const _amount = convertUtil.toHumanAmount(amount, decimals);
//     if (!Number.isFinite(_amount))
//       throw new Error('Can not format invalid amount');
//     return _amount
//       ? new BigNumber(_amount).toFormat(maxDigits, BigNumber.ROUND_DOWN, fmt)
//       : 0;
//   } catch {
//     return amount;
//   }
// };

// const formatWithNotation = (number, noOfDigits = 2) => {
//   const millionNotation = Math.pow(10, 6 + noOfDigits);
//   const kiloNotation = Math.pow(10, 3 + noOfDigits);
//   const miliNotation = Math.pow(10, -3 + noOfDigits);

//   if (number >= millionNotation) {
//     return (
//       (
//         Math.floor(number / Math.pow(10, 6 - noOfDigits)) /
//         Math.pow(10, noOfDigits)
//       ).toString() + 'M'
//     );
//   }

//   if (number >= kiloNotation) {
//     return (
//       (
//         Math.floor(number / Math.pow(10, 3 - noOfDigits)) /
//         Math.pow(10, noOfDigits)
//       ).toString() + 'K'
//     );
//   }

//   if (number >= miliNotation) {
//     return _.floor(number, noOfDigits);
//   }

//   return number;
// };

const format = {
  amount,
  amountFull,
  amountCreator,
};

export default format;
// {
//   //   formatDateTime,
//   //   formatUnixDateTime,
//   //   toMiliSecond,
//   //   toFixed,
//   //   number,
//   //   numberWithNoGroupSeparator,
//   //   balance,
//   //   formatWithNotation,
// }
