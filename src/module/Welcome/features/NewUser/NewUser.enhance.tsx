import React, { useCallback, useState } from 'react';
import { compose } from 'recompose';
import { withLayout } from 'src/components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { ImportMnemonic, NewMasterKey } from 'src/module/MasterKey';
import { actionCreatePassword, newPasswordSelector } from 'src/module/Password';
import { errorTranslateSelector } from 'src/module/Configs';
import { closeExtensionPopup, isTab, openAsTab } from 'src/utils';
import { formValueSelector, InjectedFormProps, isValid, reduxForm, reset } from 'redux-form';
import trim from 'lodash/trim';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import GetStarted from 'src/module/Welcome/features/GetStarted';
import { FORM_CONFIGS } from './NewUser.constant';

interface IProps {
    onBack: () => any;
    isReset: boolean;
}

interface TInner {
    onImport: () => any;
    disabled: boolean;
    handleSubmitForm: any;
    error: string;
}

export interface IMergeProps extends IProps, TInner, InjectedFormProps {}

const enhance = (WrappedComponent: any) => (props: IProps & any) => {
    const { isReset, onBack } = props;
    const selector = formValueSelector(FORM_CONFIGS.formName);
    const pass = trim(useSelector((state) => selector(state, FORM_CONFIGS.password)));
    const confirmPass = trim(useSelector((state) => selector(state, FORM_CONFIGS.confirmPassword)));
    const [isImport, setIsImport] = useState(false);
    const [getStarted, setGetStarted] = useState(isReset || isTab());
    const dispatch = useDispatch();
    const appPassword = useSelector(newPasswordSelector);
    const errorDictionary = useSelector(errorTranslateSelector);
    const isCorrectPassword = isEqual(pass, confirmPass);
    const isFormValid = useSelector((state) => isValid(FORM_CONFIGS.formName)(state));
    const error = isCorrectPassword
        ? ''
        : !isEmpty(pass) && !isEmpty(confirmPass)
        ? errorDictionary.invalidPassword
        : '';
    const disabled = !isFormValid || isEmpty(pass) || isEmpty(confirmPass) || !isCorrectPassword;
    const handleBack = () => {
        if (isReset) {
            onBack();
        } else {
            setGetStarted(false);
        }
    };
    const handleImport = () => setIsImport(true);
    const handleSubmitForm = (fn: () => any) => {
        if (!isCorrectPassword) {
            return;
        }
        dispatch(actionCreatePassword(pass));
        if (typeof fn === 'function') {
            fn();
        }
    };
    const handleGetStarted = useCallback(() => {
        setGetStarted(true);
        closeExtensionPopup();
        if (!isTab()) {
            openAsTab();
        }
    }, []);
    const handleGoBack = () => {
        dispatch(actionCreatePassword(''));
        dispatch(reset(FORM_CONFIGS.formName));
    };
    if (!getStarted) {
        return <GetStarted onGetStarted={handleGetStarted} />;
    }
    if (isImport) {
        return (
            <ImportMnemonic
                onBack={() => {
                    setIsImport(false);
                    handleGoBack();
                }}
            />
        );
    }
    if (appPassword) {
        return <NewMasterKey onBack={handleGoBack} />;
    }
    return (
        <WrappedComponent
            {...props}
            error={error}
            disabled={disabled}
            onImport={handleImport}
            onBack={handleBack}
            handleSubmitForm={handleSubmitForm}
        />
    );
};

export default compose<IMergeProps, any>(
    withLayout,
    reduxForm({
        form: FORM_CONFIGS.formName,
    }),
    enhance,
);
