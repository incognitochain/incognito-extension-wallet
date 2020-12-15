import { change, focus } from 'redux-form';
import convert from 'src/utils/convert';
import format from 'src/utils/format';
// import trim from 'lodash/trim';
import floor from 'lodash/floor';
import BigNumber from 'bignumber.js';
import {
  ACTION_FETCHING_FEE,
  ACTION_FETCHED_FEE,
  ACTION_FETCH_FAIL_FEE,
  ACTION_ADD_FEE_TYPE,
  // ACTION_CHANGE_FEE_TYPE,
  ACTION_FETCHED_PTOKEN_FEE,
  ACTION_FETCHED_MIN_PTOKEN_FEE,
  // ACTION_CHANGE_FEE,
  ACTION_INIT,
  ACTION_INIT_FETCHED,
  ACTION_FETCHED_MAX_FEE_PRV,
  ACTION_FETCHED_MAX_FEE_PTOKEN,
  // ACTION_FETCHED_VALID_ADDR,
  // ACTION_FETCHED_USER_FEES,
  // ACTION_FETCHING_USER_FEES,
  // ACTION_TOGGLE_FAST_FEE,
  // ACTION_REMOVE_FEE_TYPE,
  // ACTION_FETCH_FAIL_USER_FEES,
} from './Send.constant';
import { apiGetEstimateFeeFromChain } from './Send.services';
import {
  MAX_FEE_PER_TX,
  // getMaxAmount,
  // getTotalFee
} from './Send.utils';
import { Dispatch } from 'redux';
import { IRootState } from 'src/redux/interface';
import { defaultAccountSelector } from 'src/module/Account';
import { apiURL2Selector, apiURLSelector } from 'src/module/Preload';
import { ISelectedPrivacy, selectedPrivacySelector } from 'src/module/Token';
import { sendDataSelector, sendSelector } from './Send.selector';
import { AccountInstance } from 'incognito-js/build/web/browser';
import { COINS } from 'src/constants';
import { ISendReducer } from './Send.reducer';
import { FORM_CONFIGS } from './Send.enhance';

export const actionInitEstimateFee = (config: { screen: string }) => async (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  const state = getState();
  const selectedPrivacy: ISelectedPrivacy = selectedPrivacySelector(state);
  const account: AccountInstance = defaultAccountSelector(state);
  const wallet = state?.wallet;
  if (!wallet || !account || !selectedPrivacy) {
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
      // case 'UnShield': {
      //   rate = 2;
      //   break;
      // }
      default: {
        rate = 1;
        break;
      }
    }
    // if (screen === 'UnShield') {
    //   const [min] = await getMinMaxWithdrawAmount(selectedPrivacy?.tokenId);
    //   if (min) {
    //     minAmountText = format.toFixed(min, selectedPrivacy?.pDecimals);
    //     minAmount = convert.toOriginalAmount(
    //       minAmountText,
    //       selectedPrivacy?.pDecimals
    //     );
    //   }
    // }
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
        isValidETHAddress: true,
      })
    );
  }
};

export const actionFetchedMaxFeePrv = (payload: {
  maxFeePrv: number;
  maxFeePrvText: string;
}) => ({
  type: ACTION_FETCHED_MAX_FEE_PRV,
  payload,
});

export const actionFetchedMaxFeePToken = (payload: {
  amount: number;
  amountText: string;
}) => ({
  type: ACTION_FETCHED_MAX_FEE_PTOKEN,
  payload,
});

export const actionInit = () => ({
  type: ACTION_INIT,
});

export const actionInitFetched = (payload: {
  screen: string;
  rate: number;
  minAmount: number;
  minAmountText: string;
  isAddressValidated: boolean;
  isValidETHAddress: boolean;
}) => ({
  type: ACTION_INIT_FETCHED,
  payload,
});

export const actionFetchingFee = () => ({
  type: ACTION_FETCHING_FEE,
});

export const actionFetchedFee = (payload: {
  feePrv: number;
  feePrvText: string;
  minFeePrv: number;
  minFeePrvText: string;
  totalFeePrv: number;
  totalFeePrvText: string;
}) => ({
  type: ACTION_FETCHED_FEE,
  payload,
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
  const selectedPrivacy = selectedPrivacySelector(state);
  const apiURL = apiURLSelector(state);
  const api2URL = apiURL2Selector(state);
  const { isFetching, init } = sendSelector(state);
  let feeEst = MAX_FEE_PER_TX;
  let feePTokenEst: any = 0;
  let minFeePTokenEst: any = 0;
  const originalAmount = convert.toOriginalAmount({
    humanAmount: amount,
    decimals: selectedPrivacy.pDecimals,
  });
  const _originalAmount = new BigNumber(originalAmount).toNumber();
  try {
    if (
      !init ||
      !amount ||
      !address ||
      !selectedPrivacy?.tokenId ||
      isFetching ||
      _originalAmount === 0 ||
      _originalAmount > selectedPrivacy?.amount
    ) {
      return;
    }
    await dispatch(actionFetchingFee());
    await actionInitEstimateFee({ screen })(dispatch, getState);
    // if (selectedPrivacy?.isWithdrawable && screen === 'UnShield') {
    //   const isAddressValidated = await dispatch(actionValAddr(address));
    //   if (isAddressValidated) {
    //     await dispatch(actionFetchUserFees({ address, amount, memo }));
    //   }
    // }
    if (selectedPrivacy?.isToken) {
      try {
        const payload = {
          Prv: feeEst,
          TokenID: selectedPrivacy?.tokenId,
        };
        let feePTokenEstData: any = await apiGetEstimateFeeFromChain(
          api2URL,
          payload
        );
        console.debug(`feePTokenEstData`, feePTokenEstData);
        feePTokenEst = feePTokenEstData;
        minFeePTokenEst = feePTokenEstData;
      } catch (error) {
        console.debug(error);
      }
    }
  } catch (error) {
    throw error;
  } finally {
    if (feeEst) {
      await actionHandleFeeEst({
        feeEst,
      })(dispatch, getState);
    }
    if (feePTokenEst) {
      await actionHandleFeePTokenEst({ feePTokenEst })(dispatch, getState);
    }
    if (minFeePTokenEst) {
      await actionHandleMinFeeEst({ minFeePTokenEst })(dispatch, getState);
    }
  }
};

export const actionHandleMinFeeEst = ({
  minFeePTokenEst,
}: {
  minFeePTokenEst: number;
}) => async (dispatch: Dispatch, getState: () => IRootState) => {
  const state = getState();
  const selectedPrivacy: ISelectedPrivacy = selectedPrivacySelector(state);
  const {
    rate,
  }: // userFees
  ISendReducer = sendSelector(state);
  // const { isUnShield } = sendDataSelector(state);
  // const isFreeFeePToken = !userFees?.data?.TokenFees;
  // const isFreeFeePrivacy = !userFees?.data?.PrivacyFees;
  // const isFreeFee = isFreeFeePToken && isFreeFeePrivacy;
  const minFeePToken = floor(
    new BigNumber(minFeePTokenEst).multipliedBy(rate).toNumber()
  );
  const minFeePTokenText = format.toFixed({
    number: convert.toHumanAmount({
      originalAmount: minFeePToken,
      decimals: selectedPrivacy?.pDecimals,
    }),
    decimals: selectedPrivacy?.pDecimals,
  });
  let task = [
    dispatch(
      actionFetchedMinPTokenFee({
        minFeePToken,
        minFeePTokenText,
      })
    ),
    dispatch(
      actionAddFeeType({
        tokenId: selectedPrivacy?.tokenId,
        symbol: selectedPrivacy?.symbol || selectedPrivacy?.pSymbol,
      })
    ),
  ];
  await Promise.all(task);
  // if (isUnShield && !!userFees?.isFetched) {
  //   if (isFreeFee) {
  //     return;
  //   }
  //   if (isFreeFeePToken) {
  //     return await dispatch(
  //       actionRemoveFeeType({ tokenId: selectedPrivacy?.tokenId })
  //     );
  //   }
  // }
};

export const actionHandleFeeEst = ({ feeEst }: { feeEst: number }) => async (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  let feePrv = 0;
  let feePrvText = '0';
  let totalFeePrv = 0;
  let totalFeePrvText = '0';
  //  userFeePrv;
  const state = getState();
  const {
    //  fast2x, userFees,
    rate,
  } = sendSelector(state);
  const {
    isUsedPRVFee,
    // isUnShield,
    // feePDecimals,
    // hasMultiLevel,
  } = sendDataSelector(state);
  // const { isFetched } = userFees;
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
    // if (isUnShield && isFetched) {
    //   const { totalFee, totalFeeText, userFee } = getTotalFee({
    //     fast2x,
    //     userFeesData: userFees?.data,
    //     feeEst: feePrv,
    //     rate,
    //     pDecimals: feePDecimals,
    //     isUsedPRVFee,
    //     hasMultiLevel,
    //   });
    //   totalFeePrv = totalFee;
    //   totalFeePrvText = totalFeeText;
    //   userFeePrv = userFee;
    // }
  } catch (error) {
    throw error;
  } finally {
    await dispatch(
      actionFetchedFee({
        feePrv,
        feePrvText,
        minFeePrv: feePrv,
        minFeePrvText: feePrvText,
        totalFeePrv,
        totalFeePrvText,
        // userFeePrv,
      })
    );
    if (isUsedPRVFee) {
      await Promise.all([
        await dispatch(change(FORM_CONFIGS.formName, 'fee', totalFeePrvText)),
        await dispatch(focus(FORM_CONFIGS.formName, 'fee')),
      ]);
    }
  }
};

export const actionHandleFeePTokenEst = ({
  feePTokenEst,
}: {
  feePTokenEst: number;
}) => async (dispatch: Dispatch, getState: () => IRootState) => {
  let feePToken = 0;
  let feePTokenText = '0';
  let totalFeePToken = 0;
  let totalFeePTokenText = '0';
  // userFeePToken;
  const state = getState();
  const selectedPrivacy: ISelectedPrivacy = selectedPrivacySelector(state);
  const {
    rate,
    // userFees,
    // fast2x
  } = sendSelector(state);
  const {
    isUseTokenFee,
    // isUnShield, hasMultiLevel
  } = sendDataSelector(state);
  // const { isFetched } = userFees;
  try {
    feePToken = floor(
      new BigNumber(feePTokenEst).multipliedBy(rate).toNumber()
    );
    feePTokenText = format.toFixed({
      number: convert.toHumanAmount({
        originalAmount: feePToken,
        decimals: selectedPrivacy?.pDecimals,
      }),
      decimals: selectedPrivacy?.pDecimals,
    });
    totalFeePToken = feePToken;
    totalFeePTokenText = feePTokenText;
    // if (isUnShield && isFetched) {
    //   const { totalFee, totalFeeText, userFee } = getTotalFee({
    //     fast2x,
    //     userFeesData: userFees?.data,
    //     feeEst: feePToken,
    //     rate,
    //     pDecimals: selectedPrivacy?.pDecimals,
    //     isUsedPRVFee: false,
    //     hasMultiLevel,
    //   });
    //   totalFeePToken = totalFee;
    //   totalFeePTokenText = totalFeeText;
    //   userFeePToken = userFee;
    // }
  } catch (error) {
    throw error;
  } finally {
    await dispatch(
      actionFetchedPTokenFee({
        feePToken,
        feePTokenText,
        totalFeePToken,
        totalFeePTokenText,
        // userFeePToken,
      })
    );
    if (isUseTokenFee) {
      await Promise.all([
        dispatch(change(FORM_CONFIGS.formName, 'fee', totalFeePTokenText)),
        dispatch(focus(FORM_CONFIGS.formName, 'fee')),
      ]);
    }
  }
};

// export const actionRemoveFeeType = (payload) => ({
//   type: ACTION_REMOVE_FEE_TYPE,
//   payload,
// });

export const actionAddFeeType = (payload: {
  tokenId: string;
  symbol: string;
}) => ({
  type: ACTION_ADD_FEE_TYPE,
  payload,
});

// export const actionChangeFeeType = (payload) => ({
//   type: ACTION_CHANGE_FEE_TYPE,
//   payload,
// });

export const actionFetchedPTokenFee = (payload: {
  feePToken: number;
  feePTokenText: string;
  totalFeePToken: number;
  totalFeePTokenText: string;
}) => ({
  type: ACTION_FETCHED_PTOKEN_FEE,
  payload,
});

export const actionFetchedMinPTokenFee = (payload: {
  minFeePToken: number;
  minFeePTokenText: string;
}) => ({
  type: ACTION_FETCHED_MIN_PTOKEN_FEE,
  payload,
});

// export const actionChangeFee = (payload) => ({
//   type: ACTION_CHANGE_FEE,
//   payload,
// });

// export const actionFetchFeeByMax = () => async (dispatch, getState) => {
//   const state = getState();
//   const selectedPrivacy = selectedPrivacySeleclor.selectedPrivacy(state);
//   const {
//     isUseTokenFee,
//     isFetched,
//     totalFee,
//     isFetching,
//     tokenId,
//   } = feeDataSelector(state);
//   const { amount, isMainCrypto, pDecimals, isToken } = selectedPrivacy;
//   const feeEst = MAX_FEE_PER_TX;
//   let _amount = Math.max(isMainCrypto ? amount - feeEst : amount, 0);
//   let maxAmount = floor(_amount, pDecimals);
//   let maxAmountText = format.toFixed(
//     convert.toHumanAmount(maxAmount, pDecimals),
//     pDecimals
//   );
//   if (isFetching) {
//     return;
//   }
//   try {
//     if (isFetched) {
//       const { maxAmountText: _maxAmountText } = getMaxAmount({
//         selectedPrivacy,
//         isUseTokenFee,
//         totalFee,
//       });
//       maxAmountText = _maxAmountText;
//     } else {
//       await dispatch(actionFetchingFee());
//       if (isToken) {
//         const feePTokenEst = await apiGetEstimateFeeFromChain({
//           Prv: feeEst,
//           TokenID: tokenId,
//         });
//         if (feePTokenEst) {
//           await new Promise.all([
//             dispatch(actionHandleFeePTokenEst({ feePTokenEst })),
//             dispatch(actionHandleMinFeeEst({ minFeePTokenEst: feePTokenEst })),
//           ]);
//         }
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   } finally {
//     if (!isFetched) {
//       await dispatch(
//         actionHandleFeeEst({
//           feeEst,
//         })
//       );
//     }
//     // eslint-disable-next-line no-unsafe-finally
//     return maxAmountText;
//   }
// };

// export const actionFetchedValidAddr = (payload) => ({
//   type: ACTION_FETCHED_VALID_ADDR,
//   payload,
// });

// export const actionValAddr = (address = '') => async (dispatch, getState) => {
//   let isAddressValidated = true;
//   let isValidETHAddress = true;
//   const state = getState();
//   const selectedPrivacy = selectedPrivacySeleclor.selectedPrivacy(state);
//   const { isUnShield } = feeDataSelector(state);
//   if (!isUnShield) {
//     return;
//   }
//   try {
//     const _address = trim(address);
//     if (_address) {
//       const validAddr = await apiCheckValidAddress(
//         _address,
//         selectedPrivacy?.currencyType
//       );
//       isAddressValidated = !!validAddr?.data?.Result;
//     }
//   } catch (error) {
//     throw error;
//   } finally {
//     await dispatch(
//       actionFetchedValidAddr({ isAddressValidated, isValidETHAddress })
//     );
//   }
//   return isAddressValidated;
// };

// export const actionFetchedUserFees = (payload) => ({
//   type: ACTION_FETCHED_USER_FEES,
//   payload,
// });

// export const actionFetchingUserFees = () => ({
//   type: ACTION_FETCHING_USER_FEES,
// });

// export const actionFetchFailUserFees = (payload) => ({
//   type: ACTION_FETCH_FAIL_USER_FEES,
//   payload,
// });

// export const actionFetchUserFees = (payload) => async (dispatch, getState) => {
//   let userFeesData;
//   const state = getState();
//   const { address: paymentAddress, memo, amount: requestedAmount } = payload;
//   const selectedPrivacy = selectedPrivacySeleclor.selectedPrivacy(state);
//   const {
//     tokenId,
//     contractId,
//     currencyType,
//     isErc20Token,
//     externalSymbol,
//     paymentAddress: walletAddress,
//     pDecimals,
//     isDecentralized,
//   } = selectedPrivacy;
//   const { isETH, isUsedPRVFee, userFees, isUnShield } = feeDataSelector(state);
//   const originalAmount = convert.toOriginalAmount(requestedAmount, pDecimals);
//   userFeesData = { ...userFees?.data };
//   let _error;
//   const { isFetching } = userFees;
//   if (isFetching || !isUnShield) {
//     return;
//   }
//   try {
//     await dispatch(actionFetchingUserFees());
//     if (isDecentralized) {
//       const data = {
//         requestedAmount,
//         originalAmount,
//         paymentAddress,
//         walletAddress,
//         tokenContractID: isETH ? '' : contractId,
//         tokenId,
//         burningTxId: '',
//         currencyType: currencyType,
//         isErc20Token: isErc20Token,
//         externalSymbol: externalSymbol,
//         isUsedPRVFee,
//       };
//       userFeesData = await estimateUserFees(data);
//     } else {
//       const payload = {
//         originalAmount,
//         requestedAmount,
//         paymentAddress,
//         walletAddress,
//         tokenId: tokenId,
//         currencyType: currencyType,
//         memo,
//       };
//       const _userFeesData = await genCentralizedWithdrawAddress(payload);
//       userFeesData = {
//         ..._userFeesData,
//       };
//     }
//   } catch (error) {
//     _error = error;
//     throw error;
//   } finally {
//     if (_error && _error?.code === 'API_ERROR(-1027)') {
//       return await dispatch(actionFetchFailUserFees(true));
//     }
//     if (!userFeesData.FeeAddress) {
//       await dispatch(actionFetchFailUserFees());
//       throw new Error("Can't not get master address!");
//     }
//     await dispatch(actionFetchedUserFees(userFeesData));
//   }
// };

// export const actionToggleFastFee = (payload) => ({
//   type: ACTION_TOGGLE_FAST_FEE,
//   payload,
// });
