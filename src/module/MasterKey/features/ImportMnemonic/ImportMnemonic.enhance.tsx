import React, { useCallback, useMemo, useState } from 'react';
import { compose } from 'recompose';
import { withLayout } from 'src/components/Layout';
import { batch, useDispatch, useSelector } from 'react-redux';
import { translateSelector } from 'src/module/Configs';
import { actionImportWallet } from 'src/module/Wallet';
import { actionChangePassword, actionCreatePassword, newPasswordSelector, passwordSelector } from 'src/module/Password';
import { trim } from 'lodash';
import { IProps } from './ImportMnemonic.inteface';

const enhance = (WrappedComponent: any) => (props: IProps) => {
    const [masterKeyName, setMasterKeyName] = useState('');
    const [mnemonic, setMnemonic] = useState('');
    const [error, setError] = useState('');

    const translate = useSelector(translateSelector);
    const currentPass = useSelector(passwordSelector);
    const newPass = useSelector(newPasswordSelector);

    const pass = newPass || currentPass;
    const dispatch = useDispatch();

    // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
    const errorDictionary = translate.error;

    const handleChangeMasterKeyName = useCallback((e) => {
        setError('');
        setMasterKeyName(trim(e.target.value));
    }, []);

    const handleChangeMnemonic = useCallback((e) => {
        setError('');
        setMnemonic(trim(e.target.value || '').replace(/\n/g, ' '));
    }, []);

    const isDisabled = useMemo(() => {
        return !masterKeyName || !mnemonic || mnemonic.split(' ').length !== 12;
    }, [mnemonic, masterKeyName]);

    const handleVerify = async (e: any) => {
        e.preventDefault();
        try {
            await dispatch(actionImportWallet(masterKeyName, mnemonic, pass));
        } catch {
            setError(errorDictionary.invalidMnemonic);
        }

        batch(() => {
            dispatch(actionCreatePassword(''));
            dispatch(actionChangePassword(pass));
        });
    };

    return (
        <WrappedComponent
            {...props}
            onChangeName={handleChangeMasterKeyName}
            onChangeMnemonic={handleChangeMnemonic}
            onVerify={handleVerify}
            isDisabled={isDisabled}
            error={error}
        />
    );
};

export default compose<IProps, any>(withLayout, enhance);
