import React from 'react';
import { QrCodeIcon } from 'src/components';
import enhance from './MnemonicQRCodeIcon.enhance';
import { IProps } from './MnemonicQRCodeIcon.inteface';

const MnemonicQRCodeIcon = (props: IProps) => {
    const { onShowQrCodeModal } = props;

    return <QrCodeIcon onClick={onShowQrCodeModal} />;
};

export default enhance(React.memo(MnemonicQRCodeIcon));
