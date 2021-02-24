import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { useDispatch, useSelector } from 'react-redux';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { mnemonicService } from 'incognito-js/build/web/browser';
import {
    createMasterKeySelector,
    actionSetMnemonic,
    actionSetStep,
    STEPS_CREATE,
} from 'src/module/HDWallet/features/CreateMasterKey';

interface IProps {}

interface TInner {
    onHandleVerifyMasterKeyMnemonic: () => any;
}

export interface IMergeProps extends IProps, TInner {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    const { mnemonic } = useSelector(createMasterKeySelector);
    const dispatch = useDispatch();
    const onHandleVerifyMasterKeyMnemonic = () => dispatch(actionSetStep(STEPS_CREATE.verifyMasterKeyMnemonic));
    React.useEffect(() => {
        if (isEmpty(mnemonic)) {
            dispatch(actionSetMnemonic(mnemonicService.newMnemonic()));
        }
    }, [mnemonic]);
    // TODO: mockup
    // React.useEffect(() => {
    //     onHandleVerifyMasterKeyMnemonic();
    // }, []);
    return (
        <ErrorBoundary>
            <WrappedComponent {...{ ...props, onHandleVerifyMasterKeyMnemonic }} />
        </ErrorBoundary>
    );
};

export default enhance;
