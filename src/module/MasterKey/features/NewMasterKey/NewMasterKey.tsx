import React from 'react';
import styled from 'styled-components';
import { VerifyMnemonic } from 'src/module/MasterKey';
import { IProps } from './NewMasterKey.inteface';
import enhance from './NewMasterKey.enhance';
import MasterKeyName from '../MasterKeyName';
import MasterKeyMnemonic from '../NewMnemonic';

const Styled = styled.div``;

const NewMasterKey = (props: IProps) => {
    const { onChangeMasterKeyName, onChangeMnemonic, masterKeyName, mnemonic } = props;

    let Component = MasterKeyName;

    if (masterKeyName) {
        Component = MasterKeyMnemonic;
    }

    if (mnemonic) {
        Component = VerifyMnemonic;
    }

    return (
        <Styled>
            <Component
                onChangeMasterKeyName={onChangeMasterKeyName}
                onChangeMnemonic={onChangeMnemonic}
                mnemonic={mnemonic}
                masterKeyName={masterKeyName}
            />
        </Styled>
    );
};

export default enhance(React.memo(NewMasterKey));
