import React from 'react';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';
import { useSelector } from 'react-redux';
import { themeSelector } from 'src/module/Setting';
import { IGlobalStyle } from 'src/styles';
import enhance from './Tooltip.enhance';
import { ITooltipProps } from './Tooltip.interface';

const Styled = styled.div`
    position: absolute;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    align-items: center;
    .custom-tooltip {
        background-color: ${(props: IGlobalStyle) => props.theme.tooltipBg};
        color: ${(props: IGlobalStyle) => props.theme.tooltipText};
        border-radius: 8px;
        padding: 6px 8px;
    }
    .arrow {
        content: ' ';
        position: absolute;
        bottom: 100%; /* At the top of the tooltip */
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent ${(props: IGlobalStyle) => props.theme.tooltipBg} transparent;
    }
`;

const Tooltip = (props: ITooltipProps) => {
    const { data, tooltipPosition } = props;
    const { text, className } = data;
    const theme = useSelector(themeSelector);
    if (isEmpty(tooltipPosition)) {
        return null;
    }
    return (
        <Styled theme={theme} className={className} style={tooltipPosition}>
            <div className="custom-tooltip">{text}</div>
            <div className="arrow" />
        </Styled>
    );
};

export default enhance(React.memo(Tooltip));
