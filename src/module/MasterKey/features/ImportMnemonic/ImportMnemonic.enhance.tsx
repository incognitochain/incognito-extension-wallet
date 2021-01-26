import React, { useCallback, useMemo, useState } from 'react';
import { compose } from 'recompose';
import { withLayout } from 'src/components/Layout';
import { batch, useDispatch, useSelector } from 'react-redux';
import { translateSelector } from 'src/module/Configs';
import { actionImportWallet } from 'src/module/Wallet';
import { actionChangePassword, actionCreatePassword, newPasswordSelector, passwordSelector } from 'src/module/Password';
import { trim, last } from 'lodash';
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

    const errorDictionary = translate.error;

    const handleVerify = async (e: any) => {
        e.preventDefault();
        if (masterKeyName && mnemonic) {
            try {
                await dispatch(actionImportWallet(masterKeyName, mnemonic, pass));
            } catch {
                setError(errorDictionary.invalidMnemonic);
            }

            batch(() => {
                dispatch(actionCreatePassword(''));
                dispatch(actionChangePassword(pass));
            });
        }
    };

    const handleChangeMasterKeyName = useCallback((e) => {
        setError('');
        setMasterKeyName(trim(e.target.value));
    }, []);

    const handleChangeMnemonic = useCallback(
        (e) => {
            setError('');

            const { value } = e.target;
            if (last(value) === '\n') {
                handleVerify(e);
            } else {
                setMnemonic(trim(e.target.value || '').replace(/\n/g, ' '));
            }
        },
        [mnemonic],
    );

    const isDisabled = useMemo(() => {
        return !masterKeyName || !mnemonic || mnemonic.split(' ').length !== 12;
    }, [mnemonic, masterKeyName]);

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
