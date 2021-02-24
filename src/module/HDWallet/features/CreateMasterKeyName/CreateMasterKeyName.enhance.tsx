import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'recompose';
import { change, formValueSelector, InjectedFormProps, isValid, reduxForm } from 'redux-form';
import ErrorBoundary from 'src/components/ErrorBoundary';
import {
    actionSetMasterKeyName,
    actionToggleAgree,
    IReducer,
    createMasterKeySelector,
    actionSetStep,
    STEPS_CREATE,
} from 'src/module/HDWallet/features/CreateMasterKey';
import { FORM_CONFIGS } from './CreateMasterKeyName.constant';

interface IProps {}

interface TInner {
    onHandleChecked: () => any;
    disabled: boolean;
    onHandleReady: () => any;
}

export interface IMergeProps extends IProps, TInner, InjectedFormProps {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    const dispatch = useDispatch();
    const onHandleChecked = () => dispatch(actionToggleAgree());
    const { agree, masterKeyName: oldMasterKeyName }: IReducer = useSelector(createMasterKeySelector);
    const isFormValid = useSelector((state) => isValid(FORM_CONFIGS.formName)(state));
    const disabled = !isFormValid || !agree;
    const selector = formValueSelector(FORM_CONFIGS.formName);
    const masterKeyName = useSelector((state) => selector(state, FORM_CONFIGS.masterKeyName));
    const onHandleReady = () => dispatch(actionSetStep(STEPS_CREATE.createMasterKeyMnemonic));
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
    // TODO: mockup
    // React.useEffect(() => {
    //     dispatch(actionSetStep(STEPS_CREATE.createMasterKeyMnemonic));
    //     dispatch(actionSetMasterKeyName('MASTER'));
    // }, []);
    return (
        <ErrorBoundary>
            <WrappedComponent {...{ ...props, onHandleChecked, disabled, onHandleReady }} />
        </ErrorBoundary>
    );
};

export default compose<IProps, any>(
    enhance,
    reduxForm({
        form: FORM_CONFIGS.formName,
    }),
);
