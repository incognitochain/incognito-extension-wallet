import React from 'react';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.button`
    width: 9px;
    height: 100%;
    margin-right: 15px;
`;

const ArrowLeftVector = React.memo((props: any) => {
    return (
        <svg width={9} height={17}>
            <text
                fillRule="nonzero"
                transform="translate(-31 -32)"
                fontFamily="SFProDisplay-Regular, SF Pro Display"
                fontSize={18}
                {...props}
            >
                <tspan x={30} y={47}>
                    {'\uDBC2\uDFF6'}
                </tspan>
            </text>
        </svg>
    );
});

const ArrowLeft = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <Styled {...props}>
            <ArrowLeftVector />
        </Styled>
    );
};

export default ArrowLeft;
