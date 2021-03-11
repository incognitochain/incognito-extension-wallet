import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ILanguage } from 'src/i18n';
import styled from 'styled-components';
import { translateSelector } from 'src/module/Configs';
import { AppIcon, Button, Input, Layout } from 'src/components';
import { IGlobalStyle } from 'src/styles';
import { actionToggleForgetPassword } from 'src/module/Password';
import enhance from './OldUser.enhance';
import { IOldUserProps } from './OldUser.interface';

const Styled = styled.div`
    .title {
        font-size: 18px;
        font-weight: bold;
        color: ${(props: IGlobalStyle) => props.theme.text};
        letter-spacing: 0;
    }

    .input-wrapper {
        margin: 30px 0;

        > div:first-child {
            margin-bottom: 15px;
        }
    }

    .forgot-pass {
        margin-top: 25px;
        cursor: pointer;
    }
`;

const OldUser = (props: IOldUserProps) => {
    const { disabled, onChangePass, onNext, onForgot, error } = props;
    const translate: ILanguage = useSelector(translateSelector);
    const dictionary = translate.welcome.oldUser;
    const dispatch = useDispatch();
    const onForgotPassword = () => {
        dispatch(actionToggleForgetPassword(true));
        onForgot();
    };
    return (
        <Layout header="">
            <Styled>
                <AppIcon />
                <div className="title">{dictionary.title}</div>
                <form className="input-wrapper" onSubmit={onNext}>
                    <div>
                        <Input
                            autoComplete="new-password"
                            type="password"
                            placeholder={dictionary.input}
                            onChange={onChangePass}
                            defaultValue=""
                            toggleVisible
                        />
                    </div>
                    <input
                        type="text"
                        name="email"
                        value="..."
                        autoComplete="username email"
                        className="hidden"
                        readOnly
                    />
                    <Button disabled={disabled} onClick={onNext} title={error || dictionary.btn} type="submit" />
                </form>
                <div onClick={onForgotPassword} className="forgot-pass">
                    {dictionary.forgotPass}
                </div>
            </Styled>
        </Layout>
    );
};

export default enhance(React.memo(OldUser));
