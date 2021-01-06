import React, { useCallback } from 'react';
import styled from 'styled-components';
import { CONSTANT_COLORS } from 'src/constants';
import { ISelectableWord } from './VerifyMnemonic.inteface';

interface IProps {
    onClick: (index: number) => void;
}

const Styled = styled.button`
    > div {
        background-color: ${CONSTANT_COLORS.WHITE};
        border: 1px solid ${CONSTANT_COLORS.LIGHT_GREY2};
        border-radius: 11px;
        margin: 10px 5px 0;
        padding: 8px 6px;
        .word {
            color: ${CONSTANT_COLORS.BLACK};
        }
        .index {
            color: ${CONSTANT_COLORS.LIGHT_GREY};
        }
    }

    > div.selected-word {
        background-color: ${CONSTANT_COLORS.BLACK};
        .word {
            color: ${CONSTANT_COLORS.WHITE};
        }
    }
`;

const Word = (props: ISelectableWord & IProps) => {
    const { text, index, isSelected, onClick } = props;

    const handleClick = useCallback(() => {
        onClick(index);
    }, [index]);

    return (
        <Styled onClick={handleClick}>
            <div className={isSelected ? 'selected-word' : ''}>
                <span className="index">{index + 1} </span>
                <span className="word">{text}</span>
            </div>
        </Styled>
    );
};

export default React.memo(Word);
