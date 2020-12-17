import { createSelector } from 'reselect';
import { isGettingAccountBalanceSelector as getAccountBalance } from 'src/module/Account';
import {
  getPrivacyDataByTokenIDSelector,
  ISelectedPrivacy,
  isGettingBalanceTokenByIdSelector as getTokenBalanceById,
} from 'src/module/Token';

export const isGettingBalanceByTokenIdSelector = createSelector(
  getAccountBalance,
  getTokenBalanceById,
  getPrivacyDataByTokenIDSelector,
  (
    getAccBal: boolean,
    getTokenBal: (tokenId: string) => boolean,
    getPrivacyDataByTokenID: (tokenId: string) => ISelectedPrivacy
  ) => (tokenId: string) => {
    const token = getPrivacyDataByTokenID(tokenId);
    if (token.isNativeToken) {
      return getAccBal;
    }
    return getTokenBal(tokenId);
  }
);
