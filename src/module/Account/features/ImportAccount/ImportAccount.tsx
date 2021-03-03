import React from 'react';
import { Field } from 'redux-form';
import { validator } from 'src/components/ReduxForm';
import InputField from 'src/components/ReduxForm/InputField';
import { Button } from 'src/components/Core';
import { IAccountLanguage } from 'src/i18n';
import { useSelector } from 'react-redux';
import { translateByFieldSelector } from 'src/module/Configs/Configs.selector';
import { Header } from 'src/components';
import withImportAccount, { IMergeProps, FORM_CONFIGS } from './ImportAccount.enhance';
import { Styled } from './ImportAccount.styled';

const ImportAccount = (props: IMergeProps & any) => {
    const { handleImportAccount, disabledForm, handleSubmit, submitting }: IMergeProps = props;
    const translate: IAccountLanguage = useSelector(translateByFieldSelector)('account');
    const { title } = translate.import;
    const { placeholderName, placeholderPrivateKey } = translate.general;
    return (
        <Styled>
            <Header title={title} />
            <div className="main scroll-view">
                <form onSubmit={handleSubmit(handleImportAccount)}>
                    <div>
                        <Field
                            component={InputField}
                            componentProps={{
                                placeholder: placeholderName,
                            }}
                            name={FORM_CONFIGS.accountName}
                            validate={[...validator.combinedAccountName]}
                        />
                        <Field
                            component={InputField}
                            name={FORM_CONFIGS.privateKey}
                            validate={[validator.required]}
                            componentProps={{
                                placeholder: placeholderPrivateKey,
                            }}
                        />
                        <Button title={`${title}${submitting ? '...' : ''}`} type="submit" disabled={disabledForm} />
                    </div>
                </form>
            </div>
        </Styled>
    );
};

export default withImportAccount(ImportAccount);
