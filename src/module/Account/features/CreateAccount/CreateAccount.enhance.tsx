import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAccount, actionFetchCreateAccount } from 'src/module/Account';
import trim from 'lodash/trim';
import { useHistory } from 'react-router-dom';
import { compose } from 'recompose';
import { reduxForm } from 'redux-form';
import { withLayout } from 'src/components/Layout';
import { actionToggleToast, TOAST_CONFIGS } from 'src/components';
import { translateByFieldSelector } from 'src/module/Configs';
import { IAccountLanguage } from 'src/i18n';

interface IProps {}

export interface TOutter {
    disabledForm: boolean;
    getAccountValidator: () => any[];
    // eslint-disable-next-line no-unused-vars
    handleCreateAccount: (props: any) => void;
}

export const FORM_CONFIGS = {
    formName: 'form-create-account',
    accountName: 'accountName',
};

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { isFormValid, isAccountExist } = useAccount({
        form: FORM_CONFIGS,
    });
    const translate: IAccountLanguage = useSelector(translateByFieldSelector)('account');
    const disabledForm = !isFormValid;
    const handleCreateAccount = async (values: { accountName: string }) => {
        try {
            const { accountName } = values;
            if (disabledForm) {
                return;
            }
            if (isAccountExist) {
                throw new Error('Account is existed!');
            }
            await dispatch(actionFetchCreateAccount(trim(accountName)));
            dispatch(
                actionToggleToast({
                    toggle: true,
                    value: translate.success.create,
                    type: TOAST_CONFIGS.success,
                }),
            );
            history.goBack();
        } catch (e) {
            dispatch(
                actionToggleToast({
                    toggle: true,
                    value: e?.message || translate.error.create,
                    type: TOAST_CONFIGS.error,
                }),
            );
        }
    };
    return <WrappedComponent {...{ ...props, disabledForm, handleCreateAccount }} />;
};

export default compose<IProps, TOutter>(
    enhance,
    reduxForm<any, TOutter>({
        form: FORM_CONFIGS.formName,
    }),
    withLayout,
);
