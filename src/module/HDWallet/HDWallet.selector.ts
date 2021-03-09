import toLower from 'lodash/toLower';
import { WalletInstance } from 'incognito-js/build/web/browser';
import { createSelector } from 'reselect';
import { IRootState } from 'src/redux/interface';
import { IMasterKey } from './HDWallet.interface';

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

export const listMasterKeyWithKeychainsSelector = createSelector(listSelector, (getListMasterKey) => {
    const listMasterKey = getListMasterKey();
    return listMasterKey.map((masterKey: IMasterKey) => {
        const { wallet }: { wallet: WalletInstance } = masterKey;
        const listAccount = wallet.masterAccount.getAccounts();
        return {
            ...masterKey,
            listAccount,
        };
    });
});

export const fullListAccountSelector = createSelector(listMasterKeyWithKeychainsSelector, (listMasterKey) => {
    let fullListAccount: any[] = [];
    listMasterKey.map((masterKey) => [...fullListAccount, ...masterKey.listAccount]);
    return fullListAccount;
});
