import React from 'react';
import trim from 'lodash/trim';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'recompose';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { useAccount, actionFetchCreateAccount } from 'src/module/Account';
import { translateByFieldSelector } from 'src/module/Configs/Configs.selector';
import { IAccountLanguage } from 'src/i18n';
import { actionClearAllModal } from 'src/components/Modal';
import { actionToggleToast, LoadingIcon, TOAST_CONFIGS } from 'src/components';
import { switchingWalletSelector, walletIdSelector } from 'src/module/Wallet/Wallet.selector';

interface IProps {
    walletId: number;
}

interface TInner {
    disabledForm?: boolean;
    getAccountValidator?: () => any[];
    handleCreateAccount?: (props: any) => void;
    errorCustom: string;
}

export interface IMergeProps extends IProps, TInner, InjectedFormProps {}

export const FORM_CONFIGS = {
    formName: 'form-create-account',
    accountName: 'accountName',
};

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    const { walletId }: IProps = props;
    const selectedWalletId = useSelector(walletIdSelector);
    const switchingWallet = useSelector(switchingWalletSelector);
    const dispatch = useDispatch();
    const { isFormValid, isAccountExist } = useAccount({
        form: FORM_CONFIGS,
    });
    const translate: IAccountLanguage = useSelector(translateByFieldSelector)('account');
    const { error } = translate;
    const errorCustom = isAccountExist ? error.keychainExisted : '';
    const disabledForm = !isFormValid || !!errorCustom;
    const handleCreateAccount = async (values: { accountName: string }) => {
        try {
            const { accountName } = values;
            if (disabledForm) {
                return;
            }
            await dispatch(actionFetchCreateAccount(trim(accountName), walletId));
            dispatch(actionClearAllModal());
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
    if (selectedWalletId !== walletId || switchingWallet) {
        return <LoadingIcon center />;
    }
    return <WrappedComponent {...{ ...props, disabledForm, handleCreateAccount, errorCustom }} />;
};

export default compose<IMergeProps, any>(
    enhance,
    reduxForm({
        form: FORM_CONFIGS.formName,
    }),
);
