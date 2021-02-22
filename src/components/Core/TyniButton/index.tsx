import React from 'react';
import { useSelector } from 'react-redux';
import { themeSelector } from 'src/module/Configs';
import { COLORS, IGlobalStyle } from 'src/styles';
import styled from 'styled-components';

interface IProps {
    title: string;
    selected?: boolean;
}
const Styled = styled.button`
    background-color: ${COLORS.lightGrey12};
    border: solid ${COLORS.lightGrey21} 0.5px;
    border-radius: 8px;
    color: ${COLORS.black};
    min-width: 54px;
    height: 28px;
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
