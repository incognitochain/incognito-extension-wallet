import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { translateSelector } from 'src/module/Configs';
import { listAccountSelector } from 'src/module/Account';
import { AccountInstance } from 'incognito-js/build/web/browser';
import { MasterKeyInfo } from 'src/module/MasterKey';
import { PasswordModal } from 'src/module/Password';
import { walletDataSelector } from 'src/module/Wallet';
import { actionToggleModal } from 'src/components/Modal';
import AccountItem from '../AccountItem';

const customModalStyle = {
    top: '30%',
    width: 'auto',
    height: 'auto',
};

const KeychainList = React.memo(() => {
    const wallet = useSelector(walletDataSelector);
    const listAccount = useSelector(listAccountSelector);
    const translate = useSelector(translateSelector);
    const dictionary = translate.masterKey.info;

    const dispatch = useDispatch();

    const handleShowInfo = () => {
        dispatch(
            actionToggleModal({
                data: <MasterKeyInfo masterKey={wallet} />,
                closeable: true,
                title: dictionary.title,
            }),
        );
    };

    const handleCheckPassword = () => {
        dispatch(
            actionToggleModal({
                data: <PasswordModal onSuccess={handleShowInfo} />,
                closeable: true,
                autoClearOnNewModal: true,
                customModalStyle,
            }),
        );
    };

    return (
        <div className="hook-container">
            <div className="wallet">
                <div className="wallet-name">{wallet.name}</div>
                <div className="wallet-reveal" onClick={handleCheckPassword}>
                    {dictionary.revealPhraseBtn}
                </div>
            </div>
            <div className="keychains">
                {listAccount.map((account: AccountInstance) => (
                    <AccountItem key={account.name} account={account} />
                ))}
            </div>
        </div>
    );
});

export default KeychainList;
