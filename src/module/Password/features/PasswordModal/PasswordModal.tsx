import React from 'react';
import styled from 'styled-components';
import { Button } from 'src/components';
import { useSelector } from 'react-redux';
import { translateByFieldSelector } from 'src/module/Configs';
import { InputField, validator } from 'src/components/ReduxForm';
import { Field } from 'redux-form';
import { useValidator } from 'src/hooks';
import { INPUT_FIELD } from 'src/components/ReduxForm/InputField';
import { darkModeSelector } from 'src/module/Setting';
import { COLORS } from 'src/styles';
import withPassword, { IMergeProps, FORM_CONFIGS } from './PasswordModal.enhance';

const Styled = styled.div<{ darkMode: boolean }>`
    .btn-container {
        margin-top: 15px;
        background: ${(props) => props?.darkMode && COLORS.black2};
    }
`;

const PasswordModal = (props: IMergeProps & any) => {
    const dictionary = useSelector(translateByFieldSelector)('password');
    const darkMode = useSelector(darkModeSelector);
    const { handleSubmitForm, handleSubmit, disabledForm, errorCustom }: IMergeProps = props;
    const [validatePassword] = useValidator({
        validator: [validator.required],
    });
    return (
        <Styled darkMode={darkMode}>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
                <Field
                    component={InputField}
                    name={FORM_CONFIGS.password}
                    componentProps={{
                        placeholder: dictionary.enterPasswordInput,
                        maxLength: 32,
                    }}
                    inputType={INPUT_FIELD.password}
                    validate={[...validatePassword]}
                    errorCustom={errorCustom}
                />
                <Button disabled={disabledForm} title={dictionary.enterPasswordBtn} type="submit" />
            </form>
        </Styled>
    );
};

export default withPassword(React.memo(PasswordModal));
