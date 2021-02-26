import React from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { compose } from 'recompose';
import { isValid, reduxForm, reset } from 'redux-form';
import { actionToggleToast, TOAST_CONFIGS } from 'src/components';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { actionImportWallet } from 'src/module/Wallet';
import { actionChangePassword, actionCreatePassword, newPasswordSelector, passwordSelector } from 'src/module/Password';
import { actionToggleModal } from 'src/components/Modal';
import { useHistory, useLocation } from 'react-router-dom';
import { useMasterKeyMnemonic, useMasterKeyName } from 'src/module/HDWallet';
import { FORM_CONFIGS } from './ImportMasterKey.constant';

interface IProps {
    onGoBack: () => any;
}

interface TInner {
    disabled: boolean;
    errorCustom: string;
    onImportMasterKey: () => any;
    handleScanMnemonic: () => any;
    errorCustomName: string;
    errorCustomMnemonic: string;
}

export interface IMergeProps extends TInner, IProps {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    const isFormValid = useSelector((state) => isValid(FORM_CONFIGS.formName)(state));
    const newPass = useSelector(newPasswordSelector);
    const currentPass = useSelector(passwordSelector);
    const pass = newPass || currentPass;
    const dispatch = useDispatch();
    const history = useHistory();
    const { state }: { state: any } = useLocation();
    const { shouldGoBack } = state || {};
    const { error: errorCustomName, masterKeyName } = useMasterKeyName({
        formName: FORM_CONFIGS.formName,
        field: FORM_CONFIGS.masterKeyName,
    });
    const { error: errorCustomMnemonic, mnemonic } = useMasterKeyMnemonic({
        formName: FORM_CONFIGS.formName,
        field: FORM_CONFIGS.mnemonic,
    });
    const disabled = !isFormValid || !masterKeyName || !mnemonic || !!errorCustomName || !!errorCustomMnemonic;
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
                dispatch(reset(FORM_CONFIGS.formName));
            });
            if (shouldGoBack) {
                history.goBack();
            }
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
            <WrappedComponent
                {...{
                    ...props,
                    disabled,
                    errorCustomName,
                    errorCustomMnemonic,
                    onImportMasterKey,
                    handleScanMnemonic,
                }}
            />
        </ErrorBoundary>
    );
};

export default compose<IMergeProps, any>(
    enhance,
    reduxForm({
        form: FORM_CONFIGS.formName,
    }),
);