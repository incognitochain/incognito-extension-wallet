import React from 'react';
import { useSelector } from 'react-redux';
import { Button, CopyIcon, Mnemonic } from 'src/components';
import { IHDWalletLanguage } from 'src/i18n';
import { translateByFieldSelector } from 'src/module/Configs';
import styled from 'styled-components';
import { MnemonicQRCodeIcon } from 'src/components/Mnemonic';
import { createMasterKeySelector } from 'src/module/HDWallet/features/CreateMasterKey';
import withCreateMasterKeyMnemonic, { IMergeProps } from './CreateMasterKeyMnemonic.enhance';

const Styled = styled.div`
    .mnemonic-container {
        margin-top: 30px;
        margin-bottom: 10px;
    }
    .icons {
        justify-content: flex-end;
    }
`;

const CreateMasterKeyMnemonic = (props: IMergeProps & any) => {
    const { onHandleVerifyMasterKeyMnemonic }: IMergeProps = props;
    const { mnemonic } = useSelector(createMasterKeySelector);
    const translate: IHDWalletLanguage = useSelector(translateByFieldSelector)('hdWallet');
    const { desc1, btnSave } = translate.createMasterKeyMnemonic;
    React.useEffect(() => {}, [mnemonic]);
    return (
        <Styled>
            <p className="desc" dangerouslySetInnerHTML={{ __html: desc1 }} />
            <Mnemonic mnemonic={mnemonic} />
            <div className="icons flex">
                <CopyIcon text={mnemonic} />
                <MnemonicQRCodeIcon mnemonic={mnemonic} />
            </div>
            <Button title={btnSave} onClick={onHandleVerifyMasterKeyMnemonic} />
        </Styled>
    );
};

export default withCreateMasterKeyMnemonic(React.memo(CreateMasterKeyMnemonic));
