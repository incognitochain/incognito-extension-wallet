import React from 'react';
import QrCode from 'src/components/QrCode';
import { Header } from 'src/components';
import { useLocation } from 'react-router-dom';

const AccountItemQRCode = React.memo(() => {
    const location: any = useLocation();
    const { title, desc } = location?.state;
    return (
        <div className="account-item-qrcode">
            <Header title={title} />
            <QrCode
                qrCodeProps={{
                    value: desc,
                    size: 175,
                }}
            />
        </div>
    );
});
export default AccountItemQRCode;
