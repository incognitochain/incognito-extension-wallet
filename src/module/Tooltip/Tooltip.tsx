import React from 'react';
import styled from 'styled-components';
import { isEmpty } from 'lodash';
import { CONSTANT_COLORS } from 'src/constants';
import enhance from './Tooltip.enhance';
import { ITooltipProps } from './Tooltip.interface';

const Styled = styled.div`
    position: absolute;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    align-items: center;

    .custom-tooltip {
        background-color: ${CONSTANT_COLORS.BLACK};
        border-radius: 8px;
        color: ${CONSTANT_COLORS.WHITE};
        padding: 8px 16px;

        .arrow {
            content: ' ';
            position: absolute;
            bottom: 100%; /* At the top of the tooltip */
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: transparent transparent black transparent;
        }
    }
`;

const Tooltip = (props: ITooltipProps) => {
    const { data, tooltipPosition } = props;
    const { text, className } = data;

    if (isEmpty(tooltipPosition)) {
        return null;
    }

    return (
        <Styled className={className} style={tooltipPosition}>
            <div className="custom-tooltip">
                {text}
                <div className="arrow" />
            </div>
        </Styled>
    );
};

export default enhance(React.memo(Tooltip));
