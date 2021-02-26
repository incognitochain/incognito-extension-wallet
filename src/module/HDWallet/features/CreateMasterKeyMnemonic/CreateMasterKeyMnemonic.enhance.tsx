import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { useDispatch, useSelector } from 'react-redux';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { mnemonicService } from 'incognito-js/build/web/browser';
import {
    createMasterKeySelector,
    actionSetMnemonic,
    actionSetStepCreateMasterKey,
    STEPS_CREATE,
} from 'src/module/HDWallet/features/CreateMasterKey';
import { isMasterKeyMnemonicExistSelector } from 'src/module/HDWallet';

interface IProps {}

interface TInner {
    onHandleVerifyMasterKeyMnemonic: () => any;
}

export interface IMergeProps extends IProps, TInner {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    const { mnemonic } = useSelector(createMasterKeySelector);
    const isMasterKeyMnemonicExist = useSelector(isMasterKeyMnemonicExistSelector);
    const dispatch = useDispatch();
    const onHandleVerifyMasterKeyMnemonic = () =>
        dispatch(actionSetStepCreateMasterKey(STEPS_CREATE.verifyMasterKeyMnemonic));
    React.useEffect(() => {
        if (isEmpty(mnemonic) || isMasterKeyMnemonicExist(mnemonic)) {
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
