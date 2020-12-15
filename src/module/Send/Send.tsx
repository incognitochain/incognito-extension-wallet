import React from 'react';
import { useSelector } from 'react-redux';
import { Field } from 'redux-form';
import { Button, Header } from 'src/components';
import { InputField } from 'src/components/ReduxForm';
import { ISendLanguage } from 'src/i18n';
import format from 'src/utils/format';
import styled from 'styled-components';
import { translateByFieldSelector } from 'src/module/Configs';
import withSend, { IMergeProps } from './Send.enhance';
import { sendDataSelector } from './Send.selector';

const Styled = styled.div``;

const Send = (props: IMergeProps) => {
  const translate: ISendLanguage = useSelector(translateByFieldSelector)(
    'send'
  );
  const { fee, feePDecimals } = useSelector(sendDataSelector);
  const {
    handleSubmit,
    handleSend,
    valid,
    submitting,
    validateAddress,
    validateAmount,
  } = props;
  return (
    <Styled>
      <Header title={translate.headerTitle} />
      <form onSubmit={handleSubmit(handleSend)}>
        <Field
          component={InputField}
          name='amount'
          label={translate.amount}
          validate={validateAmount}
          componentProps={{
            autoFocus: true,
            placeholder: '0.0',
          }}
        />
        <Field
          component={InputField}
          name='toAddress'
          label={translate.toAddress}
          validate={validateAddress}
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
              originalAmount: fee,
              decimals: feePDecimals,
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
          disabled={!valid || submitting}
          type='submit'
        />
      </form>
    </Styled>
  );
};

export default withSend(Send);
