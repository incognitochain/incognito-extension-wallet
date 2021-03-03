import toLower from 'lodash/toLower';
import { WalletInstance } from 'incognito-js/build/web/browser';
import { createSelector } from 'reselect';
import { IRootState } from 'src/redux/interface';

export const hdWalletSelector = createSelector(
    (state: IRootState) => state.hdWallet,
    (hdWallet) => hdWallet,
);

export const rootHDWalletSelector = createSelector(hdWalletSelector, (hdWallet) => hdWallet.root);

export const actionTypeHDWalletSelector = createSelector(rootHDWalletSelector, (root) => root.actionType);

export const listSelector = createSelector(rootHDWalletSelector, ({ list }) => (excludeMasterless = false) =>
    excludeMasterless ? list.filter((item) => !item.isMasterless) : list,
);

export const listMasterKeySelector = createSelector(rootHDWalletSelector, (root) =>
    root.list.map((item) => item.wallet),
);

export const listMasterKeyIdsAndNamesSelector = createSelector(rootHDWalletSelector, (root) =>
    root.list.map((item) => ({ walletId: item.walletId, name: item.wallet.name })),
);

export const listMasterKeyNameSelector = createSelector(listMasterKeySelector, (list: WalletInstance[]) =>
    list.map((masterKey: WalletInstance) => masterKey.name),
);

export const listMasterKeyMnemonicSelector = createSelector(listMasterKeySelector, (list: WalletInstance[]) =>
    list.map((masterKey: WalletInstance) => masterKey.mnemonic),
);

export const isMasterKeyNameExistSelector = createSelector(
    listMasterKeyNameSelector,
    (list: string[]) => (name: string) => list.map((item) => toLower(item)).includes(toLower(name)),
);

export const isMasterKeyMnemonicExistSelector = createSelector(
    listMasterKeyMnemonicSelector,
    (list: string[]) => (mnemonic: string) => list.includes(mnemonic),
);

export const getMasterKeyByIdSelector = createSelector(rootHDWalletSelector, ({ list }) => (masterKeyId: number) =>
    list.find((masterKey) => masterKey.walletId === masterKeyId),
);
