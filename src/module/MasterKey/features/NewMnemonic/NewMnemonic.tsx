import React from 'react';
import { MasterKeyMnemonicComponent } from 'src/module/MasterKey/index';
import enhance from './NewMnemonic.enhance';
import { IProps } from './NewMnemonic.interface';

const NewMnemonic = (props: IProps) => {
    const { mnemonic, onNext } = props;
    return <MasterKeyMnemonicComponent mnemonic={mnemonic} onNext={onNext} />;
};

export default enhance(React.memo(NewMnemonic));
