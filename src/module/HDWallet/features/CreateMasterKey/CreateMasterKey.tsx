import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import CreateMasterKeyName from 'src/module/HDWallet/features/CreateMasterKeyName';
import CreateMasterKeyMnemonic from 'src/module/HDWallet/features/CreateMasterKeyMnemonic';
import { AppIcon, Header } from 'src/components';
import VerifyMasterKeyMnemonic from 'src/module/HDWallet/features/VerifyMasterKeyMnemonic';
import { createMasterKeySelector } from './CreateMasterKey.selector';
import { IReducer } from './CreateMasterKey.interface';
import withCreate, { IMergeProps } from './CreateMasterKey.enhance';
import { STEPS_CREATE } from './CreateMasterKey.constant';

const Styled = styled.div`
    &.scroll-view {
        max-height: 540px;
    }
    .btn-container {
        margin-top: 30px;
    }
`;

const Create = (props: IMergeProps & any) => {
    const { step }: IReducer = useSelector(createMasterKeySelector);
    const { onGoBack }: IMergeProps = props;
    let Component: any = null;
    if (step === STEPS_CREATE.createMasterKeyName) {
        Component = CreateMasterKeyName;
    } else if (step === STEPS_CREATE.createMasterKeyMnemonic) {
        Component = CreateMasterKeyMnemonic;
    } else if (step === STEPS_CREATE.verifyMasterKeyMnemonic) {
        Component = VerifyMasterKeyMnemonic;
    }
    if (!Component) {
        return null;
    }
    return (
        <Styled className="scroll-view">
            <Header title=" " onGoBack={onGoBack} />
            <AppIcon />
            <Component {...props} />
        </Styled>
    );
};

export default withCreate(React.memo(Create));
