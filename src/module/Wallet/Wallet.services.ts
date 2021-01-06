import { http } from 'src/http';
import { WalletInstance } from 'incognito-js/build/web/browser';

export const apiGetWalletAccounts = (apiUrl: string, wallet: WalletInstance) => {
    // const masterAccountInfo = wallet.masterAccount.getSerializedInformations();
    // const masterAccountPublicKey = masterAccountInfo.publicKey;
    // return http
    //     .get(`${apiUrl}/hd-wallet/recovery?Key=${masterAccountPublicKey}`)
    //     .then((res: any) => res?.Accounts)
    //     .then((accounts) =>
    //         accounts.map((account: any) => ({
    //             name: account.Name,
    //             id: account.AccountID,
    //         })),
    //     )
    //     .catch(() => []);
    return [];
};

export const apiUpdateWalletAccounts = (apiUrl: string, wallet: WalletInstance) => {
    // const accounts = [];
    //
    // for (const account of wallet.masterAccount.getAccounts()) {
    //     const info = account.getSerializedInformations();
    //     accounts.push({
    //         name: account.name,
    //         id: info.index,
    //     });
    // }
    //
    // const masterAccountInfo = wallet.masterAccount.getSerializedInformations();
    //
    // const accountInfos = accounts.map((item: any) => ({
    //     Name: item.name,
    //     AccountID: item.id,
    // }));
    //
    // return http
    //     .put(`${apiUrl}/hd-wallet/recovery`, {
    //         Key: masterAccountInfo.publicKey,
    //         Accounts: accountInfos,
    //     })
    //     .catch((e) => e);
};
