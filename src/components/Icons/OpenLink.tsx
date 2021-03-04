import React from 'react';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.button`
    width: 13px;
    height: 13px;
`;

const OpenLinkVector = React.memo((props: any) => {
    return (
        <svg width={14} height={15}>
            <text
                transform="translate(-270 -148)"
                fill="#FFF"
                fillRule="evenodd"
                fontFamily="SFProDisplay-Regular, SF Pro Display"
                fontSize={18}
                {...props}
            >
                <tspan x={268} y={162}>
                    {'\uDBC0\uDD2F'}
                </tspan>
            </text>
        </svg>
    );
});

const OpenLink = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <Styled className="icon" {...props}>
            <OpenLinkVector />
        </Styled>
    );
};

export default OpenLink;
