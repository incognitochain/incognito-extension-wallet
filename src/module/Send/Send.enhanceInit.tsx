import React from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { batch, useDispatch, useSelector } from 'react-redux';
import { reset } from 'redux-form';
import { actionToggleToast, TOAST_CONFIGS } from 'src/components';
import { actionSetSelectedToken, ISelectedPrivacy, selectedPrivacySelector } from 'src/module/Token';
import { accountBalanceSelector, actionGetAccountBalance, defaultAccountSelector } from 'src/module/Account';
import { isGettingBalanceByTokenIdSelector } from 'src/redux/selector';
import format from 'src/utils/format';
import convert from 'src/utils/convert';
import { COINS } from 'src/constants';
import { actionGetBalanceByTokenId } from 'src/redux/actions';
import { walletSelector } from 'src/module/Wallet';
import { Redirect, useParams } from 'react-router-dom';
import { FORM_CONFIGS } from './Send.constant';
import {
    actionInit,
    actionInitEstimateFee,
    actionFetchedMaxNativeFee,
    actionFetchedMaxPrivacyFee,
} from './Send.actions';
import { sendSelector } from './Send.selector';

export interface TInnerInit {
    isInitingForm: boolean;
}

const enhanceInit = (WrappedComp: React.FunctionComponent) => (props: any) => {
    const dispatch = useDispatch();
    const [init, setInit] = React.useState(false);
    const params: any = useParams();
    const { id: tokenId } = params;
    if (!tokenId) {
        return <Redirect to="/" />;
    }
    const selectedPrivacy: ISelectedPrivacy = useSelector(selectedPrivacySelector);
    const account = useSelector(defaultAccountSelector);
    const wallet = useSelector(walletSelector);
    const accountBalance: number = useSelector(accountBalanceSelector);
    const tokenBalance: number = selectedPrivacy?.amount;
    const isGettingBalance = useSelector(isGettingBalanceByTokenIdSelector)(selectedPrivacy.tokenId);
    const send = useSelector(sendSelector);
    const isInitingForm = !selectedPrivacy || !send.init || !init || isGettingBalance;
    const handleFetchedMaxPrv = async (accBalance: number) =>
        dispatch(
            actionFetchedMaxNativeFee({
                maxFeePrv: accBalance,
                maxFeePrvText: format.toFixed({
                    number: convert.toHumanAmount({
                        originalAmount: accBalance,
                        decimals: COINS.PRV.pDecimals,
                    }),
                    decimals: COINS.PRV.pDecimals,
                }),
            }),
        );

    const handleFetchedMaxFeePToken = async (pToken: ISelectedPrivacy) =>
        pToken.isToken &&
        dispatch(
            actionFetchedMaxPrivacyFee({
                amount: pToken.amount,
                amountText: format.toFixed({
                    number: convert.toHumanAmount({
                        originalAmount: pToken.amount,
                        decimals: pToken.pDecimals,
                    }),
                    decimals: pToken.pDecimals,
                }),
            }),
        );

    const initData = async () => {
        if (init) {
            return;
        }
        try {
            setInit(false);
            batch(() => {
                dispatch(reset(FORM_CONFIGS.formName));
                dispatch(actionGetBalanceByTokenId());
                dispatch(actionGetAccountBalance());
                dispatch(actionInit());
                dispatch(actionInitEstimateFee({ screen: 'Send' }));
                handleFetchedMaxPrv(accountBalance);
                handleFetchedMaxFeePToken(selectedPrivacy);
            });
        } catch (error) {
            dispatch(actionToggleToast({ toggle: true, value: error, type: TOAST_CONFIGS.error }));
        } finally {
            setInit(true);
        }
    };
    React.useEffect(() => {
        if (init && !!accountBalance) {
            handleFetchedMaxPrv(accountBalance);
        }
    }, [account, accountBalance, init]);

    React.useEffect(() => {
        if (init && !!tokenBalance) {
            handleFetchedMaxFeePToken(selectedPrivacy);
        }
    }, [tokenBalance, selectedPrivacy?.tokenId, init]);

    React.useEffect(() => {
        initData();
    }, [selectedPrivacy?.tokenId, wallet, account]);
    React.useEffect(() => {
        if (tokenId !== selectedPrivacy.tokenId) {
            dispatch(actionSetSelectedToken(tokenId));
        }
    }, [tokenId]);
    return (
        <ErrorBoundary>
            <WrappedComp {...{ ...props, isInitingForm }} />
        </ErrorBoundary>
    );
};

export default enhanceInit;
