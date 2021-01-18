import React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import Header from 'src/components/Header';
import { validator } from 'src/components/ReduxForm';
import InputField from 'src/components/ReduxForm/InputField';
import { Button } from 'src/components/Core';
import { Styled } from './ImportAccount.styled';
import withImportAccount, { TOutter } from './ImportAccount.enhance';

const ImportAccount = (props: any & TOutter & InjectedFormProps<any, TOutter>) => {
    const { handleImportAccount, readOnlyName, handleChangeRandomName, disabledForm, handleSubmit, submitting } = props;
    return (
        <Styled>
            <Header title="Import keychain" />
            <form className="form-import-account" onSubmit={handleSubmit(handleImportAccount)}>
                <div>
                    <Field
                        component={InputField}
                        componentProps={{
                            autoFocus: true,
                            placeholder: 'Enter a name for your keychain',
                        }}
                        name="accountName"
                        label="Enter a name for your keychain"
                        validate={[...validator.combinedAccountName]}
                        rightLabel={
                            readOnlyName && (
                                <button type="button" onClick={handleChangeRandomName}>
                                    Edit
                                </button>
                            )
                        }
                    />
                    <Field
                        component={InputField}
                        name="privateKey"
                        label="Private Key"
                        validate={[validator.required]}
                        componentProps={{
                            autoFocus: true,
                            placeholder: 'Enter private key',
                        }}
                    />
                    <Button
                        title={submitting ? 'Importing keychain...' : 'Import keychain'}
                        type="submit"
                        disabled={disabledForm || submitting}
                    />
                </div>
            </form>
        </Styled>
    );
};

export default withImportAccount(ImportAccount);
