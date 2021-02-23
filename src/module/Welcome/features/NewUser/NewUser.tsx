import React from 'react';
import { useSelector } from 'react-redux';
import { ILanguage } from 'src/i18n';
import styled from 'styled-components';
import { translateSelector } from 'src/module/Configs';
import { AppIcon, Button, Layout, Header } from 'src/components';
import { Field } from 'redux-form';
import { InputField, validator } from 'src/components/ReduxForm';
import { INPUT_FIELD } from 'src/components/ReduxForm/InputField';
import withNewUser, { IMergeProps } from './NewUser.enhance';
import { FORM_CONFIGS } from './NewUser.constant';

const Styled = styled.div`
    .subtitle {
        margin-top: 15px;
    }
    .input-wrapper {
        margin: 30px 0;
        > .input-password:first-child {
            margin-bottom: 15px;
        }
    }
    .actions {
        button:first-child {
            margin-right: 2px;
        }
        button:last-child {
            margin-left: 2px;
        }
    }
    .error {
        margin-top: 10px;
    }
`;

const validateInput = [validator.required, validator.minLength(10)];
const NewUser = (props: IMergeProps & any) => {
    const { isReset, disabled, onImport, onBack, handleSubmitForm, error }: IMergeProps = props;
    const translate: ILanguage = useSelector(translateSelector);
    const dictionary = isReset ? translate.welcome.forgotPass : translate.welcome.newUser;
    return (
        <Layout header="">
            <Styled>
                <Header title=" " onGoBack={onBack} />
                <AppIcon />
                <div className="fs-medium fw-bold">{dictionary.title1}</div>
                <div className="sub-text subtitle">{dictionary.title2}</div>
                <form className="input-wrapper">
                    <Field
                        component={InputField}
                        name={FORM_CONFIGS.password}
                        componentProps={{
                            placeholder: dictionary.createPass,
                            maxLength: 50,
                            autoFocus: true,
                        }}
                        inputType={INPUT_FIELD.password}
                        validate={[...validateInput]}
                    />
                    <Field
                        component={InputField}
                        name={FORM_CONFIGS.confirmPassword}
                        componentProps={{
                            placeholder: dictionary.createPass,
                            maxLength: 50,
                        }}
                        inputType={INPUT_FIELD.password}
                        validate={[...validateInput]}
                    />
                </form>
                <div className="actions flex">
                    <Button
                        disabled={disabled}
                        onClick={() => handleSubmitForm(onImport)}
                        title={dictionary.importKey}
                    />
                    <Button disabled={disabled} onClick={() => handleSubmitForm()} title={dictionary.createKey} />
                </div>
                {error && <p className="error fs-small">{error}</p>}
            </Styled>
        </Layout>
    );
};

export default withNewUser(React.memo(NewUser));
