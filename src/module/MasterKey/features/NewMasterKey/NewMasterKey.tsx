import React from 'react';
import styled from 'styled-components';
import { VerifyMnemonic } from 'src/module/MasterKey';
import { Header, AppIcon } from 'src/components';
import { IProps } from './NewMasterKey.inteface';
import enhance from './NewMasterKey.enhance';
import MasterKeyName from '../MasterKeyName';
import MasterKeyMnemonic from '../NewMnemonic';

const Styled = styled.div``;

const NewMasterKey = (props: IProps) => {
    const { onChangeMasterKeyName, onChangeMnemonic, masterKeyName, mnemonic, onBack, agree, onAgree, step } = props;

    let Component = MasterKeyName;

    if (step === 1) {
        Component = MasterKeyMnemonic;
    }

    if (step === 2) {
        Component = VerifyMnemonic;
    }

    return (
        <Styled>
            <Header title=" " onGoBack={onBack} />
            <AppIcon />
            <Component
                onChangeMasterKeyName={onChangeMasterKeyName}
                onChangeMnemonic={onChangeMnemonic}
                mnemonic={mnemonic}
                masterKeyName={masterKeyName}
                agree={agree}
                onAgree={onAgree}
            />
        </Styled>
    );
};

export default enhance(React.memo(NewMasterKey));
