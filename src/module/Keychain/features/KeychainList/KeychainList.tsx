import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { translateByFieldSelector } from 'src/module/Configs';
import { AccountInstance } from 'incognito-js/build/web/browser';
import { route as routeMasterKeyInfo } from 'src/module/HDWallet/features/MasterKeyInfo';
import { PasswordModal } from 'src/module/Password';
import { actionToggleModal } from 'src/components/Modal';
import { SmallButton } from 'src/components';
import AccountItem from 'src/module/Keychain/features/AccountItem';
import { listMasterKeyWithKeychainsSelector } from 'src/module/HDWallet/HDWallet.selector';
import { IMasterKeyWithKeychains } from 'src/module/HDWallet';
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
    .master-key .small-button {
        min-width: 70px;
        justify-content: flex-end;
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

const KeychainItem = React.memo((props: IMasterKeyWithKeychains) => {
    const { wallet, walletId, isMasterless, listAccount } = props;
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
    if (isMasterless && listAccount.length === 0) {
        return null;
    }
    return (
        <div className="hook-container">
            <div className="master-key flex">
                <p className={`fw-medium fs-medium ellipsis m-r-15 ${selected ? 'main-text' : 'sub-text'}`}>
                    {wallet.name}
                </p>
                <div className="small-button flex">
                    <SmallButton title={revealPhraseBtn} onClick={handleCheckPassword} />
                </div>
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
    const listMasterKey: IMasterKeyWithKeychains[] = useSelector(listMasterKeyWithKeychainsSelector);
    return (
        <Styled className="keychain-list scroll-view">
            {listMasterKey.map((masterKey) => (
                <KeychainItem {...masterKey} key={masterKey.walletId} />
            ))}
        </Styled>
    );
};

export default React.memo(KeychainList);
