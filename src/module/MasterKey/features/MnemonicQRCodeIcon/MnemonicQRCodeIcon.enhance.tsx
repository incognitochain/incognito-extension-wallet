import React, { useCallback } from 'react';
import { compose } from 'recompose';
import { useDispatch } from 'react-redux';
import { QrCodeModal } from 'src/components';
import { actionToggleModal } from 'src/components/Modal';
import { IProps } from './MnemonicQRCodeIcon.inteface';

const enhance = (WrappedComponent: any) => (props: IProps) => {
    const { mnemonic } = props;

    const dispatch = useDispatch();

    const showQrCodeModal = useCallback(() => {
        dispatch(
            actionToggleModal({
                title: ' ',
                data: <QrCodeModal value={mnemonic} />,
                closeable: true,
            }),
        );
    }, [mnemonic]);

    return <WrappedComponent {...props} onShowQrCodeModal={showQrCodeModal} />;
};

export default compose<IProps, any>(enhance);
