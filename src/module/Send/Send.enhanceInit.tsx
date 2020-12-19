import React from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from 'redux-form';
import { SpinnerContainer } from 'src/components';
import { ISelectedPrivacy, selectedPrivacySelector } from 'src/module/Token';
import { accountBalanceSelector } from 'src/module/Account';
import { isGettingBalanceByTokenIdSelector } from 'src/redux';
import format from 'src/utils/format';
import convert from 'src/utils/convert';
import { COINS } from 'src/constants';
import { FORM_CONFIGS } from './Send.constant';
import { actionInit, actionInitEstimateFee, actionFetchedMaxFeePrv, actionFetchedMaxFeePToken } from './Send.actions';
import { sendSelector } from './Send.selector';

const enhanceInit = (WrappedComp: React.FunctionComponent) => (props: any) => {
    const dispatch = useDispatch();
    const [init, setInit] = React.useState(false);
    const selectedPrivacy: ISelectedPrivacy = useSelector(selectedPrivacySelector);
    const accountBalance: number = useSelector(accountBalanceSelector);
    const isGettingBalance = useSelector(isGettingBalanceByTokenIdSelector)(selectedPrivacy.tokenId);
    const send = useSelector(sendSelector);
    const handleFetchedMaxPrv = async (accBalance: number) =>
        dispatch(
            actionFetchedMaxFeePrv({
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
        dispatch(
            actionFetchedMaxFeePToken({
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
            await dispatch(reset(FORM_CONFIGS.formName));
            await dispatch(actionInit());
            await dispatch(actionInitEstimateFee({ screen: 'Send' }));
            await handleFetchedMaxPrv(accountBalance);
            await handleFetchedMaxFeePToken(selectedPrivacy);
        } catch (error) {
            console.debug(error);
        } finally {
            setInit(true);
        }
    };

    React.useEffect(() => {
        handleFetchedMaxPrv(accountBalance);
    }, [accountBalance]);

    React.useEffect(() => {
        handleFetchedMaxFeePToken(selectedPrivacy);
    }, [selectedPrivacy?.amount, selectedPrivacy?.tokenId]);

    React.useEffect(() => {
        initData();
    }, [selectedPrivacy?.tokenId, accountBalance]);

    if (!selectedPrivacy || !send.init || !init || isGettingBalance) {
        return <SpinnerContainer animation="grow" />;
    }
    return (
        <ErrorBoundary>
            <WrappedComp {...props} />
        </ErrorBoundary>
    );
};

export default enhanceInit;
