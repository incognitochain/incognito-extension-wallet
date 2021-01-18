import React from 'react';
import { useSelector } from 'react-redux';
import { ILanguage } from 'src/i18n';
import styled from 'styled-components';
import { translateSelector } from 'src/module/Configs';
import { Mnemonic, CopyIcon, KeyIcon } from 'src/components';
import enhance from './MasterKeyInfo.enhance';
import { IProps } from './MasterKeyInfo.inteface';
import MnemonicQRCodeIcon from '../MnemonicQRCodeIcon';

const Styled = styled.div`
    font-size: 18px;

    .content {
        padding-bottom: 15px;
    }

    .icons {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;

        > * {
            margin-left: 10px;
        }
    }

    .keychain {
        display: flex;
        margin-bottom: 30px;
        justify-content: space-between;

        &:first-child {
            margin-top: 30px;
        }
    }

    .keychain-name {
    }

    .keychain-key {
    }
`;

const MasterKeyInfo = (props: IProps) => {
    const { masterKey, onShowMnemonic, showMnemonic, onClickKey } = props;
    const { mnemonic } = masterKey;

    const translate: ILanguage = useSelector(translateSelector);
    const dictionary = translate.masterKey.info;

    const keychains = masterKey.masterAccount.getAccounts();

    return (
        <Styled>
            <div className="content">{dictionary.revealPhrase}</div>
            <Mnemonic mnemonic={mnemonic} hidden={!showMnemonic} onClick={onShowMnemonic} />
            <div className="icons">
                <CopyIcon text={mnemonic} />
                <MnemonicQRCodeIcon mnemonic={mnemonic} />
            </div>
            <div>
                <div className="keychain">{dictionary.viewKeys}</div>
                {keychains.map((item) => (
                    <div key={item.name} className="keychain">
                        <div className="keychain-name">{item.name}</div>
                        <KeyIcon onClick={() => onClickKey(item)} />
                    </div>
                ))}
            </div>
        </Styled>
    );
};

export default enhance(React.memo(MasterKeyInfo));
