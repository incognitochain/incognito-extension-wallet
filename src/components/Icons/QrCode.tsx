import React from 'react';
import styled from 'styled-components';

interface IProps {
    onClick?: any;
}

const Styled = styled.div`
    width: 20px;
    height: 20px;
    cursor: pointer;
`;

const QrCodeVector = React.memo((props: any) => {
    return (
        <svg width={19} height={20}>
            <text
                transform="translate(-2 -2)"
                fill="#FFF"
                fillRule="evenodd"
                fontFamily="SFProDisplay-Medium, SF Pro Display"
                fontSize={20}
                fontWeight={400}
                {...props}
            >
                <tspan x={0} y={19}>
                    {'\uDBC1\uDD82'}
                </tspan>
            </text>
        </svg>
    );
});

function QrCode(props: IProps) {
    const { onClick } = props;
    return (
        <Styled className="icon qrcode-icon" onClick={onClick}>
            <QrCodeVector />
        </Styled>
    );
}

export default QrCode;
