import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'recompose';
import { change, InjectedFormProps, isValid, reduxForm } from 'redux-form';
import ErrorBoundary from 'src/components/ErrorBoundary';
import {
    actionSetMasterKeyName,
    actionToggleAgree,
    IReducer,
    createMasterKeySelector,
    actionSetStepCreateMasterKey,
    STEPS_CREATE,
} from 'src/module/HDWallet/features/CreateMasterKey';
import { useMasterKeyName } from 'src/module/HDWallet';
import { FORM_CONFIGS } from './CreateMasterKeyName.constant';

interface IProps {}

interface TInner {
    onHandleChecked: () => any;
    disabled: boolean;
    onHandleReady: () => any;
    errorCustom: string;
}

export interface IMergeProps extends IProps, TInner, InjectedFormProps {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    const dispatch = useDispatch();
    const onHandleChecked = () => dispatch(actionToggleAgree());
    const { agree, masterKeyName: oldMasterKeyName }: IReducer = useSelector(createMasterKeySelector);
    const isFormValid = useSelector((state) => isValid(FORM_CONFIGS.formName)(state));
    const { error: errorCustom, masterKeyName } = useMasterKeyName({
        formName: FORM_CONFIGS.formName,
        field: FORM_CONFIGS.masterKeyName,
    });
    const onHandleReady = () => dispatch(actionSetStepCreateMasterKey(STEPS_CREATE.createMasterKeyMnemonic));
    const disabled = !isFormValid || !agree || !!errorCustom;
    React.useEffect(() => {
        if (!disabled) {
            dispatch(actionSetMasterKeyName(masterKeyName));
        }
    }, [masterKeyName, disabled]);
    React.useEffect(() => {
        if (!isEmpty(oldMasterKeyName)) {
            dispatch(change(FORM_CONFIGS.formName, FORM_CONFIGS.masterKeyName, oldMasterKeyName));
        }
    }, [oldMasterKeyName]);
    return (
        <ErrorBoundary>
            <WrappedComponent {...{ ...props, onHandleChecked, disabled, onHandleReady, errorCustom }} />
        </ErrorBoundary>
    );
};

export default compose<IProps, any>(
    enhance,
    reduxForm({
        form: FORM_CONFIGS.formName,
    }),
);
