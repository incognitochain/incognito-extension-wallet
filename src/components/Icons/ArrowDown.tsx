import React from 'react';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.button`
    width: 18px;
    height: 10px;
`;

const ArrowDownVector = React.memo((props: any) => {
    return (
        <svg width={16} height={10}>
            <text
                transform="translate(-272 -174)"
                fill="#000"
                fillRule="evenodd"
                fontFamily="SFProDisplay-Regular, SF Pro Display"
                fontSize={18}
                {...props}
            >
                <tspan x={270} y={185}>
                    {'\uDBC0\uDD88'}
                </tspan>
            </text>
        </svg>
    );
});

const ArrowDown = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <Styled className="icon arrow-down-icon" {...props}>
            <ArrowDownVector />
        </Styled>
    );
};

export default ArrowDown;
