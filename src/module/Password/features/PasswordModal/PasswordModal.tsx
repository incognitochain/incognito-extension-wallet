import React from 'react';
import styled from 'styled-components';
import { Input, Button } from 'src/components';
import { useSelector } from 'react-redux';
import { translateByFieldSelector } from 'src/module/Configs';
import { IProps } from './PasswordModal.interface';
import enhance from './PasswordModal.enhance';

const Styled = styled.div`
    .submit {
        margin-top: 15px;
    }
`;

const PasswordModal = (props: IProps) => {
    const dictionary = useSelector(translateByFieldSelector)('password');

    const { onSubmit, error, onChangePass, wrapperRef } = props;

    return (
        <Styled ref={wrapperRef}>
            <form onSubmit={onSubmit}>
                <Input
                    type="password"
                    autoComplete="off"
                    placeholder={dictionary.enterPasswordInput}
                    onChange={onChangePass}
                    toggleVisible
                />
                <Button disabled={!!error} title={dictionary.enterPasswordBtn} type="submit" className="submit" />
                <p>{error}</p>
                <input type="text" name="email" value="..." autoComplete="username email" className="hidden" readOnly />
            </form>
        </Styled>
    );
};

export default enhance(React.memo(PasswordModal));
