import React from 'react';
import styled from 'styled-components';
import { ISelectableWord } from './VerifyMnemonic.inteface';
import Word from './Word';

interface IProps {
    words: Array<ISelectableWord>;
    onToggleWord: (index: number) => void;
}

const Styled = styled.div`
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const Words = (props: IProps) => {
    const { words, onToggleWord } = props;
    return (
        <Styled>
            {words.map((item, index) => (
                <Word
                    onClick={onToggleWord}
                    key={`${item.text}-${item.index}`}
                    text={item.text}
                    index={index}
                    isSelected={item.isSelected}
                />
            ))}
        </Styled>
    );
};

export default React.memo(Words);
