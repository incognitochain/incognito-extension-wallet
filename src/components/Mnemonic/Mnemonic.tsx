import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { themeSelector, translateByFieldSelector } from 'src/module/Configs';
import { IGlobalStyle } from 'src/styles';
import { IHDWalletLanguage } from 'src/i18n';

const Styled = styled.div`
    cursor: pointer;
    background-color: ${(props: IGlobalStyle) => props.theme.inverseBody};
    padding: 15px;
    min-height: 70px;
    color: ${(props: IGlobalStyle) => props.theme.inverseText};
    border-radius: 5px;
    line-height: 24px;
`;

interface IProps {
    mnemonic: string | Array<string>;
    hidden?: boolean;
    onClick?: () => void;
}

const Mnemonic = (props: IProps) => {
    const { mnemonic, hidden, onClick } = props;
    const translate: IHDWalletLanguage = useSelector(translateByFieldSelector)('hdWallet');
    const dictionary = translate.showMnemonic;
    const theme = useSelector(themeSelector);
    const renderContent = () => {
        if (hidden) {
            return (
                <p
                    className="fw-medium center-text hide-mnemonic"
                    dangerouslySetInnerHTML={{ __html: dictionary.hiddenText }}
                />
            );
        }
        let words;
        if (typeof mnemonic === 'object') {
            words = mnemonic.join(' ');
        } else {
            words = mnemonic;
        }
        return <p className="fw-medium center-text">{words}</p>;
    };
    return (
        <Styled theme={theme} className="mnemonic-container" onClick={onClick}>
            {renderContent()}
        </Styled>
    );
};

export default React.memo(Mnemonic);
