import React, { ChangeEvent, TextareaHTMLAttributes } from 'react';
import styled from 'styled-components';
import { COLORS } from 'src/styles';

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
        border: 1px solid ${COLORS.colorKeyGrey};
        border-radius: 8px;
        background-color: ${COLORS.colorGrey};
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
        color: ${COLORS.colorGreyBold};
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
