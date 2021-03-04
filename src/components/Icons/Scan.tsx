import React from 'react';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.button`
    width: 16px;
    height: 16px;
`;

const ScanVector = React.memo((props: any) => {
    return (
        <svg width={17} height={17}>
            <text
                transform="translate(-261 -227)"
                fill="#FFF"
                fillRule="evenodd"
                fontFamily="SFProDisplay-Regular, SF Pro Display"
                fontSize={16}
                {...props}
            >
                <tspan x={260} y={241}>
                    {'\uDBC0\uDFB9'}
                </tspan>
            </text>
        </svg>
    );
});

const Scan = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const { className = '' } = props;
    return (
        <Styled type="button" className={`icon ${className || ''}`} {...props}>
            <ScanVector />
        </Styled>
    );
};

export default Scan;
