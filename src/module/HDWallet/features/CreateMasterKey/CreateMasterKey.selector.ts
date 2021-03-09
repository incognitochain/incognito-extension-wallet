import isEqual from 'lodash/isEqual';
import { IRootState } from 'src/redux/interface';
import { createSelector } from 'reselect';
import { isDevSelector } from 'src/module/Setting/Setting.selector';

export const createMasterKeySelector = createSelector(
    (state: IRootState) => state.hdWallet,
    (hdWallet) => hdWallet.create,
);

export const masterKeyNameSelector = createSelector(createMasterKeySelector, ({ masterKeyName }) => masterKeyName);

export const mnemonicSelector = createSelector(createMasterKeySelector, ({ mnemonic }) => mnemonic);

export const wordsSelector = createSelector(createMasterKeySelector, ({ selectedWordsIndex, randomWords }) => {
    const words = randomWords.map((item, index) => ({
        text: item,
        index,
        isSelected: selectedWordsIndex.includes(index),
    }));
    return words;
});

export const selectedWordsIndexSelector = createSelector(
    createMasterKeySelector,
    ({ selectedWordsIndex }) => selectedWordsIndex,
);

export const selectedWordsSelector = createSelector(
    selectedWordsIndexSelector,
    wordsSelector,
    (selectedWordsIndex, words) => selectedWordsIndex.map((item) => words[item].text).join(' '),
);

export const isVerifyMnemonicSelector = createSelector(
    mnemonicSelector,
    selectedWordsSelector,
    isDevSelector,
    (mnemonic, selectedWords, isDev) => (isDev ? true : isEqual(mnemonic, selectedWords)),
);
