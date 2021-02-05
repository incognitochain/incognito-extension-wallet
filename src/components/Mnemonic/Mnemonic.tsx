import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { CONSTANT_COLORS } from 'src/constants';
import { translateSelector } from 'src/module/Configs';

const Styled = styled.div`
    background-color: ${CONSTANT_COLORS.BLACK2};
    padding: 15px;
    min-height: 70px;
    font-weight: medium;
    color: ${CONSTANT_COLORS.WHITE};
    border-radius: 5px;
    line-height: 24px;
    white-space: pre-line;
    font-size: 16px;

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

    return <Styled onClick={onClick}>{renderContent()}</Styled>;
};

export default React.memo(Mnemonic);
