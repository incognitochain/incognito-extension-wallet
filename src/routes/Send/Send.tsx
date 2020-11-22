import React from 'react';
import { useSelector } from 'react-redux';
import { Field } from 'redux-form';
import { Button, Header } from 'src/components';
import { InputField } from 'src/components/ReduxForm';
import { ISendLanguage } from 'src/i18n';
import styled from 'styled-components';
import { translateByFieldSelector } from '../Configs';
import withSend from './Send.enhance';

interface IProps {}

const Styled = styled.div``;

const Send = (props: IProps) => {
  const translate: ISendLanguage = useSelector(translateByFieldSelector)(
    'send'
  );
  // const { handleSubmit, handleSend, disabledForm, submitting } = props;
  return (
    <Styled>
      <Header title={translate.headerTitle} />
      {/* <form onSubmit={handleSubmit(handleSend)}>
        <Field
          component={InputField}
          name='amount'
          label={translate.amount}
          componentProps={{
            autoFocus: true,
            placeholder: '0.0',
          }}
        />
        <Button
          title={translate.}
          disabled={disabledForm || submitting}
          type='submit'
        />
      </form> */}
    </Styled>
  );
};

export default withSend(Send);
