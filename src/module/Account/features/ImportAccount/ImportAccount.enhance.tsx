import React from 'react';
import { compose } from 'recompose';
import { change, InjectedFormProps, reduxForm, isSubmitting, isInvalid } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { actionFetchImportAccount } from 'src/module/Account';
import { listAccountNameSelector } from 'src/module/Account/Account.selector';
import { randomName as handleRandomName } from 'src/utils/randomName';
import { withLayout } from 'src/components/Layout';
import { actionToggleToast, TOAST_CONFIGS } from 'src/components';
import { IAccountLanguage } from 'src/i18n';
import { translateByFieldSelector } from 'src/module/Configs/Configs.selector';
import { useFormValue } from 'src/hooks';
import { hasKeychainCreatedByMasterKey } from 'src/module/HDWallet/HDWallet.utils';
import { listSelector } from 'src/module/HDWallet/HDWallet.selector';
import { useHistory } from 'react-router-dom';
import AllMethodsImport from './ImportAccount.allMethods';

interface IProps {}

interface TInner {
    disabledForm: boolean;
    randomName: string;
    handleImportAccount: () => any;
}

export interface IMergeProps extends IProps, TInner, InjectedFormProps {}

export const FORM_CONFIGS = {
    formName: 'form-import-account',
    accountName: 'accountName',
    privateKey: 'privateKey',
};

const METHOD_IMPORT = {
    all: 0,
    masterless: 1,
    masterKey: 2,
};

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
    const dispatch = useDispatch();
    const accountNameList = useSelector(listAccountNameSelector);
    const translate: IAccountLanguage = useSelector(translateByFieldSelector)('account');
    const { import: importSuccess } = translate.success;
    const list = useSelector(listSelector)(true);
    const [accountName] = useFormValue({ formName: FORM_CONFIGS.formName, field: FORM_CONFIGS.accountName });
    const [privateKey] = useFormValue({ formName: FORM_CONFIGS.formName, field: FORM_CONFIGS.privateKey });
    const submitting = useSelector((state) => isSubmitting(FORM_CONFIGS.formName)(state));
    const isInvalidForm = useSelector((state) => isInvalid(FORM_CONFIGS.formName)(state));
    const disabledForm = isInvalidForm || submitting;
    const [methodImport, setMethod] = React.useState(-1);
    const randomName = handleRandomName(accountNameList);
    const history = useHistory();
    const handleImportAccount = async () => {
        try {
            if (disabledForm || submitting) {
                return;
            }
            const walletId = await hasKeychainCreatedByMasterKey(list, privateKey);
            if (walletId > -1) {
                // account belong some master key
                await dispatch(
                    actionFetchImportAccount({
                        accountName,
                        privateKey,
                        walletId,
                    }),
                );
                history.goBack();
                dispatch(
                    actionToggleToast({
                        toggle: true,
                        value: importSuccess,
                        type: TOAST_CONFIGS.success,
                    }),
                );
            } else {
                // toggle popup choose import to masterless or import master key
                setMethod(METHOD_IMPORT.all);
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
    React.useEffect(() => {
        dispatch(change(FORM_CONFIGS.formName, FORM_CONFIGS.accountName, randomName));
    }, []);
    if (methodImport === METHOD_IMPORT.all) {
        return (
            <AllMethodsImport
                {...{
                    onGoBack: () => setMethod(-1),
                    privateKey,
                    accountName,
                }}
            />
        );
    }
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

export default compose<IMergeProps, any>(
    withLayout,
    reduxForm({
        form: FORM_CONFIGS.formName,
    }),
    enhance,
);
