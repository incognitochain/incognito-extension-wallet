import React from 'react';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.button`
    width: 18px;
    height: 10px;
`;

const ArrowUpVector = React.memo((props: any) => {
    return (
        <svg width={16} height={10}>
            <text
                transform="translate(-272 -173)"
                fill="#000"
                fillRule="evenodd"
                fontFamily="SFProDisplay-Regular, SF Pro Display"
                fontSize={18}
                {...props}
            >
                <tspan x={270} y={185}>
                    {'\uDBC0\uDD87'}
                </tspan>
            </text>
        </svg>
    );
});

const ArrowUp = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <Styled className="icon arrow-up-icon" {...props}>
            <ArrowUpVector />
        </Styled>
    );
};

export default ArrowUp;
