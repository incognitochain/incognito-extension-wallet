import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { route as routeSetting } from 'src/module/Setting';

const Styled = styled(Link)`
    width: 21px;
    height: 21px;
`;

function SettingVector(props: any) {
    return (
        <svg width={22} height={22}>
            <text
                transform="translate(-31 -31)"
                fillRule="evenodd"
                fontFamily="SFProDisplay-Regular, SF Pro Display"
                fontSize={20}
                {...props}
            >
                <tspan x={30} y={49}>
                    {'\uDBC2\uDCCC'}
                </tspan>
            </text>
        </svg>
    );
}

const Setting = React.memo(() => {
    return (
        <Styled to={routeSetting}>
            <SettingVector />
        </Styled>
    );
});

export default Setting;
