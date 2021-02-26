import { Field } from 'redux-form';
import React from 'react';
import { Button } from 'src/components/Core';
import InputField from 'src/components/ReduxForm/InputField';
import { validator } from 'src/components/ReduxForm';
import withCreateAccount, { IMergeProps } from './CreateAccount.enhance';
import { Styled } from './CreateAccount.styled';

const CreateAccount = (props: IMergeProps & any) => {
    const { disabledForm, handleCreateAccount, createError } = props;
    const { handleSubmit, submitting } = props;
    return (
        <Styled>
            <form className="form-create-account" onSubmit={handleSubmit(handleCreateAccount)}>
                <Field
                    component={InputField}
                    name="accountName"
                    label="Enter a name for your keychain"
                    validate={[...validator.combinedAccountName]}
                    componentProps={{
                        autoFocus: true,
                        placeholder: 'Enter a name for your keychain',
                    }}
                />
                <Button
                    title={!submitting ? 'Create keychain' : 'Creating keychain...'}
                    disabled={disabledForm || submitting}
                    type="submit"
                />
                <div className="error-message">{createError}</div>
            </form>
        </Styled>
    );
};

export default withCreateAccount(CreateAccount);
