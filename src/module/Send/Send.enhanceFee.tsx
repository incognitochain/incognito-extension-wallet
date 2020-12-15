import debounce from 'lodash/debounce';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionToggleToast, TOAST_CONFIGS } from 'src/components';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { actionFetchFee } from './Send.actions';
import { ISendData } from './Send.interface';
import { ISendReducer } from './Send.reducer';
import { sendDataSelector, sendSelector } from './Send.selector';

export interface Tinner {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
  const dispatch = useDispatch();
  const { screen, isFetching }: ISendReducer = useSelector(sendSelector);
  const {
    // isIncognitoAddress,
    inputAddress: address,
    inputAmount: amount,
    inputMemo: memo,
  }: ISendData = useSelector(sendDataSelector);
  const handleChangeForm = async ({
    address,
    amount,
    memo,
    isFetching,
  }: // isExternalAddress,
  // isIncognitoAddress,
  {
    address: string;
    amount: string;
    memo: string;
    isFetching: boolean;
    //   isExternalAddress;
    // isIncognitoAddress: boolean;
  }) => {
    try {
      if (!amount || !address || isFetching) {
        return;
      }
      let screen = 'Send';
      //   if (isExternalAddress) {
      //     screen = 'UnShield';
      //   } else if (isIncognitoAddress) {
      //     screen = 'Send';
      //   }
      await dispatch(
        actionFetchFee({
          amount,
          address,
          screen,
          memo,
        })
      );
    } catch (error) {
      dispatch(
        actionToggleToast({
          toggle: true,
          value: error,
          type: TOAST_CONFIGS.error,
        })
      );
    }
  };

  const _handleChangeForm = React.useRef(debounce(handleChangeForm, 400));

  React.useEffect(() => {
    _handleChangeForm.current({
      address,
      amount,
      memo,
      isFetching,
      //   isExternalAddress,
      // isIncognitoAddress,
    });
  }, [
    address,
    amount,
    screen,
    memo,
    // isExternalAddress,
    // isIncognitoAddress,
  ]);
  return (
    <ErrorBoundary>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );
};

export default enhance;
