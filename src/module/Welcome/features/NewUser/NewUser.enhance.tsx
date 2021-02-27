import React, { useCallback, useState } from 'react';
import { compose } from 'recompose';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreatePassword, newPasswordSelector } from 'src/module/Password';
import { errorTranslateSelector } from 'src/module/Configs';
import { closeExtensionPopup, isTab, openAsTab } from 'src/utils';
import { formValueSelector, InjectedFormProps, isValid, reduxForm, reset } from 'redux-form';
import trim from 'lodash/trim';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import GetStarted from 'src/module/Welcome/features/GetStarted';
import CreateNewMasterKey, {
    actionSetStepCreateMasterKey,
    STEPS_CREATE,
} from 'src/module/HDWallet/features/CreateMasterKey';
import { ACTION_TYPES } from 'src/module/HDWallet';
import { actionTypeHDWalletSelector } from 'src/module/HDWallet/HDWallet.selector';
import { actionSetActionType } from 'src/module/HDWallet/HDWallet.actions';
import ImportMasterKey from 'src/module/HDWallet/features/ImportMasterKey';
import { FORM_CONFIGS } from './NewUser.constant';

interface IProps {
    onBack: () => any;
    isReset: boolean;
}

interface TInner {
    disabled: boolean;
    handleSubmitForm: (actionType: number) => any;
    error: string;
}

export interface IMergeProps extends IProps, TInner, InjectedFormProps {}

const enhance = (WrappedComponent: any) => (props: IProps & any) => {
    const { isReset, onBack } = props;
    const actionType = useSelector(actionTypeHDWalletSelector);
    const selector = formValueSelector(FORM_CONFIGS.formName);
    const pass = trim(useSelector((state) => selector(state, FORM_CONFIGS.password)));
    const confirmPass = trim(useSelector((state) => selector(state, FORM_CONFIGS.confirmPassword)));
    const [getStarted, setGetStarted] = useState(isReset || isTab());
    const dispatch = useDispatch();
    const newPassword = useSelector(newPasswordSelector);
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
    const handleSubmitForm = (type: number) => {
        if (disabled) {
            return;
        }
        dispatch(actionCreatePassword(pass));
        dispatch(actionSetActionType(type));
        switch (type) {
            case ACTION_TYPES.CREATE:
                dispatch(actionSetStepCreateMasterKey(STEPS_CREATE.createMasterKeyName));
                break;
            default:
                break;
        }
    };
    const handleGetStarted = useCallback(() => {
        setGetStarted(true);
        closeExtensionPopup();
        if (!isTab()) {
            openAsTab();
        }
    }, []);
    const onGoBack = () => {
        dispatch(actionCreatePassword(''));
        dispatch(reset(FORM_CONFIGS.formName));
    };
    // TODO: mockup
    // React.useEffect(() => {
    //     dispatch(actionCreatePassword('Toilatrieuphu25'));
    //     dispatch(actionSetActionType(ACTION_TYPES.IMPORT));
    // }, []);
    if (!getStarted) {
        return <GetStarted onGetStarted={handleGetStarted} />;
    }
    if (ACTION_TYPES.CREATE === actionType && newPassword) {
        return <CreateNewMasterKey onGoBack={onGoBack} />;
    }
    if (ACTION_TYPES.IMPORT === actionType && newPassword) {
        return <ImportMasterKey onGoBack={onGoBack} />;
    }
    return (
        <WrappedComponent
            {...props}
            error={error}
            disabled={disabled}
            onBack={handleBack}
            handleSubmitForm={handleSubmitForm}
        />
    );
};
export default compose<IMergeProps, any>(
    reduxForm({
        form: FORM_CONFIGS.formName,
    }),
    enhance,
);
