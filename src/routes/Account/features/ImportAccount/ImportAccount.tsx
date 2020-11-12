import React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import Header from 'src/components/Header';
import { Styled } from './ImportAccount.styled';
import withImportAccount from './ImportAccount.enhance';
import { combinedAccountName, required } from 'src/components/ReduxForm';
import { TOutter } from './ImportAccount.enhance';
import InputField from 'src/components/ReduxForm/InputField';
import { Button } from 'src/components/Core';

const ImportAccount = (
  props: any & TOutter & InjectedFormProps<{}, TOutter>
) => {
  const {
    handleImportAccount,
    readOnlyName,
    handleChangeRandomName,
    disabledForm,
    handleSubmit,
    submitting,
  } = props;
  return (
    <Styled>
      <Header title='Import keychain' />
      <form
        className='form-import-account'
        onSubmit={handleSubmit(handleImportAccount)}
      >
        <div>
          <Field
            component={InputField}
            componentProps={{
              autoFocus: true,
              placeholder: 'Keychain name',
              readOnly: readOnlyName,
            }}
            name='accountName'
            label='Keychain name'
            validate={[...combinedAccountName]}
            rightLabel={
              readOnlyName && (
                <button onClick={handleChangeRandomName}>Edit</button>
              )
            }
          />
          <Field
            component={InputField}
            name='privateKey'
            label='Private Key'
            validate={[required]}
            componentProps={{
              autoFocus: true,
              placeholder: 'Enter private key',
            }}
          />
          <Button
            title={submitting ? 'Importing keychain...' : 'Import keychain'}
            type='submit'
            disabled={disabledForm || submitting}
          />
        </div>
      </form>
    </Styled>
  );
};

export default withImportAccount(ImportAccount);
