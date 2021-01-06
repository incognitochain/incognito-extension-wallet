import React from 'react';
import QrCode from '../QrCode';

interface IProps {
    value: string;
}

const QrCodeModal = (props: IProps) => {
    const { value } = props;
    return (
        <QrCode
            qrCodeProps={{
                value,
                size: 175,
            }}
        />
    );
};

export default QrCodeModal;
