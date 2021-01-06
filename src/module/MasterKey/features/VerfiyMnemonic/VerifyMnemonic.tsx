import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Button, Mnemonic } from 'src/components';
import { ILanguage } from 'src/i18n';
import { translateSelector } from 'src/module/Configs';
import enhance from './VerifyMnemonic.enhance';
import { IProps } from './VerifyMnemonic.inteface';
import Words from './Words';

const Styled = styled.div`
    .user-mnemonic-words {
        margin: 30px 0;
    }
`;

const VerifyMnemonic = (props: IProps) => {
    const { selectedWords, words, error, onVerify, onToggleWord, isDisabled } = props;
    const translate: ILanguage = useSelector(translateSelector);
    const dictionary = translate.masterKey.verifyMnemonic;

    return (
        <Styled>
            <div>{dictionary.title}</div>
            <Words words={words} onToggleWord={onToggleWord} />
            <div className="user-mnemonic-words">
                <Mnemonic mnemonic={selectedWords} />
            </div>
            <Button
                onClick={onVerify}
                disabled={isDisabled}
                title={error || dictionary.createBtn}
                className="verify-btn"
            />
        </Styled>
    );
};

export default enhance(React.memo(VerifyMnemonic));
