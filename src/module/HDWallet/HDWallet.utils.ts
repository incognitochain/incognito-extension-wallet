import toLower from 'lodash/toLower';
import isEqual from 'lodash/isEqual';
import { mnemonicService } from 'incognito-js/build/web/browser';
import { MASTERLESS_WALLET_NAME } from 'src/configs/walletConfigs';
import { IMasterKey } from './HDWallet.interface';

export const validateMnemonic = (mnemonic: string) =>
    mnemonic.split(' ').length === 12 || mnemonicService.validateMnemonic(mnemonic);

export const isDupMasterless = (masterKeyName: string) =>
    isEqual(toLower(masterKeyName), toLower(MASTERLESS_WALLET_NAME));

export const hasKeychainCreatedByMasterKey = async (list: IMasterKey[], privateKey: string) => {
    let walletIndex = -1;
    let walletId = -1;
    try {
        const task = list.map(({ wallet }) => wallet.checkIsAccountCreatedBy(privateKey));
        const result = await Promise.all([...task]);
        walletIndex = result.findIndex((created: boolean) => created === true);
        if (walletIndex > -1) {
            walletId = list[walletIndex].walletId;
        }
    } catch (error) {
        throw error;
    }
    return walletId;
};
