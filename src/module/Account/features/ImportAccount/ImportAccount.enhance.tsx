import React from 'react';
import { compose } from 'recompose';
import trim from 'lodash/trim';
import { useDispatch, useSelector } from 'react-redux';
import { useAccount, actionFetchImportAccount, listAccountNameSelector } from 'src/module/Account';
import { change, reduxForm } from 'redux-form';
import { randomName as handleRandomName } from 'src/utils/randomName';
import { withLayout } from 'src/components/Layout';
import { useHistory, useLocation } from 'react-router-dom';
import { actionToggleToast, TOAST_CONFIGS } from 'src/components';
import { IAccountLanguage } from 'src/i18n';
import { translateByFieldSelector } from 'src/module/Configs';

export interface TOutter {
    disabledForm: boolean;
    randomName: string;
    handleChangeRandomName: () => void;
}

export const FORM_CONFIGS = {
    formName: 'form-import-account',
    accountName: 'accountName',
    privateKey: 'privateKey',
};

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location: any = useLocation();
    const params: {
        onGoBack?: () => void;
    } = location.state;
    const accountNameList = useSelector(listAccountNameSelector);
    const translate: IAccountLanguage = useSelector(translateByFieldSelector)('account');
    const { isFormValid, isAccountExist, isPrivateKeyExist } = useAccount({
        form: FORM_CONFIGS,
    });
    const disabledForm = !isFormValid;
    const randomName = React.useMemo(() => {
        return handleRandomName(accountNameList);
    }, [accountNameList]);
    const handleImportAccount = async (values: { accountName: string; privateKey: string }) => {
        try {
            if (disabledForm) {
                return;
            }
            if (isAccountExist || isPrivateKeyExist) {
                throw new Error('Account is exist');
            }
            const { accountName, privateKey } = values;
            await dispatch(actionFetchImportAccount(trim(accountName), trim(privateKey)));
            if (typeof params?.onGoBack === 'function') {
                params?.onGoBack();
            } else {
                history.goBack();
            }
            dispatch(
                actionToggleToast({
                    toggle: true,
                    value: translate.success.import,
                    type: TOAST_CONFIGS.success,
                }),
            );
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

    React.useEffect(() => {
        dispatch(change(FORM_CONFIGS.formName, FORM_CONFIGS.accountName, randomName));
    }, []);

    return (
        <WrappedComponent
            {...{
                ...props,
                randomName,
                handleImportAccount,
                disabledForm,
            }}
        />
    );
};

export default compose(
    withLayout,
    reduxForm<any, TOutter>({
        form: FORM_CONFIGS.formName,
    }),
    enhance,
);
