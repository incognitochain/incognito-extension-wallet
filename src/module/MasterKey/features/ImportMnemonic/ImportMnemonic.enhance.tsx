import React, { useCallback, useMemo, useState } from 'react';
import { compose } from 'recompose';
import { withLayout } from 'src/components/Layout';
import { batch, useDispatch, useSelector } from 'react-redux';
import { translateSelector } from 'src/module/Configs';
import { actionImportWallet } from 'src/module/Wallet';
import { actionChangePassword, actionCreatePassword, newPasswordSelector, passwordSelector } from 'src/module/Password';
import trim from 'lodash/trim';
import { sendPasswordToBackground } from 'src/utils/sendMessage';
import { validator } from 'src/utils';
import { chainURLSelector } from 'src/module/Preload';
import { IProps } from './ImportMnemonic.inteface';

const enhance = (WrappedComponent: any) => (props: IProps) => {
    const [masterKeyName, setMasterKeyName] = useState('');
    const [mnemonic, setMnemonic] = useState('');
    const [error, setError] = useState('');

    const translate = useSelector(translateSelector);
    const currentPass = useSelector(passwordSelector);
    const newPass = useSelector(newPasswordSelector);
    const chainURL = useSelector(chainURLSelector);

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

            if (pass) {
                await sendPasswordToBackground(newPass, chainURL);
            }
            batch(() => {
                dispatch(actionCreatePassword(''));
                dispatch(actionChangePassword(pass));
            });
        }
    };

    const handleChangeMasterKeyName = useCallback((e) => {
        const name = trim(e.target.value);

        setError('');
        setMasterKeyName(name);

        if (!validator.validateAlphaNumericText(name)) {
            return setError(errorDictionary.invalidMasterKeyName);
        }
    }, []);

    const handleChangeMnemonic = useCallback((e) => {
        setError('');
        setMnemonic(trim(e.target.value || '').replace(/\n/g, ' '));
    }, []);

    const handleKeyDown = useCallback(
        (e) => {
            const keyCode = e.keyCode || e.which;
            if (keyCode === 13) {
                handleVerify(e);
                return false;
            }
        },
        [masterKeyName, mnemonic],
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
            onKeyDown={handleKeyDown}
            isDisabled={isDisabled}
            error={error}
        />
    );
};

export default compose<IProps, any>(withLayout, enhance);
