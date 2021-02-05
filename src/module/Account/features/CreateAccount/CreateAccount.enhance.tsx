import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAccount, actionFetchCreateAccount } from 'src/module/Account';
import trim from 'lodash/trim';
import { compose } from 'recompose';
import { reduxForm } from 'redux-form';
import { withLayout } from 'src/components/Layout';
import { translateByFieldSelector } from 'src/module/Configs';
import { IAccountLanguage } from 'src/i18n';
import { actionClearAllModal } from 'src/components/Modal';

interface IProps {}

export interface TOutter {
    disabledForm?: boolean;
    getAccountValidator?: () => any[];
    // eslint-disable-next-line no-unused-vars
    handleCreateAccount?: (props: any) => void;
}

export const FORM_CONFIGS = {
    formName: 'form-create-account',
    accountName: 'accountName',
};

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
    const [createError, setCreateError] = useState('');
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
            dispatch(actionClearAllModal());
        } catch (e) {
            setCreateError(e?.message || translate.error.create);
        }
    };

    return <WrappedComponent {...{ ...props, disabledForm, handleCreateAccount, createError }} />;
};

export default compose<IProps, TOutter>(
    enhance,
    reduxForm<any, TOutter>({
        form: FORM_CONFIGS.formName,
    }),
    withLayout,
);
