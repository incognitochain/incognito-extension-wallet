import { createSelector } from 'reselect';
import { isGettingAccountBalanceSelector as getAccountBalance } from 'src/module/Account/Account.selector';
import {
    getPrivacyDataByTokenIDSelector,
    isGettingBalanceTokenByIdSelector as getTokenBalanceById,
} from 'src/module/Token/Token.selector';

export const isGettingBalanceByTokenIdSelector = createSelector(
    getAccountBalance,
    getTokenBalanceById,
    getPrivacyDataByTokenIDSelector,
    (getAccBal, getTokenBal, getPrivacyDataByTokenID) => (tokenId: string) => {
        const token = getPrivacyDataByTokenID(tokenId);
        if (token.isNativeToken) {
            return getAccBal;
        }
        return getTokenBal(tokenId);
    },
);
