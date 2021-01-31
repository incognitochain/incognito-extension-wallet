import { AccountInstance, TxHistoryModel, TxHistoryModelParam } from 'incognito-js/build/web/browser';
import { PrivacyToken } from 'incognito-js/build/web/browser/src/walletInstance/token';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { defaultAccountSelector, signPublicKeyEncodeSelector } from 'src/module/Account';
import { bridgeTokensSelector, chainTokensSelector, ISelectedPrivacy, selectedPrivacySelector } from 'src/module/Token';
import { useHistory } from 'react-router-dom';
import { route as routeConfirmTx } from 'src/module/Send/features/ConfirmTx';
import toString from 'lodash/toString';
import { delay } from 'src/utils/delay';
import { getHistoryCacheDetailSelector } from 'src/module/History/History.selector';
import { toggleSaveBurnTxSelector, toggleSaveRawBurnTxSelector } from 'src/module/Setting/Setting.selector';
import { sendDataSelector, userFeesSelector } from './Send.selector';
import { ISendData, IUserFeesData } from './Send.interface';
import {
    actionAddStorageDataDecentralized,
    actionRemoveStorageDataDecentralized,
    actionRemoveStorageDataCentralized,
    actionAddStorageDataCentralized,
    actionAddStorageRawDataDecentralized,
    actionRemoveStorageRawDataDecentralized,
    actionRemoveStorageRawDataCentralized,
    actionAddStorageRawDataCentralized,
} from './features/UnShield';

interface IProps {}

export interface TInnerUnshield {
    handleUnShieldCrypto: () => any;
}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    const {
        isUseTokenFee,
        isUsedPRVFee,
        incognitoAmount,
        requestedAmount,
        paymentAddress,
        memo,
        userFeeSelection,
        userFeeLevel,
        userFee,
        privacyFee,
        nativeFee,
        originalFee,
        feeSymbol,
        symbol,
        amountFormatedNoClip,
        totalFeeFormatedNoClip,
    }: ISendData = useSelector(sendDataSelector);
    const getHistoryCacheDetail = useSelector(getHistoryCacheDetailSelector);
    const selectedPrivacy: ISelectedPrivacy = useSelector(selectedPrivacySelector);
    const { data }: { data: IUserFeesData } = useSelector(userFeesSelector);
    const { isDecentralized, tokenId, currencyType, contractId } = selectedPrivacy;
    const account: AccountInstance = useSelector(defaultAccountSelector);
    const bridgeTokens = useSelector(bridgeTokensSelector);
    const chainTokens = useSelector(chainTokensSelector);
    const signPublicKey: string = useSelector(signPublicKeyEncodeSelector);
    const toggleSaveBurnTx = useSelector(toggleSaveBurnTxSelector);
    const toggleSaveRawBurnTx = useSelector(toggleSaveRawBurnTxSelector);
    const { forceSendFinish } = props;
    const history = useHistory();
    const dispatch = useDispatch();
    const handleCentralizedWithdraw = async (token: PrivacyToken) => {
        const { FeeAddress: masterAddress, Address: tempAddress } = data;
        if (!tempAddress) {
            throw new Error(`Can't not get temp address`);
        }
        if (!masterAddress) {
            throw new Error(`Can't not get master address`);
        }
        let paymentInfoList = [
            {
                paymentAddressStr: masterAddress,
                amount: userFee,
                message: '',
            },
            {
                paymentAddressStr: tempAddress,
                amount: toString(originalFee),
                message: '',
            },
        ];
        let privacyPaymentInfoList = [
            {
                paymentAddressStr: tempAddress,
                amount: toString(incognitoAmount),
                message: '',
            },
        ];
        isUseTokenFee ? (privacyPaymentInfoList = [...privacyPaymentInfoList, ...paymentInfoList]) : false;
        let storageData = {
            privacyFee,
            nativeFee,
            address: tempAddress,
            userFeeSelection,
            userFeeLevel,
            incognitoTxToPayOutsideChainFee: '',
        };
        const burnTx: TxHistoryModel = await token.bridgeBurningCentralized({
            nativeFee,
            privacyFee,
            privacyPaymentInfoList,
            nativePaymentInfoList: isUsedPRVFee ? [...paymentInfoList] : [],
            memo,
            txIdHandler: (rawTxId: string) =>
                dispatch(
                    actionAddStorageRawDataCentralized({
                        tx: {
                            burningTxId: rawTxId,
                            data: {
                                ...storageData,
                                incognitoTxToPayOutsideChainFee: rawTxId,
                            },
                        },
                    }),
                ),
        });
        if (toggleSaveRawBurnTx) {
            await delay(100000);
        }
        const burningTxId = burnTx.txId;
        if (!burningTxId) {
            throw new Error(`Burned token, but doesnt have txID, please check it`);
        }
        await dispatch(
            actionAddStorageDataCentralized({
                tx: {
                    burningTxId,
                    data: {
                        ...storageData,
                        incognitoTxToPayOutsideChainFee: burningTxId,
                    },
                },
            }),
        );
        await dispatch(
            actionRemoveStorageRawDataCentralized({
                burningTxId,
            }),
        );
        if (toggleSaveBurnTx) {
            await delay(100000);
        }
        const centralizedWithdrawData = {
            burningTxId,
            userFeeLevel,
            userFeeSelection,
            tempAddress,
            privacyFee,
            nativeFee,
            signPublicKey,
        };
        await token.bridgeWithdrawCentralized(centralizedWithdrawData);
        await dispatch(
            actionRemoveStorageDataCentralized({
                burningTxId,
            }),
        );
        const hc = getHistoryCacheDetail(burnTx);
        const confirmTx = {
            txId: burningTxId,
            paymentAddress,
            time: hc.timeFormated,
            amount: amountFormatedNoClip,
            symbol,
            fee: totalFeeFormatedNoClip,
            feeSymbol,
        }
        forceSendFinish(null, confirmTx)
        history.push(routeConfirmTx, { confirmTx });
    };
    const handleDecentralizedWithdraw = async (token: PrivacyToken) => {
        const { FeeAddress: masterAddress, ID: userFeeId } = data;
        if (!masterAddress) {
            throw new Error(`Can't not get master address`);
        }
        let burningTxId = '';

        const storageData = {
            incognitoAmount,
            requestedAmount,
            paymentAddress,
            walletAddress: account.key.keySet.paymentAddressKeySerialized,
            tokenId,
            incognitoTx: '',
            currencyType,
            erc20TokenAddress: contractId,
            id: userFeeId,
            userFeeSelection,
            userFeeLevel,
        };
        const burnTx: TxHistoryModelParam = await token.bridgeBurningDecentralized({
            outchainAddress: paymentAddress,
            burningAmount: incognitoAmount,
            nativeFee,
            privacyFee,
            privacyPaymentInfoList: isUseTokenFee
                ? [
                      {
                          paymentAddressStr: masterAddress,
                          amount: userFee,
                          message: '',
                      },
                  ]
                : [],
            nativePaymentInfoList: isUsedPRVFee
                ? [
                      {
                          paymentAddressStr: masterAddress,
                          amount: userFee,
                          message: '',
                      },
                  ]
                : [],
            memo,
            txIdHandler: (rawTxId: string) =>
                dispatch(
                    actionAddStorageRawDataDecentralized({
                        tx: {
                            burningTxId: rawTxId,
                            data: { ...storageData, incognitoTx: rawTxId },
                        },
                    }),
                ),
        });
        if (toggleSaveRawBurnTx) {
            await delay(100000);
        }
        burningTxId = burnTx.txId;
        if (!burningTxId) {
            throw new Error(`Burned token, but doesnt have txID, please check it`);
        }
        await dispatch(
            actionAddStorageDataDecentralized({
                tx: {
                    burningTxId,
                    data: {
                        ...storageData,
                        incognitoTx: burningTxId,
                    },
                },
            }),
        );
        await dispatch(
            actionRemoveStorageRawDataDecentralized({
                burningTxId,
            }),
        );
        if (toggleSaveBurnTx) {
            await delay(100000);
        }
        const decentralizedWithdrawData = {
            incognitoAmount,
            requestedAmount,
            paymentAddress,
            userFeeId,
            userFeeSelection,
            userFeeLevel,
            burningTxId,
            signPublicKey,
        };
        await token.bridgeWithdrawDecentralized(decentralizedWithdrawData);
        await dispatch(
            actionRemoveStorageDataDecentralized({
                burningTxId,
            }),
        );
        const hc = getHistoryCacheDetail(burnTx);
        const confirmTx = {
            txId: burningTxId,
            paymentAddress,
            time: hc.timeFormated,
            amount: amountFormatedNoClip,
            symbol,
            fee: totalFeeFormatedNoClip,
            feeSymbol,
        }
        forceSendFinish(null, confirmTx)
        history.push(routeConfirmTx, { confirmTx });
    };
    const handleUnShieldCrypto = async () => {
        try {
            const token = await account.getPrivacyTokenById(tokenId, bridgeTokens, chainTokens);
            if (isDecentralized) {
                await handleDecentralizedWithdraw(token);
            } else {
                await handleCentralizedWithdraw(token);
            }
        } catch (error) {
            forceSendFinish(error, null)
            throw error;
        }
    };
    return (
        <ErrorBoundary>
            <WrappedComponent {...{ ...props, handleUnShieldCrypto }} />
        </ErrorBoundary>
    );
};

export default enhance;
