import React, { useCallback, useState } from 'react';
import { compose } from 'recompose';
import { withLayout } from 'src/components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { actionLogin } from 'src/module/Password';
import { errorTranslateSelector } from 'src/module/Configs';
import { useHistory } from 'react-router-dom';
import { IOldUserProps } from './OldUser.interface';

const enhance = (WrappedComponent: any) => (props: IOldUserProps) => {
    const [pass, setPass] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const errorDictionary = useSelector(errorTranslateSelector);
    const history = useHistory();
    const isDisabledButton = !pass || loading || !!error;
    const handlePassChange = useCallback((e) => {
        setPass(e.target.value);
        setError('');
    }, []);

    const handleLogin = async (event: any) => {
        event.preventDefault();
        try {
            setLoading(true);
            await dispatch(actionLogin(pass));
            history.push('/');
        } catch (e) {
            setError(errorDictionary.invalidMnemonic);
        } finally {
            setLoading(false);
        }
    };
    return (
        <WrappedComponent
            {...props}
            onNext={handleLogin}
            onChangePass={handlePassChange}
            disabled={isDisabledButton}
            error={error}
        />
    );
};

export default compose<IOldUserProps, any>(withLayout, enhance);
