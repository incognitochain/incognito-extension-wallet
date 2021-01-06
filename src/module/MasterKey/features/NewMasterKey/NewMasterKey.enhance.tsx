import React, { useCallback, useState } from 'react';
import { compose } from 'recompose';
import { withLayout } from 'src/components/Layout';
import { IProps } from './NewMasterKey.inteface';

const enhance = (WrappedComponent: any) => (props: IProps) => {
    const [masterKeyName, setMasterKeyName] = useState('');
    const [mnemonic, setMnemonic] = useState('');

    const handleChangeName = useCallback((name: string) => {
        setMasterKeyName(name);
    }, []);

    const handleChangeMnemonic = useCallback((newMnemonic: string) => {
        setMnemonic(newMnemonic);
    }, []);

    return (
        <WrappedComponent
            {...props}
            mnemonic={mnemonic}
            masterKeyName={masterKeyName}
            onChangeMasterKeyName={handleChangeName}
            onChangeMnemonic={handleChangeMnemonic}
        />
    );
};

export default compose<IProps, any>(withLayout, enhance);
