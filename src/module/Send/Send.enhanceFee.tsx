import debounce from 'lodash/debounce';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionToggleToast, TOAST_CONFIGS } from 'src/components';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { actionFetchFee } from './Send.actions';
import { ISendData, ISendReducer } from './Send.interface';
import { sendDataSelector, sendSelector } from './Send.selector';

export interface Tinner {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
    const dispatch = useDispatch();
    const { screen, isFetching }: ISendReducer = useSelector(sendSelector);
    const { inputAddress, inputAmount, inputMemo }: ISendData = useSelector(sendDataSelector);
    const handleChangeForm = async (values: { address: string; amount: string; memo: string; fetching: boolean }) => {
        try {
            const { address, amount, memo, fetching } = values;
            if (!amount || !address || fetching) {
                return;
            }
            let defaultScreen = 'Send';
            //   if (isExternalAddress) {
            //     screen = 'UnShield';
            //   } else if (isIncognitoAddress) {
            //     screen = 'Send';
            //   }
            await dispatch(
                actionFetchFee({
                    amount,
                    address,
                    screen: defaultScreen,
                    memo,
                }),
            );
        } catch (error) {
            dispatch(
                actionToggleToast({
                    toggle: true,
                    value: error,
                    type: TOAST_CONFIGS.error,
                }),
            );
        }
    };

    const deHandleChangeForm = React.useRef(debounce(handleChangeForm, 400));

    React.useEffect(() => {
        deHandleChangeForm.current({
            address: inputAddress,
            amount: inputAmount,
            memo: inputMemo,
            fetching: isFetching,
        });
    }, [inputAddress, inputAmount, inputMemo, screen]);
    return (
        <ErrorBoundary>
            <WrappedComponent {...props} />
        </ErrorBoundary>
    );
};

export default enhance;
