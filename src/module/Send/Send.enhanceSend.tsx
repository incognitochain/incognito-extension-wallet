import React from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import convert from 'src/utils/convert';
import { useDispatch, useSelector } from 'react-redux';
import toString from 'lodash/toString';
import { bridgeTokensSelector, chainTokensSelector, ISelectedPrivacy, selectedPrivacySelector } from 'src/module/Token';
import { defaultAccountSelector } from 'src/module/Account';
import { AccountInstance, PaymentInfoModel } from 'incognito-js/build/web/browser';
import { useHistory } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import { actionToggleToast, TOAST_CONFIGS } from 'src/components';
import { actionFetchCacheHistory } from 'src/module/History';
import { floor } from 'lodash';
import { actionToggleModal } from 'src/components/Modal';
import LoadingTx from 'src/components/LoadingTx/LoadingTx';
import { sendDataSelector } from './Send.selector';
import { ISendData } from './Send.interface';
import { route as routeConfirmTx } from './features/ConfirmTx';

export interface TInner {
    // eslint-disable-next-line no-unused-vars
    handleSend: (values: { amount: string; toAddress: string; memo?: string }) => void;
}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
    const { forceSendFinish } = props;
    const dispatch = useDispatch();
    const history = useHistory();
    const selectedPrivacy: ISelectedPrivacy = useSelector(selectedPrivacySelector);
    const account: AccountInstance = useSelector(defaultAccountSelector);
    const chainTokens = useSelector(chainTokensSelector);
    const bridgeTokens = useSelector(bridgeTokensSelector);
    const { totalFee, isUseTokenFee, isUsedPRVFee, disabledForm }: ISendData = useSelector(sendDataSelector);
    const handleSend = async (values: { amount: string; toAddress: string; memo?: string }) => {
        try {
            const { amount, toAddress, memo = '' } = values;
            if (!amount || !toAddress || disabledForm) {
                return;
            }
            await dispatch(
                actionToggleModal({
                    data: <LoadingTx />,
                    isLoadingModal: true,
                }),
            );
            const fee = toString(totalFee);
            const originalAmount = convert.toOriginalAmount({
                humanAmount: amount,
                decimals: selectedPrivacy.pDecimals,
            });
            const paymentInfos: PaymentInfoModel[] = [
                {
                    paymentAddressStr: toAddress,
                    amount: new BigNumber(floor(originalAmount)).toString(),
                    message: memo,
                },
            ];
            let tx;
            if (selectedPrivacy.isNativeToken) {
                tx = await account.nativeToken.transfer({
                    paymentInfoList: paymentInfos,
                    nativeFee: fee,
                    memo,
                });
            } else {
                const token = await account.getPrivacyTokenById(selectedPrivacy.tokenId, bridgeTokens, chainTokens);
                tx = await token.transfer({
                    paymentInfoList: paymentInfos,
                    nativeFee: isUsedPRVFee ? fee : '',
                    privacyFee: isUseTokenFee ? fee : '',
                    memo,
                });
            }
            if (!tx) {
                throw new Error(`Failed`);
            }
            await dispatch(actionFetchCacheHistory());
            // send success
            forceSendFinish(null, tx);
            history.push(routeConfirmTx, {
                txId: tx.txId,
            });
        } catch (error) {
            // send fail
            forceSendFinish(error, null);
            dispatch(
                actionToggleToast({
                    toggle: true,
                    value: error?.message || JSON.stringify(error),
                    type: TOAST_CONFIGS.error,
                }),
            );
        } finally {
            await dispatch(actionToggleModal({}));
        }
    };
    return (
        <ErrorBoundary>
            <WrappedComponent {...{ ...props, handleSend }} />
        </ErrorBoundary>
    );
};

export default enhance;
