import React from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'recompose';
import { InjectedFormProps, reduxForm, isInvalid, isSubmitting } from 'redux-form';
import trim from 'lodash/trim';
import { actionFetchCreateAccount } from 'src/module/Account/Account.actions';
import { actionToggleToast, TOAST_CONFIGS } from 'src/components';
import { switchingWalletSelector, walletIdSelector } from 'src/module/Wallet/Wallet.selector';
import { useFormValue } from 'src/hooks';
import { route as routeKeyChain } from 'src/module/Keychain';

interface IProps {
    walletId?: number;
}

interface TInner {
    disabledForm?: boolean;
    getAccountValidator?: () => any[];
    handleCreateAccount?: (props: any) => void;
    loading: boolean;
}

export interface IMergeProps extends IProps, TInner, InjectedFormProps {}

export const FORM_CONFIGS = {
    formName: 'form-create-account',
    accountName: 'accountName',
};

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    const { walletId: walletIdFromProps }: IProps = props;
    const { state }: { state: any } = useLocation();
    const { walletId: walletIdFromState } = state || {};
    const walletId = walletIdFromProps || walletIdFromState;
    if (!walletId) {
        return <Redirect to="/" />;
    }
    const selectedWalletId = useSelector(walletIdSelector);
    const switchingWallet = useSelector(switchingWalletSelector);
    const dispatch = useDispatch();
    const [accountName] = useFormValue({ formName: FORM_CONFIGS.formName, field: FORM_CONFIGS.accountName });
    const submitting = useSelector((state) => isSubmitting(FORM_CONFIGS.formName)(state));
    const isInvalidForm = useSelector((state) => isInvalid(FORM_CONFIGS.formName)(state));
    const disabledForm = isInvalidForm || submitting;
    const history = useHistory();
    const loading = selectedWalletId !== walletId || switchingWallet;
    const handleCreateAccount = async () => {
        try {
            if (disabledForm || submitting) {
                return;
            }
            await dispatch(actionFetchCreateAccount(trim(accountName), walletId));
            history.push(routeKeyChain);
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

    return <WrappedComponent {...{ ...props, disabledForm, handleCreateAccount, loading }} />;
};

export default compose<IMergeProps, any>(
    enhance,
    reduxForm({
        form: FORM_CONFIGS.formName,
    }),
);
