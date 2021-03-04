import React from 'react';
import { useSelector } from 'react-redux';
import { themeSelector } from 'src/module/Setting';
import { ITheme } from 'src/styles';
import styled from 'styled-components';

interface IProps {
    customContent?: React.ElementType;
    title: string;
    disabled?: boolean;
    loading?: boolean;
}

const Styled = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    height: 40px;
    margin: auto;
    padding: 0 11px;
    background-color: ${(props: { theme: ITheme }) => props.theme.button};
    color: ${(props: { theme: ITheme }) => props.theme.textButton};
    width: 100%;
    &.btn-disabled {
        color: ${(props: { theme: ITheme }) => props.theme.disableTextButton};
        background-color: ${(props: { theme: ITheme }) => props.theme.disableButton};
    }
    .loading {
        position: absolute;
        right: 20%;
    }
`;

const Button = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const { customContent, title, disabled, className = '', ...rest } = props;
    const theme = useSelector(themeSelector);
    return (
        <Styled
            theme={theme}
            className={`btn-container ${disabled ? 'btn-disabled' : ''}  ${className}`}
            disabled={disabled}
            {...rest}
        >
            {customContent || title}
        </Styled>
    );
};

export default Button;
