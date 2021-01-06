import React, { ChangeEvent, TextareaHTMLAttributes } from 'react';
import styled from 'styled-components';
import { CONSTANT_COLORS } from 'src/constants';

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    label?: string;
    borderless?: boolean;
}

const Styled = styled.div`
    label {
        font-size: 18px;
        font-weight: medium;
    }

    textarea {
        width: 100%;
        padding: 10px;
        border: 1px solid ${CONSTANT_COLORS.GREY};
        border-radius: 8px;
        background-color: ${CONSTANT_COLORS.GREY2};
        resize: none;
        font-weight: 100;

        &.borderless {
            border: none;
            background-color: transparent;
            padding: 10px 0;

            font-size: 18px;
            font-weight: medium;
        }
    }

    textarea::placeholder {
        color: ${CONSTANT_COLORS.LIGHT_GREY};
        font-weight: 100;
    }
`;

const TextArea = (props: IProps) => {
    const { name, label, borderless } = props;
    return (
        <Styled className="layout-container">
            {!!label && <label htmlFor={name}>{label}</label>}
            <textarea {...props} className={borderless ? 'borderless' : ''} />
        </Styled>
    );
};

export default TextArea;
