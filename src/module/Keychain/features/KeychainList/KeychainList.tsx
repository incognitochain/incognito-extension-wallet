import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { translateByFieldSelector } from 'src/module/Configs';
import { AccountInstance, WalletInstance } from 'incognito-js/build/web/browser';
import { route as routeMasterKeyInfo } from 'src/module/HDWallet/features/MasterKeyInfo';
import { PasswordModal } from 'src/module/Password';
import { actionToggleModal } from 'src/components/Modal';
import { SmallButton } from 'src/components';
import AccountItem from 'src/module/Keychain/features/AccountItem';
import { listSelector } from 'src/module/HDWallet/HDWallet.selector';
import { IMasterKey } from 'src/module/HDWallet';
import styled from 'styled-components';
import { walletIdSelector } from 'src/module/Wallet/Wallet.selector';
import { useHistory } from 'react-router-dom';
import { IKeychainLanguage } from 'src/i18n';
import { actionSwitchWallet } from 'src/module/Wallet';

const Styled = styled.div`
    .hook-container {
        margin-bottom: 30px;
    }
    .master-key {
        justify-content: space-between;
    }
`;

const customModalStyle = {
    top: '30%',
    width: 'auto',
    height: 'auto',
    borderRadius: 8,
    minWidth: 295,
    padding: '30px 15px',
    boxShadow: '0 20px 30px 0 rgba(0,0,0,0.15)',
};

interface IProps {
    wallet: WalletInstance;
    walletId: number;
}

const KeychainItem = React.memo((props: IProps) => {
    const { wallet, walletId } = props;
    const translate: IKeychainLanguage = useSelector(translateByFieldSelector)('keychain');
    const { revealPhraseBtn } = translate;
    const dispatch = useDispatch();
    const walletIdSelected = useSelector(walletIdSelector);
    const selected = walletId === walletIdSelected;
    const history = useHistory();
    const handleShowInfo = () => {
        dispatch(actionSwitchWallet(walletId));
        history.push(routeMasterKeyInfo, { masterKeyId: walletId });
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
    const getListAccount = () => {
        return wallet.masterAccount.getAccounts();
    };
    const listAccount = getListAccount();
    return (
        <div className="hook-container">
            <div className="master-key flex">
                <p className={`fw-medium fs-medium ${selected ? 'main-text' : 'sub-text'}`}>{wallet.name}</p>
                <SmallButton title={revealPhraseBtn} onClick={handleCheckPassword} />
            </div>
            <div className="keychains">
                {listAccount &&
                    listAccount.map((account: AccountInstance) => (
                        <AccountItem key={account.name} account={account} walletId={walletId} />
                    ))}
            </div>
        </div>
    );
});

const KeychainList = () => {
    const listMasterKey: IMasterKey[] = useSelector(listSelector)();
    return (
        <Styled className="keychain-list scroll-view">
            {listMasterKey.map((masterKey) => (
                <KeychainItem wallet={masterKey.wallet} walletId={masterKey.walletId} key={masterKey.walletId} />
            ))}
        </Styled>
    );
};

export default React.memo(KeychainList);
