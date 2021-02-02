import React, { useCallback, useState } from 'react';
import { compose } from 'recompose';
import { withLayout } from 'src/components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { ImportMnemonic, NewMasterKey } from 'src/module/MasterKey';
import { actionCreatePassword, newPasswordSelector } from 'src/module/Password';
import { errorTranslateSelector } from 'src/module/Configs';
import { closeExtensionPopup, isTab, openAsTab } from 'src/utils';
import { INewUserProps } from './NewUser.interface';
import GetStarted from './GetStarted';

const enhance = (WrappedComponent: any) => (props: INewUserProps) => {
    const { isReset, onBack } = props;
    const [error, setError] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [isImport, setIsImport] = useState(false);
    const [getStarted, setGetStarted] = useState(isReset || isTab());
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

    const handleBack = () => {
        if (isReset) {
            onBack();
        } else {
            setGetStarted(false);
        }
    };

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

    const handleGetStarted = useCallback(() => {
        setGetStarted(true);
        closeExtensionPopup();
        if (!isTab()) {
            openAsTab();
        }
    }, []);

    if (!getStarted) {
        return <GetStarted onGetStarted={handleGetStarted} />;
    }

    if (isImport) {
        return (
            <ImportMnemonic
                onBack={() => {
                    setIsImport(false);
                    dispatch(actionCreatePassword(''));
                    setPass('');
                    setConfirmPass('');
                }}
            />
        );
    }

    if (appPassword) {
        return (
            <NewMasterKey
                onBack={() => {
                    dispatch(actionCreatePassword(''));
                    setPass('');
                    setConfirmPass('');
                }}
            />
        );
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
            onBack={handleBack}
            pass={pass}
            confirmPass={confirmPass}
        />
    );
};

export default compose<INewUserProps, any>(withLayout, enhance);
