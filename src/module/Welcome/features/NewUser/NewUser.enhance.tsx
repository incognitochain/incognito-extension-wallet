import React, { useCallback, useState } from 'react';
import { compose } from 'recompose';
import { withLayout } from 'src/components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { ImportMnemonic, NewMasterKey } from 'src/module/MasterKey';
import { actionCreatePassword, newPasswordSelector } from 'src/module/Password';
import { errorTranslateSelector } from 'src/module/Configs';
import { INewUserProps } from './NewUser.interface';
import GetStarted from './GetStarted';

const enhance = (WrappedComponent: any) => (props: INewUserProps) => {
    const { isReset } = props;
    const [error, setError] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [isImport, setIsImport] = useState(false);
    const [getStarted, setGetStarted] = useState(isReset);
    const dispatch = useDispatch();

    const appPassword = useSelector(newPasswordSelector);
    const errorDictionary = useSelector(errorTranslateSelector);

    const isDisabledButton = !pass || !confirmPass || !!error;

    const handlePassChange = useCallback((e) => {
        setPass(e.target.value);
        setError('');
    }, []);

    const handleConfirmPassChange = useCallback((e) => {
        setConfirmPass(e.target.value);
        setError('');
    }, []);

    const isCorrectPassword = () => {
        if (pass && pass.length < 10) {
            setError(errorDictionary.invalidPasswordLength);
            return false;
        }

        if (pass !== confirmPass) {
            setError(errorDictionary.invalidPassword);
            return false;
        }

        return true;
    };

    const handleImport = () => {
        if (isCorrectPassword()) {
            dispatch(actionCreatePassword(pass));
            setIsImport(true);
        }
    };

    const handleCreate = () => {
        if (isCorrectPassword()) {
            dispatch(actionCreatePassword(pass));
        }
    };

    if (!getStarted) {
        return <GetStarted onGetStarted={() => setGetStarted(true)} />;
    }

    if (isImport) {
        return <ImportMnemonic />;
    }

    if (appPassword) {
        return <NewMasterKey />;
    }

    return (
        <WrappedComponent
            {...props}
            onImport={handleImport}
            onCreate={handleCreate}
            onChangePass={handlePassChange}
            onChangeConfirmPass={handleConfirmPassChange}
            disabled={isDisabledButton}
            error={error}
        />
    );
};

export default compose<INewUserProps, any>(withLayout, enhance);
