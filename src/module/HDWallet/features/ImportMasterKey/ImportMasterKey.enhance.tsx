import React from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { compose } from 'recompose';
import { isValid, reduxForm } from 'redux-form';
import { actionToggleToast, TOAST_CONFIGS } from 'src/components';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { useFormValue } from 'src/hooks';
import { IHDWalletLanguage } from 'src/i18n';
import { translateByFieldSelector } from 'src/module/Configs';
import { validateMnemonic } from 'src/module/HDWallet';
import { actionImportWallet } from 'src/module/Wallet';
import { actionChangePassword, actionCreatePassword, newPasswordSelector } from 'src/module/Password';
import { actionToggleModal } from 'src/components/Modal';
import { FORM_CONFIGS } from './ImportMasterKey.constant';

interface IProps {
    onGoBack: () => any;
}

interface TInner {
    disabled: boolean;
    errorCustom: string;
    onImportMasterKey: () => any;
    handleScanMnemonic: () => any;
}

export interface IMergeProps extends TInner, IProps {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    const isFormValid = useSelector((state) => isValid(FORM_CONFIGS.formName)(state));
    const translate: IHDWalletLanguage = useSelector(translateByFieldSelector)('hdWallet');
    const pass = useSelector(newPasswordSelector);
    const dispatch = useDispatch();
    const { invalidMnemonic } = translate.error;
    const [masterKeyName] = useFormValue({
        formName: FORM_CONFIGS.formName,
        field: FORM_CONFIGS.masterKeyName,
    });
    const [mnemonic] = useFormValue({
        formName: FORM_CONFIGS.formName,
        field: FORM_CONFIGS.mnemonic,
    });
    const isValidMnemonic = validateMnemonic(mnemonic);
    const errorCustom = !isValidMnemonic ? invalidMnemonic : '';
    const disabled = !isFormValid || !masterKeyName || !mnemonic || !isValidMnemonic;
    const handleScanMnemonic = () => dispatch(actionToggleModal({}));
    const onImportMasterKey = async () => {
        try {
            if (disabled) {
                return;
            }
            await dispatch(actionImportWallet(masterKeyName, mnemonic, pass));
            batch(() => {
                dispatch(actionCreatePassword(''));
                dispatch(actionChangePassword(pass));
            });
        } catch (error) {
            dispatch(
                actionToggleToast({
                    toggle: true,
                    value: error,
                    type: TOAST_CONFIGS.error,
                }),
            );
        }
    };
    return (
        <ErrorBoundary>
            <WrappedComponent {...{ ...props, disabled, errorCustom, onImportMasterKey, handleScanMnemonic }} />
        </ErrorBoundary>
    );
};

export default compose<IMergeProps, any>(
    enhance,
    reduxForm({
        form: FORM_CONFIGS.formName,
    }),
);
