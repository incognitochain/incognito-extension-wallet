import { Field, InjectedFormProps } from 'redux-form';
import React from 'react';
import Header from 'src/components/Header';
import { Button } from 'src/components/Core';
import withCreateAccount, { TOutter } from './CreateAccount.enhance';
import { Styled } from './CreateAccount.styled';
import InputField from 'src/components/ReduxForm/InputField';
import { combinedAccountName } from 'src/components/ReduxForm';

const CreateAccount = (
  props: any & TOutter & InjectedFormProps<{}, TOutter>
) => {
  const { disabledForm, handleCreateAccount } = props;
  const { handleSubmit, submitting } = props;
  return (
    <Styled>
      <Header title='Create keychain' />
      <form
        className='form-create-account'
        onSubmit={handleSubmit(handleCreateAccount)}
      >
        <Field
          component={InputField}
          name='accountName'
          label='Keychain name'
          validate={[...combinedAccountName]}
          componentProps={{
            autoFocus: true,
            placeholder: 'Keychain name',
          }}
        />
        <Button
          title={!submitting ? 'Create keychain' : 'Creating keychain...'}
          disabled={disabledForm || submitting}
          type='submit'
        />
      </form>
    </Styled>
  );
};

export default withCreateAccount(CreateAccount);
