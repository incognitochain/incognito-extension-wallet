import React from 'react';
import styled from 'styled-components';
import QRCodeReact, { BaseQRCodeProps } from 'qrcode.react';
import { themeSelector } from 'src/module/Setting';
import { useSelector } from 'react-redux';
import { COLORS, ITheme } from 'src/styles';
import Copy from 'src/components/Copy';

interface IProps {
    hook?: any;
    qrCodeProps: BaseQRCodeProps;
    label?: string;
}

const Styled = styled.div`
    .qrcode-react {
        justify-content: center;
        display: flex;
    }
    .copy-block {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 50px;
        border-radius: 50px;
        padding: 0 15px;
        justify-content: space-between;
        background-color: ${COLORS.colorGreyLight};
        margin-top: 30px;
    }
    .copy-block .btn-copy {
        background: ${({ theme }: { theme: ITheme }) => theme.button};
        height: 40px;
        border-radius: 40px;
        padding: 0 10px;
    }
    .copy-block p {
        max-width: 100%;
    }
    .label {
        text-align: center;
    }
`;

const QrCode = (props: IProps) => {
    const { hook, qrCodeProps, label } = props;
    const { value } = qrCodeProps;
    const theme = useSelector(themeSelector);
    return (
        <Styled theme={theme} className="qrcode-container">
            <div className="label fs-medium fw-bold">{label}</div>
            <div className="qrcode-react">
                <QRCodeReact {...{ ...qrCodeProps, size: qrCodeProps?.size || 175 }} />
            </div>
            {hook}
            <Copy text={value} />
        </Styled>
    );
};

export default QrCode;
