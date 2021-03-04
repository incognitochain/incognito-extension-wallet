import React from 'react';
import styled from 'styled-components';

interface IProps {
    isGreyIcon?: boolean;
}

const Styled = styled.button`
    width: 17px;
    height: 17px;
`;

const InfoVector = React.memo((props: any) => {
    return (
        <svg width={16} height={17}>
            <text
                transform="translate(-242.5 -31)"
                fill="#FFF"
                fillRule="evenodd"
                fontFamily="SFProDisplay-Regular, SF Pro Display"
                fontSize={15}
                {...props}
            >
                <tspan x={241.5} y={45}>
                    {'\uDBC0\uDD75'}
                </tspan>
            </text>
        </svg>
    );
});

const Info = React.forwardRef((props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>, ref: any) => {
    return (
        <Styled className="icon info-icon" ref={ref} {...props}>
            <InfoVector />
        </Styled>
    );
});

export default Info;
