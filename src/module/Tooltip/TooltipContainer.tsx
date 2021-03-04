import React from 'react';
import { useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { themeSelector } from 'src/module/Setting';
import styled from 'styled-components';
import enhance from './TooltipContainer.enhance';
import { IProps } from './Tooltip.interface';
import Tooltip from './Tooltip';

const Styled = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
    pointer-events: none;
`;

const TooltipContainer = (props: IProps) => {
    const { tooltips } = props;
    const theme = useSelector(themeSelector);

    if (isEmpty(tooltips)) {
        return null;
    }

    const renderContent = () => {
        return tooltips.map((item: any) => <Tooltip data={item} key={item.id} />);
    };

    return (
        <Styled className="tooltip-wrapper" theme={theme}>
            {renderContent()}
        </Styled>
    );
};

export default enhance(React.memo(TooltipContainer));
