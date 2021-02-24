import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { themeSelector, translateSelector } from 'src/module/Configs';
import { IGlobalStyle } from 'src/styles';

const Styled = styled.div`
    background-color: ${(props: IGlobalStyle) => props.theme.inverseBody};
    padding: 15px;
    min-height: 70px;
    color: ${(props: IGlobalStyle) => props.theme.inverseText};
    border-radius: 5px;
    line-height: 24px;
    .hide-mnemonic {
        text-align: center;
    }
`;

interface IProps {
    mnemonic: string | Array<string>;
    hidden?: boolean;
    onClick?: () => void;
}

const Mnemonic = (props: IProps) => {
    const { mnemonic, hidden, onClick } = props;
    const translate = useSelector(translateSelector);
    const dictionary = translate.masterKey.showMnemonic;
    const theme = useSelector(themeSelector);
    const renderContent = () => {
        if (hidden) {
            return <div className="hide-mnemonic">{dictionary.hiddenText}</div>;
        }
        let words;
        if (typeof mnemonic === 'object') {
            words = mnemonic.join(' ');
        } else {
            words = mnemonic;
        }
        return words;
    };
    return (
        <Styled theme={theme} className="mnemonic-container fw-medium" onClick={onClick}>
            {renderContent()}
        </Styled>
    );
};

export default React.memo(Mnemonic);
