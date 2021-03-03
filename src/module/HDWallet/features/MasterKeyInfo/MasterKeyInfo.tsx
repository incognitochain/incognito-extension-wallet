import React from 'react';
import { useSelector } from 'react-redux';
import { IHDWalletLanguage } from 'src/i18n';
import styled from 'styled-components';
import { translateByFieldSelector } from 'src/module/Configs';
import { Mnemonic, CopyIcon, KeyIcon, Header, LoadingIcon } from 'src/components';
import { MnemonicQRCodeIcon } from 'src/components/Mnemonic';
import { switchingWalletSelector } from 'src/module/Wallet/Wallet.selector';
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
    }
    .hook {
        margin-top: 30px;
    }
`;

const MasterKeyInfo = (props: IMergeProps & any) => {
    const { keychains, mnemonic, onShowMnemonic, showMnemonic, onClickKey }: IMergeProps = props;
    const translate: IHDWalletLanguage = useSelector(translateByFieldSelector)('hdWallet');
    const dictionary = translate.info;
    const switching = useSelector(switchingWalletSelector);
    return (
        <Styled>
            <Header title={dictionary.title} />
            {switching ? (
                <LoadingIcon center />
            ) : (
                <div className="scroll-view">
                    <p className="fw-medium fs-medium">{dictionary.revealPhrase}</p>
                    <Mnemonic mnemonic={mnemonic} hidden={!showMnemonic} onClick={onShowMnemonic} />
                    <div className="icons flex">
                        <CopyIcon text={mnemonic} />
                        <MnemonicQRCodeIcon mnemonic={mnemonic} />
                    </div>
                    <div className="hook">
                        <p className="fw-medium fs-medium">{dictionary.viewKeys}</p>
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
                </div>
            )}
        </Styled>
    );
};

export default enhance(React.memo(MasterKeyInfo));
