import BigNumber from 'bignumber.js';
import { TxHistoryModel } from 'incognito-js/build/web/browser';
import { createSelector } from 'reselect';
import { keySetAccountSelector } from 'src/routes/Account';
import {
  decimalSeparatorSelector,
  groupSeparatorSelector,
} from 'src/routes/Preload';
import { tokenSelector } from 'src/routes/Token';
import { formatAmount, formatUnixDateTime } from 'src/utils';
import { selectedPrivacySelector } from 'src/routes/Token';
import { getStatusData, getTypeData } from './History.utils';

export const historySelector = createSelector(
  tokenSelector,
  (token) => token.history || []
);

export const historyLocalSelector = createSelector(
  tokenSelector,
  selectedPrivacySelector,
  decimalSeparatorSelector,
  groupSeparatorSelector,
  keySetAccountSelector,
  (token, selectedPrivacy, decimalSeparator, groupSeparator, keySet) => {
    const histories = token.history.histories;
    if (!histories) {
      return [];
    }
    return histories.map((history: TxHistoryModel) => {
      const amount = selectedPrivacy?.isNativeToken
        ? history?.nativeTokenInfo?.amount
        : history?.privacyTokenInfo?.amount;
      const fee = selectedPrivacy?.isNativeToken
        ? history?.nativeTokenInfo?.fee
        : history?.privacyTokenInfo?.fee;
      const amountFormated = formatAmount({
        amount: new BigNumber(amount).toNumber(),
        decimalSeparator,
        groupSeparator,
        decimals: selectedPrivacy?.pDecimals,
      });
      const feeFormated = formatAmount({
        amount: new BigNumber(fee).toNumber(),
        decimalSeparator,
        groupSeparator,
        decimals: selectedPrivacy?.pDecimals,
      });
      const { statusMessage } = getStatusData(history);
      return {
        ...history,
        amountFormated,
        timeFormated: formatUnixDateTime(history?.lockTime, 'MMM DD HH:mm A'),
        feeFormated,
        status: statusMessage,
        type: getTypeData(
          history?.historyType,
          history,
          keySet.paymentAddressKeySerialized
        ),
        symbol: selectedPrivacy?.symbol || selectedPrivacy?.pSymbol,
      };
    });
  }
);
