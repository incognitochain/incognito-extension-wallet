import React from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { actionToggleToast, TOAST_CONFIGS } from 'src/components';
import ErrorBoundary from 'src/components/ErrorBoundary';
import {
    actionInitCreate,
    isVerifyMnemonicSelector,
    masterKeyNameSelector,
    mnemonicSelector,
} from 'src/module/HDWallet/features/CreateMasterKey';
import { actionChangePassword, actionCreatePassword, newPasswordSelector, passwordSelector } from 'src/module/Password';
import { actionImportWallet } from 'src/module/Wallet';

interface IProps {}

interface TInner {}

export interface IMergeProps extends IProps, TInner {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    const history = useHistory();
    const isVerifyMnemonic = useSelector(isVerifyMnemonicSelector);
    const mnemonic = useSelector(mnemonicSelector);
    const dispatch = useDispatch();
    const masterKeyName = useSelector(masterKeyNameSelector);
    const newPass = useSelector(newPasswordSelector);
    const currentPass = useSelector(passwordSelector);
    const pass = newPass || currentPass;
    const { state }: { state: any } = useLocation();
    const { shouldGoBack } = state || {};
    const handleVerifyMnemonic = async () => {
        try {
            if (!isVerifyMnemonic) {
                return;
            }
            await dispatch(actionImportWallet(masterKeyName, mnemonic, pass));
            batch(() => {
                dispatch(actionCreatePassword(''));
                dispatch(actionChangePassword(pass));
                dispatch(actionInitCreate());
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
            <WrappedComponent {...{ ...props, handleVerifyMnemonic }} />
        </ErrorBoundary>
    );
};

export default enhance;
