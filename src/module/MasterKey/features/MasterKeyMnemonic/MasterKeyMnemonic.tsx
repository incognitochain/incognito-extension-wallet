import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Mnemonic, Button, CopyIcon } from 'src/components';
import { translateSelector } from 'src/module/Configs';
import enhance from './MasterKeyMnemonic.enhance';
import { IProps } from './MasterKeyMnemonic.inteface';
import MnemonicQRCodeIcon from '../MnemonicQRCodeIcon/MnemonicQRCodeIcon';

const Styled = styled.div`
    .content {
        padding-bottom: 15px;
    }

    .input-wrapper {
        margin: 30px 0;

        > div:first-child {
            margin-bottom: 15px;
        }
    }

    .icons {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;

        > * {
            margin-left: 10px;
        }
    }

    .actions {
        margin-top: 30px;
    }
`;

const MasterKeyMnemonic = (props: IProps) => {
    const { onNext, mnemonic } = props;

    const translate = useSelector(translateSelector);
    const dictionary = translate.masterKey.showMnemonic;

    return (
        <Styled>
            <div className="content">{dictionary.newMnemonic}</div>
            <Mnemonic mnemonic={mnemonic} />
            <div className="icons">
                <CopyIcon text={mnemonic} tooltip={translate.general.copied} />
                <MnemonicQRCodeIcon mnemonic={mnemonic} />
            </div>
            <div className="actions">{!!onNext && <Button onClick={onNext} title={dictionary.newMnemonicBtn} />}</div>
        </Styled>
    );
};

export default enhance(React.memo(MasterKeyMnemonic));
