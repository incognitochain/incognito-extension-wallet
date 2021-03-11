import React from 'react';
import { useSelector } from 'react-redux';
import { IHDWalletLanguage } from 'src/i18n';
import styled from 'styled-components';
import { translateByFieldSelector } from 'src/module/Configs';
import { Mnemonic, CopyIcon, KeyIcon, Header, LoadingIcon, TrashBinIcon } from 'src/components';
import { MnemonicQRCodeIcon } from 'src/components/Mnemonic';
import { removingWalletSelector, switchingWalletSelector } from 'src/module/Wallet/Wallet.selector';
import { AccountInstance } from 'incognito-js/build/web/browser';
import { useHistory } from 'react-router';
import { route as routeImportAccount } from 'src/module/Account/features/ImportAccount';
import { route as routeBackupAccount } from 'src/module/Account/features/BackupAccount';
import enhance, { IMergeProps } from './MasterKeyInfo.enhance';

const Styled = styled.div`
    .mnemonic-container {
        margin-top: 15px;
    }
    .keychains {
        margin-top: 22px;
    }
    .keychain {
        margin-bottom: 30px;
        justify-content: space-between;
    }
    .icons {
        justify-content: flex-end;
        margin-top: 10px;
        .icon {
            margin-left: 10px;
        }
    }
`;

const ListKeychain = React.memo(
    ({ keychains, onClickKey }: { onClickKey: (account: AccountInstance) => void; keychains: AccountInstance[] }) => {
        const translate: IHDWalletLanguage = useSelector(translateByFieldSelector)('hdWallet');
        const dictionary = translate.info;
        return (
            <div className="list-keychain">
                <p className="fw-medium fs-medium">{dictionary.keychains}</p>
                <div className="keychains">
                    {keychains.map((item) => (
                        <div key={item.name} className="keychain flex">
                            <p className="keychain-name fw-medium fs-medium ellipsis">{item.name}</p>
                            <div className="key-icon">
                                <KeyIcon onClick={() => onClickKey(item)} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    },
);

const Item = React.memo(({ title, desc, onClickItem }: { title: string; desc: string; onClickItem: () => any }) => {
    return (
        <div className="item m-b-30 pointer" onClick={onClickItem}>
            <p className="fs-medium fw-medium m-b-10">{title}</p>
            <p className="sub-text fs-medium">{desc}</p>
        </div>
    );
});

const MasterKey = React.memo((props: IMergeProps) => {
    const translate: IHDWalletLanguage = useSelector(translateByFieldSelector)('hdWallet');
    const dictionary = translate.info;
    const { isMasterless, keychains, mnemonic, onShowMnemonic, showMnemonic, onClickKey } = props;
    const history = useHistory();
    const renderMasterKey = () => {
        if (isMasterless) {
            const factories = [
                {
                    title: dictionary.importTitle,
                    desc: dictionary.importDesc,
                    onClickItem: () => history.push(routeImportAccount),
                },
                {
                    title: dictionary.backupTitle,
                    desc: dictionary.backupDesc,
                    onClickItem: () => history.push(routeBackupAccount),
                },
            ];
            return (
                <div className="masterlesss">
                    <ListKeychain {...{ keychains, onClickKey }} />
                    {factories.map((item) => (
                        <Item key={item.title} {...item} />
                    ))}
                    <p className="fw-medium m-b-30">{dictionary.masterlessDesc1}</p>
                    <p className="fw-medium m-b-30">{dictionary.masterlessDesc2}</p>
                </div>
            );
        }
        return (
            <div className="master-key">
                <p className="fw-medium fs-medium">{dictionary.revealPhrase}</p>
                <Mnemonic mnemonic={mnemonic} hidden={!showMnemonic} onClick={onShowMnemonic} />
                <div className="icons flex">
                    <CopyIcon text={mnemonic} />
                    <MnemonicQRCodeIcon mnemonic={mnemonic} />
                </div>
                <ListKeychain {...{ keychains, onClickKey }} />
            </div>
        );
    };
    return <div className="scroll-view">{renderMasterKey()}</div>;
});

const MasterKeyInfo = (props: IMergeProps & any) => {
    const { handleRemoveMasterKey, shouldShowRemove }: IMergeProps = props;
    const translate: IHDWalletLanguage = useSelector(translateByFieldSelector)('hdWallet');
    const dictionary = translate.info;
    const switching = useSelector(switchingWalletSelector);
    const removing: boolean = useSelector(removingWalletSelector);
    return (
        <Styled>
            <Header
                title={dictionary.title}
                rightHeader={
                    shouldShowRemove ? (
                        removing ? (
                            <LoadingIcon />
                        ) : (
                            <TrashBinIcon onClick={handleRemoveMasterKey} />
                        )
                    ) : null
                }
            />
            {switching ? <LoadingIcon center /> : <MasterKey {...props} />}
        </Styled>
    );
};

export default enhance(React.memo(MasterKeyInfo));
