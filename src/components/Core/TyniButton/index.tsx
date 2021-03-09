import React from 'react';
import { useSelector } from 'react-redux';
import { themeSelector } from 'src/module/Setting';
import { COLORS, IGlobalStyle } from 'src/styles';
import styled from 'styled-components';

interface IProps {
    title: string;
    selected?: boolean;
}
const Styled = styled.button`
    background-color: ${(props: IGlobalStyle) => props.theme.typeButton};
    border: solid 0.5px ${(props: IGlobalStyle) => props.theme.inputBorder};
    border-radius: 5px;
    color: ${(props: IGlobalStyle) => props.theme.typeTextButton};
    min-width: 54px;
    height: 23px;
    margin-left: 5px;
    &.selected {
        color: ${COLORS.white};
        background-color: ${(props: IGlobalStyle) => props.theme.button};
        border: solid transparent 0.5px;
    }
`;

const TyniButton = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const { title, selected, ...rest } = props;
    const theme = useSelector(themeSelector);
    return (
        <Styled theme={theme} className={selected ? 'selected' : ''} {...rest}>
            {title}
        </Styled>
    );
};

export default React.memo(TyniButton);
