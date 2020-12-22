import { ISelectedPrivacy, actionGetBalanceByTokenId as actionGetTokenBalance } from 'src/module/Token';
import { actionGetAccountBalance } from 'src/module/Account';
import { Dispatch } from 'redux';
import { selectedPrivacySelector } from 'src/module/Token/Token.selector';
import { IRootState } from './interface';

export const actionGetBalanceByTokenId = () => async (dispatch: Dispatch, getState: () => IRootState) => {
    try {
        const state = getState();
        const selectedPrivacy: ISelectedPrivacy = selectedPrivacySelector(state);
        if (selectedPrivacy.isNativeToken) {
            return actionGetAccountBalance()(dispatch, getState);
        }
        return actionGetTokenBalance(selectedPrivacy.tokenId)(dispatch, getState);
    } catch (error) {
        throw error;
    }
};
