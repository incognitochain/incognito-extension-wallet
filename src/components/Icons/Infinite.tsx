import React from 'react';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.button`
    width: 20px;
    height: 15px;
`;

const InfiniteVector = React.memo((props: any) => {
    return (
        <svg width={20} height={11}>
            <text
                transform="translate(-258 -174)"
                fill="#FFF"
                fillRule="evenodd"
                fontFamily="SFProDisplay-Medium, SF Pro Display"
                fontSize={15}
                fontWeight={400}
                {...props}
            >
                <tspan x={257} y={185}>
                    {'\uDBC2\uDFE0'}
                </tspan>
            </text>
        </svg>
    );
});

const Infinite = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const { className = '' } = props;
    return (
        <Styled type="button" className={`icon ${className || ''}`} {...props}>
            <InfiniteVector />
        </Styled>
    );
};

export default Infinite;
