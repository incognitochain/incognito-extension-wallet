import { isNumber } from 'lodash';
import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { change, Field, InjectedFormProps } from 'redux-form';
import { Button, Header } from 'src/components';
import { InputField } from 'src/components/ReduxForm';
import { COINS } from 'src/constants';
import { ISendLanguage } from 'src/i18n';
import convert from 'src/utils/convert';
import format from 'src/utils/format';
import styled from 'styled-components';
import { translateByFieldSelector } from '../Configs';
import { decimalSeparatorSelector, groupSeparatorSelector } from '../Preload';
import withSend, { FORM_CONFIGS, TOutter } from './Send.enhance';
import { MAX_FEE_PER_TX } from './Send.utils';

const Styled = styled.div``;

const Send = (props: any & TOutter & InjectedFormProps<{}, TOutter>) => {
  const translate: ISendLanguage = useSelector(translateByFieldSelector)(
    'send'
  );
  const { handleSubmit, handleSend, disabledForm, submitting } = props;
  const dispatch = useDispatch();
  const decimalSeparator = useSelector(decimalSeparatorSelector);
  const groupSeparator = useSelector(groupSeparatorSelector);
  return (
    <Styled>
      <Header title={translate.headerTitle} />
      <form onSubmit={handleSubmit(handleSend)}>
        <Field
          component={InputField}
          name='amount'
          label={translate.amount}
          componentProps={{
            autoFocus: true,
            placeholder: '0.0',
            // onChange: (e: ChangeEvent<HTMLInputElement>) => {
            //   const value: string = e.target.value;
            //   if (isNumber(value)) {
            //     dispatch(
            //       change(FORM_CONFIGS.formName, FORM_CONFIGS.amount, value)
            //     );
            //   }
            // },
          }}
        />
        <Field
          component={InputField}
          name='toAddress'
          label={translate.toAddress}
          componentProps={{
            placeholder: translate.incognitoAddress,
          }}
        />
        <Field
          component={InputField}
          name='fee'
          label={translate.fee}
          componentProps={{
            placeholder: format.formatAmount({
              amount: MAX_FEE_PER_TX,
              decimals: COINS.PRV.pDecimals,
              groupSeparator,
              decimalSeparator,
              clipAmount: false,
              decimalDigits: false,
            }),
            readOnly: true,
          }}
        />
        <Field
          component={InputField}
          name='memo'
          label={translate.memo}
          componentProps={{
            placeholder: translate.placeholderMemo,
          }}
        />
        <Button
          title={'Send anonymously'}
          disabled={disabledForm || submitting}
          type='submit'
        />
      </form>
    </Styled>
  );
};

export default withSend(Send);
