import toLower from 'lodash/toLower';
import { AccountInstance, WalletInstance } from 'incognito-js/build/web/browser';
import { createSelector } from 'reselect';
import { IRootState } from 'src/redux/interface';
import { moveEleToEndByIndex } from 'src/utils/array';
import { IGeneralLanguage } from 'src/i18n';
import toUpper from 'lodash/toUpper';
import { translateByFieldSelector } from 'src/module/Configs/Configs.selector';
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

export const getlistAccountByMasterKeySelector = createSelector(
    getMasterKeyByIdSelector,
    (getMasterKeyById) => (masterKeyId: number) => getMasterKeyById(masterKeyId)?.wallet.masterAccount.getAccounts(),
);

export const listMasterKeyWithKeychainsSelector = createSelector(listSelector, (getListMasterKey) => {
    let listMasterKey = getListMasterKey();
    let listMasterKeyWithListAccount = listMasterKey
        .map((masterKey: IMasterKey) => {
            const { wallet }: { wallet: WalletInstance } = masterKey;
            const listAccount = wallet.masterAccount.getAccounts();
            return {
                ...masterKey,
                listAccount,
            };
        })
        .sort((a, b) => (toLower(a.wallet.name) < toLower(b.wallet.name) ? -1 : 1));
    const indexMasterless = listMasterKeyWithListAccount.findIndex((item) => item.isMasterless);
    let result = moveEleToEndByIndex(listMasterKeyWithListAccount, indexMasterless);
    return result;
});

export const fullListAccountSelector = createSelector(listMasterKeyWithKeychainsSelector, (listMasterKey) => {
    let fullListAccount: any[] = [];
    listMasterKey.forEach((masterKey) => {
        fullListAccount = [...fullListAccount, ...masterKey.listAccount];
    });
    return fullListAccount;
});

export const backupAllMasterKeySelector = createSelector(
    listMasterKeyWithKeychainsSelector,
    translateByFieldSelector,
    (listMasterKey, translateByField) => {
        const translate: IGeneralLanguage = translateByField('general');
        let result = listMasterKey.reduce((prev, masterKey) => {
            const { wallet, isMasterless } = masterKey;
            const { name, mnemonic, masterAccount } = wallet;
            let prevRes = prev;
            if (!isMasterless) {
                prevRes += `
                \n${translate.masterKeyName}: ${name}
                \n${translate.phrase}: ${mnemonic}
                \n
                `;
            } else {
                prevRes += `\n------- ${toUpper(translate.masterLess)} -------\n`;
                const listAccount: AccountInstance[] = masterAccount.getAccounts();
                listAccount.forEach((account: AccountInstance) => {
                    prevRes += `
                        \n${translate.keychainName}: ${account.name}
                        \n${translate.privateKey}: ${account.key.keySet.privateKeySerialized}
                        \n
                        `;
                });
            }
            return prevRes;
        }, `------- ${toUpper(translate.masterKey)} -------\n`);
        return result;
    },
);
