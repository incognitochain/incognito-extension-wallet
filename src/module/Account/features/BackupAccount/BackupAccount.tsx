import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Header, QrCode, QrCodeIcon } from 'src/components';
import { IAccountLanguage, IGeneralLanguage } from 'src/i18n';
import { translateByFieldSelector } from 'src/module/Configs';
import styled from 'styled-components';
import { AccountInstance } from 'incognito-js/build/web/browser';
import copy from 'copy-to-clipboard';
import {
    backupAllMasterKeySelector,
    getlistAccountByMasterKeySelector,
    IMasterKey,
    listSelector,
} from 'src/module/HDWallet';
import QrCodeV2 from 'src/components/QrCode/QrCodeV2';
import { walletIdSelector } from 'src/module/Wallet';
import { actionToggleModal } from 'src/components/Modal';

const Styled = styled.div`
    .qrcode-icon {
        margin-left: unset;
        margin-right: 15px;
    }
`;

const MasterKey = React.memo(() => {
    const listMasterKey: IMasterKey[] = useSelector(listSelector)(true);
    const translate: IGeneralLanguage = useSelector(translateByFieldSelector)('general');
    const { masterKey } = translate;
    return (
        <div className="master-key">
            <p className="fw-medium fs-medium m-b-30">{masterKey}</p>
            {listMasterKey.map((masterKey) => (
                <QrCodeV2 title={masterKey.wallet.name} desc={masterKey.wallet.mnemonic} key={masterKey.walletId} />
            ))}
        </div>
    );
});

const Masterless = React.memo(() => {
    const masterKeyId: number = useSelector(walletIdSelector);
    const translate: IGeneralLanguage = useSelector(translateByFieldSelector)('general');
    const { masterLess } = translate;
    const listAccount: AccountInstance[] | undefined = useSelector(getlistAccountByMasterKeySelector)(masterKeyId);
    if (!listAccount) {
        return null;
    }
    return (
        <div className="masterless">
            <p className="fw-medium fs-medium m-b-30">{masterLess}</p>
            {listAccount.map((account: AccountInstance) => (
                <QrCodeV2
                    title={account.name}
                    desc={account.key.keySet.privateKeySerialized}
                    key={account.key.keySet.paymentAddressKeySerialized}
                />
            ))}
        </div>
    );
});

const Backup = React.memo(() => {
    const [state, setState] = React.useState({
        copied: false,
    });
    const dispatch = useDispatch();
    const { copied } = state;
    const translate: IAccountLanguage = useSelector(translateByFieldSelector)('account');
    const { backup } = translate;
    const backupData = useSelector(backupAllMasterKeySelector);
    const handleCopyAll = () => {
        setState({ ...state, copied: true });
        copy(backupData);
    };
    const handleShowQrBackup = () =>
        dispatch(
            actionToggleModal({
                data: <QrCode qrCodeProps={{ value: backupData }} />,
                closeable: true,
                title: backup.headerTitle,
            }),
        );
    return (
        <Styled>
            <Header title={backup.headerTitle} />
            <div className="scroll-view">
                <MasterKey />
                <Masterless />
                <div className="block-actions flex">
                    <QrCodeIcon onClick={handleShowQrBackup} />
                    <Button title={copied ? backup.copied : backup.copyAll} onClick={handleCopyAll} />
                </div>
            </div>
        </Styled>
    );
});

export default Backup;
