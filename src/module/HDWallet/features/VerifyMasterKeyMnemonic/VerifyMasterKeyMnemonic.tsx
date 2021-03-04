import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Mnemonic } from 'src/components';
import { IHDWalletLanguage } from 'src/i18n';
import { themeSelector, translateByFieldSelector } from 'src/module/Configs';
import styled from 'styled-components';
import { actionTypeHDWalletSelector, ACTION_TYPES } from 'src/module/HDWallet';
import {
    wordsSelector,
    selectedWordsSelector,
    actionToggleSelectedWordIndex,
    isVerifyMnemonicSelector,
} from 'src/module/HDWallet/features/CreateMasterKey';
import { COLORS, IGlobalStyle } from 'src/styles';
import withVerifyMasterKeyMnemonic, { IMergeProps } from './VerifyMasterKeyMnemonic.enhance';

const Styled = styled.div`
    .words {
        flex-wrap: wrap;
        justify-content: center;
        margin: 15px 0;
    }
    .word {
        border-radius: 11px;
        padding: 8px 6px;
        margin: 10px 5px 0;
        background-color: ${(props: IGlobalStyle) => props.theme.body};
        border-width: 0.5px;
        border-style: solid;
        border-color: ${COLORS.colorGreyBold};
        &.word-selected {
            background-color: ${(props: IGlobalStyle) => props.theme.button};
            border-color: transparent;
        }
    }
    .btn-container {
        margin-bottom: 30px;
    }
`;

const Word = React.memo(({ data }: { data: { text: string; index: number; isSelected: boolean } }) => {
    const { text, index, isSelected } = data;
    const dispatch = useDispatch();
    const handleToggleSelectedWordIndex = () => dispatch(actionToggleSelectedWordIndex(index));
    return (
        <button
            onClick={handleToggleSelectedWordIndex}
            type="button"
            className={`word ${isSelected ? 'word-selected' : ''}`}
        >
            <span className={`text ${isSelected ? 'inverse-text' : 'main-text'}`}>{` ${text}`}</span>
        </button>
    );
});

const Words = React.memo(() => {
    const words = useSelector(wordsSelector);
    return (
        <div className="words flex">
            {words.map((item) => (
                <Word key={`${item.text}`} data={item} />
            ))}
        </div>
    );
});

const VerifyMasterKeyMnemonic = (props: IMergeProps & any) => {
    const { handleVerifyMnemonic, submitting }: IMergeProps = props;
    const translate: IHDWalletLanguage = useSelector(translateByFieldSelector)('hdWallet');
    const isVerifyMnemonic = useSelector(isVerifyMnemonicSelector);
    const { desc1 } = translate.verifyMasterKeyMnemonic;
    const { importBtn, createBtn } = translate.general;
    const { invalidMnemonic } = translate.error;
    const actionType = useSelector(actionTypeHDWalletSelector);
    const selectedWords: string = useSelector(selectedWordsSelector);
    const theme = useSelector(themeSelector);
    return (
        <Styled theme={theme}>
            <p className="desc">{desc1}</p>
            <Words />
            <Mnemonic mnemonic={selectedWords} />
            {actionType === ACTION_TYPES.CREATE && (
                <Button
                    disabled={!isVerifyMnemonic || submitting}
                    title={isVerifyMnemonic ? `${createBtn}${submitting ? '...' : ''}` : invalidMnemonic}
                    onClick={handleVerifyMnemonic}
                />
            )}
            {actionType === ACTION_TYPES.IMPORT && <Button title={importBtn} />}
        </Styled>
    );
};

export default withVerifyMasterKeyMnemonic(React.memo(VerifyMasterKeyMnemonic));
