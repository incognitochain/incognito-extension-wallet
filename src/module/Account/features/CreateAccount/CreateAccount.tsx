import { Field } from 'redux-form';
import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'src/components/Core';
import InputField from 'src/components/ReduxForm/InputField';
import { validator } from 'src/components/ReduxForm';
import { translateByFieldSelector } from 'src/module/Configs/Configs.selector';
import { IAccountLanguage } from 'src/i18n';
import withCreateAccount, { IMergeProps, FORM_CONFIGS } from './CreateAccount.enhance';
import { Styled } from './CreateAccount.styled';

const CreateAccount = (props: IMergeProps & any) => {
    const { disabledForm, handleCreateAccount, errorCustom }: IMergeProps = props;
    const { handleSubmit, submitting } = props;
    const translate: IAccountLanguage = useSelector(translateByFieldSelector)('account');
    const { placeholder, title } = translate.create;
    return (
        <Styled>
            <form onSubmit={handleSubmit(handleCreateAccount)}>
                <Field
                    component={InputField}
                    name={FORM_CONFIGS.accountName}
                    validate={[...validator.combinedAccountName]}
                    componentProps={{
                        placeholder,
                    }}
                    errorCustom={errorCustom}
                />
                <Button title={`${title}${submitting ? '...' : ''}`} disabled={disabledForm} type="submit" />
            </form>
        </Styled>
    );
};

export default withCreateAccount(CreateAccount);
