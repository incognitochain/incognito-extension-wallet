import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { AppIcon, Button, Header, Input, TextArea } from 'src/components';
import { ILanguage } from 'src/i18n';
import { translateSelector } from 'src/module/Configs';
import { CONSTANT_COLORS } from 'src/constants';
import enhance from './ImportMnemonic.enhance';
import { IProps } from './ImportMnemonic.inteface';

const Styled = styled.div`
    .title {
        font-size: 18px;
        color: ${CONSTANT_COLORS.BLACK};
        font-weight: 500;
    }

    .form {
        margin-top: 30px;
        margin-bottom: 30px;
    }

    .input {
        margin-bottom: 15px;
    }
`;

const ImportMnemonic = (props: IProps) => {
    const { onChangeName, onChangeMnemonic, error, onVerify, isDisabled, onBack } = props;
    const translate: ILanguage = useSelector(translateSelector);
    const dictionary = translate.masterKey.importMnemonic;

    return (
        <Styled>
            <Header onGoBack={onBack} title=" " />
            <AppIcon />
            <div className="title">{dictionary.title}</div>
            <form className="form" autoComplete="off">
                <div className="input">
                    <Input
                        autoComplete="off"
                        placeholder={dictionary.nameInput}
                        onChange={onChangeName}
                        defaultValue=""
                    />
                </div>
                <div className="input">
                    <TextArea
                        autoComplete="off"
                        placeholder={dictionary.mnemonicInput}
                        onChange={onChangeMnemonic}
                        defaultValue=""
                    />
                </div>
                <input type="text" name="email" value="..." autoComplete="username email" className="hidden" readOnly />
            </form>
            <Button onClick={onVerify} disabled={isDisabled} title={error || dictionary.btn} className="verify-btn" />
        </Styled>
    );
};

export default enhance(React.memo(ImportMnemonic));
