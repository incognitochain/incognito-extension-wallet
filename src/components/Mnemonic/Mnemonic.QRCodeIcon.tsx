import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { QrCodeIcon, QrCodeModal } from 'src/components';
import { actionToggleModal } from 'src/components/Modal';
import { translateByFieldSelector } from 'src/module/Configs';
import { IHDWalletLanguage } from 'src/i18n';

interface IProps {
    mnemonic: string;
}

const MnemonicQRCodeIcon = (props: IProps) => {
    const { mnemonic } = props;
    const dispatch = useDispatch();
    const translate: IHDWalletLanguage = useSelector(translateByFieldSelector)('hdWallet');
    const { qrTitle } = translate.general;
    const onShowQrCodeModal = () => {
        dispatch(
            actionToggleModal({
                title: ' ',
                data: <QrCodeModal value={mnemonic} label={qrTitle} />,
                closeable: true,
            }),
        );
    };
    return <QrCodeIcon onClick={onShowQrCodeModal} />;
};

export default React.memo(MnemonicQRCodeIcon);
