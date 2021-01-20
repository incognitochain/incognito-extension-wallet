import React from 'react';
import { useSelector } from 'react-redux';
import { themeSelector } from 'src/module/Configs';
import { COLORS } from 'src/styles';
import styled from 'styled-components';

interface IProps {
    title: string;
    disabled?: boolean;
    loading?: boolean;
}

const Styled = styled.button`
    border-radius: 5px;
    background-color: ${COLORS.black};
    color: ${COLORS.white};
    font-size: 13px;
    padding: 3px 5px;
    cursor: pointer;
`;

const SmallButton = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const { title, disabled, className = '', ...rest } = props;
    const theme = useSelector(themeSelector);
    return (
        <Styled theme={theme} className={`${className}`} disabled={disabled} {...rest}>
            {title}
        </Styled>
    );
};

export default SmallButton;
