import toLower from 'lodash/toLower';
import isEqual from 'lodash/isEqual';
import { mnemonicService } from 'incognito-js/build/web/browser';
import { MASTERLESS_WALLET_NAME } from 'src/configs/walletConfigs';

export const validateMnemonic = (mnemonic: string) =>
    mnemonic.split(' ').length === 12 || mnemonicService.validateMnemonic(mnemonic);

export const isDupMasterless = (masterKeyName: string) =>
    isEqual(toLower(masterKeyName), toLower(MASTERLESS_WALLET_NAME));
