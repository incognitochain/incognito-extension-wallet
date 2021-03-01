import { Field } from 'redux-form';
import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'src/components/Core';
import InputField from 'src/components/ReduxForm/InputField';
import { validator } from 'src/components/ReduxForm';
import { translateByFieldSelector } from 'src/module/Configs/Configs.selector';
import { IAccountLanguage } from 'src/i18n';
import { Header } from 'src/components';
import withCreateAccount, { IMergeProps, FORM_CONFIGS } from './CreateAccount.enhance';
import { Styled } from './CreateAccount.styled';

const CreateAccount = (props: IMergeProps & any) => {
    const { disabledForm, handleCreateAccount }: IMergeProps = props;
    const { handleSubmit, submitting } = props;
    const translate: IAccountLanguage = useSelector(translateByFieldSelector)('account');
    const { title } = translate.create;
    const { placeholderName: placeholder } = translate.general;
    return (
        <Styled>
            <Header title={title} />
            <div className="main scroll-view">
                <form onSubmit={handleSubmit(handleCreateAccount)}>
                    <Field
                        component={InputField}
                        name={FORM_CONFIGS.accountName}
                        validate={[...validator.combinedAccountName]}
                        componentProps={{
                            placeholder,
                        }}
                    />
                    <Button title={`${title}${submitting ? '...' : ''}`} disabled={disabledForm} type="submit" />
                </form>
            </div>
        </Styled>
    );
};

export default withCreateAccount(CreateAccount);
