import toString from 'lodash/toString';
import { change, focus } from 'redux-form';
import convert from 'src/utils/convert';
import format from 'src/utils/format';
import floor from 'lodash/floor';
import BigNumber from 'bignumber.js';
import { Dispatch } from 'redux';
import { IRootState } from 'src/redux/interface';
import { defaultAccountSelector, signPublicKeyEncodeSelector } from 'src/module/Account';
import { ISelectedPrivacy, selectedPrivacySelector } from 'src/module/Token';
import { AccountInstance } from 'incognito-js/build/web/browser';
import { COINS } from 'src/constants';
import { API_CODE, API_ERROR, ERROR_MESSAGE } from 'src/constants/error';
import { bridgeTokensSelector, chainTokensSelector } from '../Token/Token.selector';
import { sendDataSelector, sendSelector, userFeesSelector } from './Send.selector';
import { getMaxAmount, MAX_FEE_PER_TX, getTotalFee } from './Send.utils';
import {
    ACTION_FETCHING_FEE,
    ACTION_FETCHED_EST_NATIVE_FEE,
    ACTION_FETCH_FAIL_FEE,
    ACTION_ADD_FEE_TYPE,
    ACTION_CHANGE_FEE_TYPE,
    ACTION_FETCHED_PTOKEN_FEE,
    ACTION_FETCHED_MIN_PTOKEN_FEE,
    ACTION_CHANGE_FEE,
    ACTION_INIT,
    ACTION_INIT_FETCHED,
    ACTION_FETCHED_MAX_FEE_PRV,
    ACTION_FETCHED_MAX_FEE_PTOKEN,
    ACTION_FETCHED_VALID_ADDR,
    ACTION_FETCHED_USER_FEES,
    ACTION_FETCHING_USER_FEES,
    ACTION_FETCH_FAIL_USER_FEES,
    ACTION_TOGGLE_FAST_FEE,
    ACTION_REMOVE_FEE_TYPE,
    FORM_CONFIGS,
    ACTION_SET_SENDING,
    ACTION_UPDATE_DATA_FORCE_SEND,
    ACTION_SET_ERROR_MESSAGE,
} from './Send.constant';
import { IDataForceSend, ISendData, ISendReducer, IUserFees } from './Send.interface';

export const actionSetErrorMessage = (payload: string) => ({
    type: ACTION_SET_ERROR_MESSAGE,
    payload,
});

export const actionInitFetched = (payload: {
    screen: string;
    rate: number;
    minAmount: number;
    minAmountText: string;
    isAddressValidated: boolean;
    errorMessage: string;
}) => ({
    type: ACTION_INIT_FETCHED,
    payload,
});

export const actionInitEstimateFee = (config: { screen: string }) => async (
    dispatch: Dispatch,
    getState: () => IRootState,
) => {
    const state = getState();
    const selectedPrivacy: ISelectedPrivacy = selectedPrivacySelector(state);
    const account: AccountInstance = defaultAccountSelector(state);
    const wallet = state?.wallet;
    if (!wallet || !account || !selectedPrivacy.tokenId) {
        return;
    }
    const { screen = 'Send' } = config;
    let rate = 1;
    let minAmount = convert.toHumanAmount({
        originalAmount: 1,
        decimals: selectedPrivacy.pDecimals,
    });
    let minAmountText = format.toFixed({
        number: minAmount,
        decimals: selectedPrivacy.pDecimals,
    });
    try {
        switch (screen) {
            case 'UnShield': {
                if (!selectedPrivacy.isDecentralized) {
                    // centralized need fee send to temp address
                    rate = 2;
                }
                break;
            }
            default: {
                rate = 1;
                break;
            }
        }
        if (screen === 'UnShield') {
            const bridgeTokens = bridgeTokensSelector(state);
            const chainTokens = chainTokensSelector(state);
            const token = await account.getPrivacyTokenById(selectedPrivacy.tokenId, bridgeTokens, chainTokens);
            const minMaxWithdraw = await token.bridgeGetMinMaxWithdraw();
            if (minMaxWithdraw) {
                const min = minMaxWithdraw.minAmount;
                minAmountText = convert.toString({ text: toString(min) });
                minAmount = convert.toOriginalAmount({
                    humanAmount: minAmountText,
                    decimals: selectedPrivacy.pDecimals,
                });
            }
        }
    } catch (error) {
        throw error;
    } finally {
        await dispatch(
            actionInitFetched({
                screen,
                rate,
                minAmount,
                minAmountText,
                isAddressValidated: true,
                errorMessage: '',
            }),
        );
    }
};

// fee type selection
export const actionAddFeeType = (payload: { tokenId: string; symbol: string }) => ({
    type: ACTION_ADD_FEE_TYPE,
    payload,
});

export const actionRemoveFeeType = (payload: { tokenId: string }) => ({
    type: ACTION_REMOVE_FEE_TYPE,
    payload,
});

export const actionChangeFeeType = (payload: string) => ({
    type: ACTION_CHANGE_FEE_TYPE,
    payload,
});

export const actionChangeFee = (payload: any) => ({
    type: ACTION_CHANGE_FEE,
    payload,
});

// valid address withdraw
export const actionFetchedValidAddr = (payload: { isAddressValidated: boolean }) => ({
    type: ACTION_FETCHED_VALID_ADDR,
    payload,
});

// estimate user fee withdraw
export const actionFetchingUserFees = () => ({
    type: ACTION_FETCHING_USER_FEES,
});

export const actionFetchFailUserFees = (isMemoRequired?: boolean) => ({
    type: ACTION_FETCH_FAIL_USER_FEES,
    payload: isMemoRequired,
});

export const actionFetchedUserFees = (payload: IUserFees) => ({
    type: ACTION_FETCHED_USER_FEES,
    payload,
});

export const actionFetchUserFees = ({
    address,
    memo,
    requestedAmount,
    incognitoAmount,
}: {
    amount: string;
    address: string;
    memo: string;
    requestedAmount: string;
    incognitoAmount: string;
}) => async (dispatch: Dispatch, getState: () => IRootState) => {
    let userFeesData;
    const state = getState();
    const { isUnShield } = sendDataSelector(state);
    const userFees = userFeesSelector(state);
    const selectedPrivacy = selectedPrivacySelector(state);
    userFeesData = userFees?.data;
    if (!isUnShield) {
        return;
    }
    try {
        await dispatch(actionFetchingUserFees());
        const account: AccountInstance = defaultAccountSelector(state);
        const bridgeTokens = bridgeTokensSelector(state);
        const chainTokens = chainTokensSelector(state);
        const signPublicKey: string = signPublicKeyEncodeSelector(state);
        const token = await account.getPrivacyTokenById(selectedPrivacy.tokenId, bridgeTokens, chainTokens);
        userFeesData = await token.bridgeWithdrawEstUserFee({
            requestedAmount,
            incognitoAmount,
            paymentAddress: address,
            memo,
            signPublicKey,
        });
        if (!userFeesData.FeeAddress) {
            throw new Error("Can't not get fee address!");
        }
        if (!userFeesData.Address && !selectedPrivacy.isDecentralized) {
            throw new Error("Can't not get temp address");
        }
        await dispatch(actionFetchedUserFees(userFeesData));
    } catch (error) {
        if (error && error?.response?.data?.Error?.Code === API_CODE.MEMO_IS_REQUIRED) {
            dispatch(actionSetErrorMessage(API_ERROR[toString(API_CODE.MEMO_IS_REQUIRED)]));
            return dispatch(actionFetchFailUserFees(true));
        }
        if (error && error?.response?.status === 500) {
            dispatch(actionFetchFailUserFees());
            throw new Error(
                `${ERROR_MESSAGE.CAN_NOT_ESTIMATE_FEE} API_ERROR_CODE(${error?.response?.data?.Error?.Code || ''})`,
            );
        }
        dispatch(actionFetchFailUserFees());
        throw error;
    }
};

// estimate native fee

export const actionFetchedEstNativeFee = (payload: {
    feePrv: number;
    feePrvText: string;
    minFeePrv: number;
    minFeePrvText: string;
    totalFeePrv: number;
    totalFeePrvText: string;
    userFeePrv: string;
}) => ({
    type: ACTION_FETCHED_EST_NATIVE_FEE,
    payload,
});

export const actionFetchedMaxNativeFee = (payload: { maxFeePrv: number; maxFeePrvText: string }) => ({
    type: ACTION_FETCHED_MAX_FEE_PRV,
    payload,
});

export const actionEstNativeFee = ({ feeEst }: { feeEst: number }) => async (
    dispatch: Dispatch,
    getState: () => IRootState,
) => {
    let feePrv = 0;
    let feePrvText = '0';
    let totalFeePrv = 0;
    let totalFeePrvText = '0';
    let userFeePrv = '0';
    const state = getState();
    const { fast2x, userFees, rate } = sendSelector(state);
    const { isUsedPRVFee, isUnShield, feePDecimals, hasMultiLevel } = sendDataSelector(state);
    const { isFetched } = userFees;
    try {
        feePrv = floor(new BigNumber(feeEst).multipliedBy(rate).toNumber());
        feePrvText = format.toFixed({
            number: convert.toHumanAmount({
                originalAmount: feePrv,
                decimals: COINS.PRV.pDecimals,
            }),
            decimals: COINS.PRV.pDecimals,
        });
        totalFeePrv = feePrv;
        totalFeePrvText = feePrvText;
        if (isUnShield && isFetched) {
            const { totalFee, totalFeeText, userFee } = getTotalFee({
                fast2x,
                userFeesData: userFees?.data,
                feeEst: feePrv,
                decimals: feePDecimals,
                isUsedPRVFee,
                hasMultiLevel,
            });
            totalFeePrv = totalFee;
            totalFeePrvText = totalFeeText;
            userFeePrv = userFee;
        }
    } catch (error) {
        throw error;
    } finally {
        await dispatch(
            actionFetchedEstNativeFee({
                feePrv,
                feePrvText,
                minFeePrv: feePrv,
                minFeePrvText: feePrvText,
                totalFeePrv,
                totalFeePrvText,
                userFeePrv,
            }),
        );
        if (isUsedPRVFee) {
            await Promise.all([
                await dispatch(change(FORM_CONFIGS.formName, FORM_CONFIGS.fee, totalFeePrvText)),
                await dispatch(focus(FORM_CONFIGS.formName, FORM_CONFIGS.fee)),
            ]);
        }
    }
};

// estimate privacy token fee

export const actionFetchedEstPrivacyFee = (payload: {
    feePToken: number;
    feePTokenText: string;
    totalFeePToken: number;
    totalFeePTokenText: string;
    userFeePToken: string;
}) => ({
    type: ACTION_FETCHED_PTOKEN_FEE,
    payload,
});

export const actionFetchedMaxPrivacyFee = (payload: { amount: number; amountText: string }) => ({
    type: ACTION_FETCHED_MAX_FEE_PTOKEN,
    payload,
});

export const actionEstPrivacyFee = ({ feePTokenEst }: { feePTokenEst: number }) => async (
    dispatch: Dispatch,
    getState: () => IRootState,
) => {
    let feePToken = 0;
    let feePTokenText = '0';
    let totalFeePToken = 0;
    let totalFeePTokenText = '0';
    let userFeePToken = '0';
    const state = getState();
    const selectedPrivacy: ISelectedPrivacy = selectedPrivacySelector(state);
    const { rate, userFees, fast2x } = sendSelector(state);
    const { isUseTokenFee, isUnShield, hasMultiLevel } = sendDataSelector(state);
    const { isFetched } = userFees;
    try {
        feePToken = floor(new BigNumber(feePTokenEst).multipliedBy(rate).toNumber());
        feePTokenText = format.toFixed({
            number: convert.toHumanAmount({
                originalAmount: feePToken,
                decimals: selectedPrivacy?.pDecimals,
            }),
            decimals: selectedPrivacy?.pDecimals,
        });
        totalFeePToken = feePToken;
        totalFeePTokenText = feePTokenText;
        if (isUnShield && isFetched) {
            const { totalFee, totalFeeText, userFee } = getTotalFee({
                fast2x,
                userFeesData: userFees?.data,
                feeEst: feePToken,
                decimals: selectedPrivacy?.pDecimals,
                isUsedPRVFee: false,
                hasMultiLevel,
            });
            totalFeePToken = totalFee;
            totalFeePTokenText = totalFeeText;
            userFeePToken = userFee;
        }
    } catch (error) {
        throw error;
    } finally {
        await dispatch(
            actionFetchedEstPrivacyFee({
                feePToken,
                feePTokenText,
                totalFeePToken,
                totalFeePTokenText,
                userFeePToken,
            }),
        );
        if (isUseTokenFee) {
            await Promise.all([
                dispatch(change(FORM_CONFIGS.formName, FORM_CONFIGS.fee, totalFeePTokenText)),
                dispatch(focus(FORM_CONFIGS.formName, FORM_CONFIGS.fee)),
            ]);
        }
    }
};

// estimate min privacy token fee

export const actionFetchedEstMinPrivacyFee = (payload: { minFeePToken: number; minFeePTokenText: string }) => ({
    type: ACTION_FETCHED_MIN_PTOKEN_FEE,
    payload,
});

export const actionEstMinPrivacyFee = ({ minFeePTokenEst }: { minFeePTokenEst: number }) => async (
    dispatch: Dispatch,
    getState: () => IRootState,
) => {
    const state = getState();
    const selectedPrivacy: ISelectedPrivacy = selectedPrivacySelector(state);
    const { rate, userFees }: ISendReducer = sendSelector(state);
    const { isUnShield } = sendDataSelector(state);
    const isFreeFeePToken = !userFees?.data?.TokenFees;
    const isFreeFeePrivacy = !userFees?.data?.PrivacyFees;
    const isFreeFee = isFreeFeePToken && isFreeFeePrivacy;
    const minFeePToken = floor(new BigNumber(minFeePTokenEst).multipliedBy(rate).toNumber());
    const minFeePTokenText = format.toFixed({
        number: convert.toHumanAmount({
            originalAmount: minFeePToken,
            decimals: selectedPrivacy?.pDecimals,
        }),
        decimals: selectedPrivacy?.pDecimals,
    });
    const task = [
        dispatch(
            actionFetchedEstMinPrivacyFee({
                minFeePToken,
                minFeePTokenText,
            }),
        ),
        dispatch(
            actionAddFeeType({
                tokenId: selectedPrivacy?.tokenId,
                symbol: selectedPrivacy?.symbol || selectedPrivacy?.pSymbol,
            }),
        ),
    ];
    await Promise.all(task);
    if (isUnShield && !!userFees?.isFetched) {
        if (isFreeFee) {
            return;
        }
        if (isFreeFeePToken) {
            return dispatch(actionRemoveFeeType({ tokenId: selectedPrivacy?.tokenId }));
        }
    }
};

// fetch all fees

export const actionInit = () => ({
    type: ACTION_INIT,
});

export const actionFetchingFee = () => ({
    type: ACTION_FETCHING_FEE,
});

export const actionFetchFailFee = () => ({
    type: ACTION_FETCH_FAIL_FEE,
});

export const actionFetchFee = ({
    amount,
    address,
    screen,
    memo,
}: {
    amount: string;
    address: string;
    screen: string;
    memo: string;
}) => async (dispatch: Dispatch, getState: () => IRootState) => {
    const state = getState();
    const selectedPrivacy: ISelectedPrivacy = selectedPrivacySelector(state);
    const { init } = sendSelector(state);
    let feeEst = MAX_FEE_PER_TX;
    let feePTokenEst = 0;
    let minFeePTokenEst = 0;
    const originalAmount = convert.toOriginalAmount({
        humanAmount: amount,
        decimals: selectedPrivacy.pDecimals,
    });
    const bnAmount = new BigNumber(originalAmount);
    const requestedAmount = amount;
    const incognitoAmount = bnAmount.toString();
    let isAddressValidated = true;
    try {
        if (
            !init ||
            !amount ||
            !address ||
            !selectedPrivacy?.tokenId ||
            bnAmount.isLessThanOrEqualTo(0) ||
            bnAmount.isGreaterThan(new BigNumber(selectedPrivacy.amount)) ||
            bnAmount.isNaN()
        ) {
            return;
        }
        await dispatch(actionFetchingFee());
        await actionInitEstimateFee({ screen })(dispatch, getState);
        if (selectedPrivacy.isToken) {
            const account: AccountInstance = defaultAccountSelector(state);
            const bridgeTokens = bridgeTokensSelector(state);
            const chainTokens = chainTokensSelector(state);
            const token = await account.getPrivacyTokenById(selectedPrivacy.tokenId, bridgeTokens, chainTokens);
            if (selectedPrivacy?.isWithdrawable && screen === 'UnShield') {
                isAddressValidated = await token.bridgeWithdrawCheckValAddress({ address });
                if (isAddressValidated) {
                    await actionFetchUserFees({ address, amount, memo, incognitoAmount, requestedAmount })(
                        dispatch,
                        getState,
                    );
                }
            }
            try {
                let feePTokenEstData = await token.getEstFeeFromNativeFee({
                    nativeFee: feeEst,
                });
                feePTokenEst = feePTokenEstData;
                minFeePTokenEst = feePTokenEstData;
            } catch (e) {
                console.debug(e);
            }
        }
    } catch (error) {
        throw error;
    } finally {
        if (feeEst) {
            await actionEstNativeFee({
                feeEst,
            })(dispatch, getState);
        }
        if (feePTokenEst) {
            await actionEstPrivacyFee({ feePTokenEst })(dispatch, getState);
        }
        if (minFeePTokenEst) {
            await actionEstMinPrivacyFee({ minFeePTokenEst })(dispatch, getState);
        }
        await dispatch(actionFetchedValidAddr({ isAddressValidated }));
    }
};
//

export const actionFetchFeeByMax = () => async (dispatch: Dispatch, getState: () => IRootState) => {
    const state = getState();
    const selectedPrivacy: ISelectedPrivacy = selectedPrivacySelector(state);
    const { isFetched, isFetching }: ISendReducer = sendSelector(state);
    const { isUseTokenFee, totalFee }: ISendData = sendDataSelector(state);
    const { amount, isNativeToken, pDecimals } = selectedPrivacy;
    const bnAmount = new BigNumber(amount);
    const bnFeeEst = new BigNumber(MAX_FEE_PER_TX);
    const maxAmount = Math.max(isNativeToken ? bnAmount.minus(bnFeeEst).toNumber() : amount, 0);
    let maxAmountText = format.toFixed({
        number: convert.toHumanAmount({
            originalAmount: maxAmount,
            decimals: pDecimals,
        }),
        decimals: pDecimals,
    });
    const feeEst = bnFeeEst.toNumber();
    if (isFetching) {
        return;
    }
    try {
        if (isFetched) {
            const { maxAmountText: _maxAmountText } = getMaxAmount({
                selectedPrivacy,
                isUseTokenFee,
                totalFee,
            });
            maxAmountText = _maxAmountText;
        } else {
            await dispatch(actionFetchingFee());
            if (selectedPrivacy.isToken) {
                const account: AccountInstance = defaultAccountSelector(state);
                const bridgeTokens = bridgeTokensSelector(state);
                const chainTokens = chainTokensSelector(state);
                const token = await account.getPrivacyTokenById(selectedPrivacy.tokenId, bridgeTokens, chainTokens);
                try {
                    const feePTokenEst = await token.getEstFeeFromNativeFee({ nativeFee: feeEst });
                    if (feePTokenEst) {
                        await Promise.all([
                            actionEstPrivacyFee({ feePTokenEst })(dispatch, getState),
                            actionEstMinPrivacyFee({ minFeePTokenEst: feePTokenEst })(dispatch, getState),
                        ]);
                    }
                } catch (error) {
                    console.debug(error);
                }
            }
        }
    } catch (error) {
        throw error;
    } finally {
        if (!isFetched) {
            await actionEstNativeFee({
                feeEst,
            })(dispatch, getState);
        }
    }
    return maxAmountText;
};

export const actionToggleFastFee = () => ({
    type: ACTION_TOGGLE_FAST_FEE,
});

export const actionSetSending = (payload: boolean) => ({
    type: ACTION_SET_SENDING,
    payload,
});

export const actionUpdateDataForceSend = (payload?: IDataForceSend) => ({
    type: ACTION_UPDATE_DATA_FORCE_SEND,
    payload,
});
