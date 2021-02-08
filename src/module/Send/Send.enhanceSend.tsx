import React from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import convert from 'src/utils/convert';
import { useSelector } from 'react-redux';
import toString from 'lodash/toString';
import { bridgeTokensSelector, chainTokensSelector, ISelectedPrivacy, selectedPrivacySelector } from 'src/module/Token';
import { defaultAccountSelector } from 'src/module/Account';
import { AccountInstance, PaymentInfoModel } from 'incognito-js/build/web/browser';
import { useHistory } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import floor from 'lodash/floor';
import { sendDataSelector } from './Send.selector';
import { ISendData, ISendFormData } from './Send.interface';
import { route as routeConfirmTx } from './features/ConfirmTx';
import { getHistoryCacheDetailSelector, TxCacheHistoryModel } from '../History';

export interface TInner {
    // eslint-disable-next-line no-unused-vars
    handleSendAnonymously: (payload: ISendFormData) => any;
}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
    const { forceSendFinish } = props;
    const { totalFee, isUseTokenFee, isUsedPRVFee, disabledForm }: ISendData = useSelector(sendDataSelector);
    const history = useHistory();
    const selectedPrivacy: ISelectedPrivacy = useSelector(selectedPrivacySelector);
    const account: AccountInstance = useSelector(defaultAccountSelector);
    const chainTokens = useSelector(chainTokensSelector);
    const bridgeTokens = useSelector(bridgeTokensSelector);
    const getHistoryCacheDetail = useSelector(getHistoryCacheDetailSelector);
    const handleSendAnonymously = async (values: ISendFormData) => {
        try {
            const { amount, toAddress, memo = '' } = values;
            if (!amount || !toAddress || disabledForm) {
                return;
            }

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
            if (!tx.txId) {
                throw new Error(`Send success but hasn't txId!`);
            }
            // send success
            const hc: TxCacheHistoryModel | undefined = getHistoryCacheDetail(tx);
            if (hc) {
                const confirmTx = {
                    txId: hc.txId,
                    paymentAddress: hc.paymentAddress,
                    time: hc.timeFormated,
                    amount: hc.amountFormatedNoClip,
                    symbol: hc.symbol,
                    fee: hc.feeFormated,
                    feeSymbol: hc.feeSymbol,
                };
                history.push(routeConfirmTx, { confirmTx });
                forceSendFinish(null, confirmTx);
            }
        } catch (error) {
            // send fail
            forceSendFinish(error, null);
            throw error;
        }
    };
    return (
        <ErrorBoundary>
            <WrappedComponent {...{ ...props, handleSendAnonymously }} />
        </ErrorBoundary>
    );
};

export default enhance;
