import React from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { actionToggleToast, TOAST_CONFIGS } from 'src/components';
import ErrorBoundary from 'src/components/ErrorBoundary';
import {
    actionInitCreate,
    isVerifyMnemonicSelector,
    masterKeyNameSelector,
    mnemonicSelector,
} from 'src/module/HDWallet/features/CreateMasterKey';
import { actionChangePassword, actionCreatePassword, newPasswordSelector } from 'src/module/Password';
import { actionImportWallet } from 'src/module/Wallet';

interface IProps {}

interface TInner {}

export interface IMergeProps extends IProps, TInner {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    const isVerifyMnemonic = useSelector(isVerifyMnemonicSelector);
    const mnemonic = useSelector(mnemonicSelector);
    const dispatch = useDispatch();
    const masterKeyName = useSelector(masterKeyNameSelector);
    const pass = useSelector(newPasswordSelector);
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
