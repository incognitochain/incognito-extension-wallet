import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import { translateSelector } from 'src/module/Configs';
import { useSelector } from 'react-redux';
import { passwordSelector } from 'src/module/Password/Password.selector';
import { InjectedFormProps, isInvalid, reduxForm, getFormValues } from 'redux-form';
import { useFormValue } from 'src/hooks';

interface IProps {
    onSuccess: () => any;
}

interface TInner {
    disabledForm: boolean;
    handleSubmitForm: () => any;
    errorCustom: string;
}

export interface IMergeProps extends IProps, TInner, InjectedFormProps {}

export const FORM_CONFIGS = {
    formName: 'form-password-modal',
    password: 'password',
};

const enhance = (WrappedComponent: any) => (props: IProps & any) => {
    const { onSuccess }: IProps = props;
    const [errorCustom, setError] = useState('');
    const [userPass] = useFormValue({
        formName: FORM_CONFIGS.formName,
        field: FORM_CONFIGS.password,
    });
    const isFormInValid = useSelector((state) => isInvalid(FORM_CONFIGS.formName)(state));
    const formData = useSelector((state) => getFormValues(FORM_CONFIGS.formName)(state));
    const disabledForm = !!errorCustom || isFormInValid;
    const password = useSelector(passwordSelector);
    const errorDictionary = useSelector(translateSelector).error;
    const handleSubmitForm = () => {
        try {
            if (userPass !== password) {
                setError(errorDictionary.invalidPassword);
            } else {
                onSuccess();
            }
        } catch (error) {
            throw error;
        }
    };
    useEffect(() => {
        if (!password) {
            onSuccess();
        }
    }, []);
    useEffect(() => {
        setError('');
    }, [formData]);
    if (!password) {
        return null;
    }

    return <WrappedComponent {...{ ...props, handleSubmitForm, errorCustom, disabledForm }} />;
};

export default compose<IMergeProps, any>(
    reduxForm({
        form: FORM_CONFIGS.formName,
    }),
    enhance,
);
