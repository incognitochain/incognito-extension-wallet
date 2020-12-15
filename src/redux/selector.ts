import { createSelector } from 'reselect';
import { isGettingAccountBalanceSelector } from 'src/module/Account';
import {
  ISelectedPrivacy,
  isGettingBalanceTokenByIdSelector,
  selectedPrivacySelector,
} from 'src/module/Token';

export const isGettingBalanceSelector = createSelector(
  isGettingAccountBalanceSelector,
  isGettingBalanceTokenByIdSelector,
  selectedPrivacySelector,
  (
    getAccBal: boolean,
    getTokenBal: (tokenId: string) => boolean,
    selectedPrivacy: ISelectedPrivacy
  ) => {
    if (selectedPrivacy.isNativeToken) {
      return getAccBal;
    }
    return getTokenBal(selectedPrivacy.tokenId);
  }
);
