import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Header } from 'src/components';
import { translateByFieldSelector } from 'src/module/Configs';
import { IProps } from './MasterKeyMnemonic.inteface';
import enhance from './MasterKeyMnemonicRoute.enhance';
import MasterKeyMnemonic from './MasterKeyMnemonic';

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

const MasterKeyMnemonicRoute = (props: IProps) => {
    const { onNext, mnemonic } = props;
    const translate = useSelector(translateByFieldSelector)('showMnemonic');

    return (
        <Styled>
            <Header title={translate.title} />
            <MasterKeyMnemonic mnemonic={mnemonic} onNext={onNext} />
        </Styled>
    );
};

export default enhance(React.memo(MasterKeyMnemonicRoute));
