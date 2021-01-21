import React from 'react';
import { useSelector } from 'react-redux';
import { ILanguage } from 'src/i18n';
import styled from 'styled-components';
import { translateSelector } from 'src/module/Configs';
import { AppIcon, Button, Input, Layout } from 'src/components/Core';
import { CONSTANT_COLORS } from 'src/constants';
import enhance from './NewUser.enhance';
import { INewUserProps } from './NewUser.interface';
import { Header } from '../../../../components';

const Styled = styled.div`
    .title {
        font-size: 18px;
        font-weight: bold;
        color: ${CONSTANT_COLORS.BLACK};
        letter-spacing: 0;
    }

    .subtitle {
        margin-top: 15px;
        color: ${CONSTANT_COLORS.LIGHT_GREY};
    }

    .input-wrapper {
        margin: 30px 0;

        > div:first-child {
            margin-bottom: 15px;
        }
    }

    .actions {
        display: flex;

        button:first-child {
            margin-right: 2px;
        }

        button:last-child {
            margin-left: 2px;
        }
    }
`;

const NewUser = (props: INewUserProps) => {
    const {
        isReset,
        disabled,
        onChangePass,
        onChangeConfirmPass,
        onImport,
        onCreate,
        error,
        onBack,
        pass,
        confirmPass,
    } = props;
    const translate: ILanguage = useSelector(translateSelector);
    const dictionary = isReset ? translate.welcome.forgotPass : translate.welcome.newUser;
    return (
        <Layout header="">
            <Styled>
                <Header title=" " onGoBack={onBack} />
                <AppIcon />
                <div className="title">{dictionary.title1}</div>
                <div className="subtitle">{dictionary.title2}</div>
                <form className="input-wrapper">
                    <div>
                        <Input
                            autoComplete="new-password"
                            type="password"
                            placeholder={dictionary.createPass}
                            onChange={onChangePass}
                            defaultValue={pass}
                            toggleVisible
                        />
                    </div>
                    <div>
                        <Input
                            autoComplete="new-confirm-password"
                            type="password"
                            placeholder={dictionary.confirmCreatePass}
                            onChange={onChangeConfirmPass}
                            defaultValue={confirmPass}
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
                </form>
                <div className="actions">
                    <Button disabled={disabled} onClick={onImport} title={dictionary.importKey} />
                    <Button disabled={disabled} onClick={onCreate} title={dictionary.createKey} />
                </div>
                <div className="error-message">{error}</div>
            </Styled>
        </Layout>
    );
};

export default enhance(React.memo(NewUser));
