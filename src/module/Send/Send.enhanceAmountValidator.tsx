import BigNumber from 'bignumber.js';
import debounce from 'lodash/debounce';
import React from 'react';
import { useSelector } from 'react-redux';
import ErrorBoundary from 'src/components/ErrorBoundary';
import convert from 'src/utils/convert';
import {
  ISelectedPrivacy,
  isTokenBySymbolSelector,
  selectedPrivacySelector,
} from 'src/module/Token';
import { sendDataSelector } from './Send.selector';
import { validator } from 'src/components/ReduxForm';
import { ISendData } from './Send.interface';
import { COINS } from 'src/constants';
import { Console } from 'console';

export interface TInner {
  validateAmount: () => any;
}

interface IState {
  maxAmountValidator: any;
  minAmountValidator: any;
}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
  const sendData: ISendData = useSelector(sendDataSelector);
  const selectedPrivacy: ISelectedPrivacy = useSelector(
    selectedPrivacySelector
  );
  const isTokenBySymbol = useSelector(isTokenBySymbolSelector);
  const {
    // fee,
    // feeUnitByTokenId,
    minAmount,
    maxAmount,
    maxAmountText,
    minAmountText,
    isIncognitoAddress,
  } = sendData;
  const initialState: IState = {
    maxAmountValidator: undefined,
    minAmountValidator: undefined,
  };
  const [state, setState] = React.useState({ ...initialState });
  const { maxAmountValidator, minAmountValidator } = state;
  const setFormValidator = debounce(async () => {
    const _maxAmount = convert.toNumber({
      text: maxAmountText,
      autoCorrect: true,
    });
    const _minAmount = convert.toNumber({
      text: minAmountText,
      autoCorrect: true,
    });
    let currentState = { ...state };
    if (Number.isFinite(_maxAmount)) {
      currentState = {
        ...state,
        maxAmountValidator: validator.maxValue(
          _maxAmount,
          new BigNumber(_maxAmount).toNumber() > 0
            ? `Max amount you can ${
                isIncognitoAddress ? 'send' : 'unshield'
              } is ${maxAmountText} ${
                selectedPrivacy?.symbol || selectedPrivacy?.pSymbol
              }`
            : 'Your balance is insufficient.'
        ),
      };
      await setState(currentState);
    }
    if (Number.isFinite(_minAmount)) {
      await setState({
        ...currentState,
        minAmountValidator: validator.minValue(
          _minAmount,
          `Amount must be larger than ${minAmountText} ${
            selectedPrivacy?.symbol || selectedPrivacy?.pSymbol
          }`
        ),
      });
    }
  }, 200);

  const getAmountValidator = () => {
    const val = [];
    if (minAmountValidator) val.push(minAmountValidator);
    if (maxAmountValidator) val.push(maxAmountValidator);
    if (
      selectedPrivacy?.isIncognitoToken ||
      isTokenBySymbol(COINS.CRYPTO_SYMBOL.NEO)
    ) {
      val.push(...validator.combinedNanoAmount);
    }
    val.push(...validator.combinedAmount);
    const values = Array.isArray(val) ? [...val] : [val];
    return values;
  };

  React.useEffect(() => {
    setFormValidator();
  }, [
    selectedPrivacy,
    // fee,
    // feeUnitByTokenId,
    maxAmount,
    minAmount,
  ]);

  const validateAmount: any[] = getAmountValidator();

  return (
    <ErrorBoundary>
      <WrappedComponent
        {...{
          ...props,
          validateAmount,
        }}
      />
    </ErrorBoundary>
  );
};

export default enhance;
