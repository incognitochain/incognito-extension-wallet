import React, { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { compose } from 'recompose';
import { translateSelector } from 'src/module/Configs';
import { useDispatch, useSelector } from 'react-redux';
import { useDetectClickOutside } from 'src/hooks';
import { actionToggleModal } from 'src/components/Modal';
import { IProps } from './PasswordModal.interface';
import { passwordSelector } from '../../Password.selector';

const enhance = (WrappedComponent: any) => (props: IProps) => {
    const wrapperRef = useRef(null);
    const { onSuccess } = props;

    const [userPass, setUserPass] = useState('');
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const password = useSelector(passwordSelector);
    const errorDictionary = useSelector(translateSelector).error;

    const handleChangePass = useCallback((e) => {
        setError('');
        setUserPass(e.target.value);
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (userPass !== password) {
            setError(errorDictionary.invalidPassword);
        } else {
            onSuccess();
        }
    };

    const handleClickOutside = () => {
        dispatch(actionToggleModal({}));
    };

    useDetectClickOutside(wrapperRef, handleClickOutside);

    useEffect(() => {
        if (!password) {
            onSuccess();
        }
    }, []);

    if (!password) {
        return null;
    }

    return (
        <WrappedComponent
            {...props}
            wrapperRef={wrapperRef}
            onSubmit={handleSubmit}
            onChangePass={handleChangePass}
            error={error}
        />
    );
};

export default compose<IProps, any>(enhance);
