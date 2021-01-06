import React, { ChangeEvent, InputHTMLAttributes, useMemo, useState } from 'react';
import styled from 'styled-components';
import { CONSTANT_COLORS } from 'src/constants';
import { EyeIcon } from '../../Icons';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    borderless?: boolean;
    toggleVisible?: boolean;
}

const Styled = styled.div`
    position: relative;

    label {
        font-size: 18px;
        font-weight: medium;
    }

    input {
        width: 100%;
        padding: 10px;
        border: 1px solid ${CONSTANT_COLORS.GREY};
        border-radius: 8px;
        background-color: ${CONSTANT_COLORS.GREY2};

        &.borderless {
            border: none;
            background-color: transparent;
            padding: 10px 0;

            font-size: 18px;
            font-weight: medium;
        }
    }

    input::placeholder {
        color: ${CONSTANT_COLORS.LIGHT_GREY};
    }

    .toggle-visible {
        padding-right: 50px;
    }

    .eye-icon {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
    }
`;

const Input = (props: IProps) => {
    const { toggleVisible, borderless, ...inputProps } = props;
    const { name, label, type } = inputProps;
    const [inputType, setInputType] = useState(type);

    const className = useMemo(() => {
        const classes = [];
        if (borderless) {
            classes.push('borderless');
        }

        if (type === 'password' && toggleVisible) {
            classes.push('toggle-visible');
        }
        return classes;
    }, [borderless, type]);

    const handleTogglePassword = (e: any) => {
        e.preventDefault();
        setInputType(inputType === 'password' ? 'text' : 'password');
    };

    return (
        <Styled>
            {!!label && <label htmlFor={name}>{label}</label>}
            <input {...inputProps} type={inputType} className={className.join(' ')} />
            {toggleVisible && (
                <div className="eye-icon">
                    <EyeIcon onClick={handleTogglePassword} />
                </div>
            )}
        </Styled>
    );
};

export default Input;
