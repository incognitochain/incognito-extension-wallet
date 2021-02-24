import walletValidator from 'wallet-address-validator';
import { validation } from '@zilliqa-js/util';
import BigNumber from 'bignumber.js';
import isEmpty from 'lodash/isEmpty';
import convert from 'src/utils/convert';
import format from 'src/utils/format';
import { keyServices } from 'incognito-js/build/web/browser';

const isSafeInteger = (number: number) => Math.abs(number) <= Number.MAX_SAFE_INTEGER;

const required = (value: any) => (isEmpty(value) ? 'Required' : undefined);

const maxLength = (max: number) => (value: string) =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined;

const minLength = (min: number) => (value: string) =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined;

const isInteger = (value: string) =>
    value && !new BigNumber(value).isInteger() ? 'Must be a integer number' : undefined;

const number = (value: string) => {
    const bn = new BigNumber(value);
    if (bn.isNaN()) {
        return 'Must be a number';
    }
    if (value && !isSafeInteger(bn.toNumber())) {
        return 'This number is too large!';
    }
    return undefined;
};

const minValue = (min: number, message?: string) => (value: string) =>
    value && convert.toNumber({ text: value }) < min ? message || `Must be at least ${format.number(min)}` : undefined;

const maxValue = (max: number, message?: string) => (value: string) =>
    value && convert.toNumber({ text: value }) > max
        ? message || `Must be less than or equal ${format.number(max)}`
        : undefined;

const largerThan = (min: number, message?: string) => (value: string) =>
    value && convert.toNumber({ text: value }) <= min
        ? message || `Must be larger than ${format.number(min)}`
        : undefined;

const email = (message?: string) => (value: string) =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? message || 'Invalid email address' : undefined;

const regexp = (pattern: RegExp, message = 'Invalid data') => (value: string) =>
    pattern && !pattern.test(value) ? message : undefined;

const incognitoAddress = (message?: string) => (value: string) => {
    if (value?.length < 15 || !keyServices.checkPaymentAddress(value)) {
        return message || 'Invalid address';
    }
    if (value && !keyServices.checkPaymentAddress(value)) {
        return message || 'Use Unshield to exit Incognito';
    }
    return undefined;
};

const ethAddress = (message?: string) => (value: string) =>
    !walletValidator.validate(value, 'ETH', 'both') ? message || 'Invalid ETH address' : undefined;

const btcAddress = (message?: string) => (value: string) =>
    !walletValidator.validate(value, 'BTC', 'both') ? message || 'Invalid BTC address' : undefined;

const neoAddress = (message?: string) => (value: string) =>
    !walletValidator.validate(value, 'NEO', 'both') ? message || 'Invalid NEO address' : undefined;

const zenAddress = (message?: string) => (value: string) =>
    !walletValidator.validate(value, 'ZEN', 'both') ? message || 'Invalid Zen address' : undefined;

const zclAddress = (message?: string) => (value: string) =>
    !walletValidator.validate(value, 'ZCL', 'both') ? message || 'Invalid ZCL address' : undefined;

const zecAddress = (message?: string) => (value: string) =>
    !walletValidator.validate(value, 'ZEC', 'both') ? message || 'Invalid ZEC address' : undefined;

const votAddress = (message?: string) => (value: string) =>
    !walletValidator.validate(value, 'VOT', 'both') ? message || 'Invalid VOT address' : undefined;

const vtcAddress = (message?: string) => (value: string) =>
    !walletValidator.validate(value, 'VTC', 'both') ? message || 'Invalid VTC address' : undefined;

const sngAddress = (message?: string) => (value: string) =>
    !walletValidator.validate(value, 'SNG', 'both') ? message || 'Invalid SNG address' : undefined;

const xrpAddress = (message?: string) => (value: string) =>
    !walletValidator.validate(value, 'XRP', 'both') ? message || 'Invalid XRP address' : undefined;

const xrbAddress = (message?: string) => (value: string) =>
    !walletValidator.validate(value, 'XRB', 'both') ? message || 'Invalid XRB address' : undefined;

const qtumAddress = (message?: string) => (value: string) =>
    !walletValidator.validate(value, 'QTUM', 'both') ? message || 'Invalid QTUM address' : undefined;

const ptsAddress = (message?: string) => (value: string) =>
    !walletValidator.validate(value, 'PTS', 'both') ? message || 'Invalid protoshares address' : undefined;

const ppcAddress = (message?: string) => (value: string) =>
    !walletValidator.validate(value, 'PPC', 'both') ? message || 'Invalid PPC address' : undefined;

const gasAddress = (message?: string) => (value: string) =>
    !walletValidator.validate(value, 'GAS', 'both') ? message || 'Invalid GAS address' : undefined;

const nmcAddress = (message?: string) => (value: string) =>
    !walletValidator.validate(value, 'NMC', 'both') ? message || 'Invalid NMC address' : undefined;

const mecAddress = (message?: string) => (value: string) =>
    !walletValidator.validate(value, 'MEC', 'both') ? message || 'Invalid MEC address' : undefined;

const ltcAddress = (message?: string) => (value: string) =>
    !new RegExp('^(ltc1|[LM])[a-zA-HJ-NP-Z0-9]{26,40}$').test(value) ? message || 'Invalid LTC address' : undefined;

const kmdAddress = (message?: string) => (value: string) =>
    !walletValidator.validate(value, 'KMD', 'both') ? message || 'Invalid KMD address' : undefined;

const hushAddress = (message?: string) => (value: string) =>
    !walletValidator.validate(value, 'HUSH', 'both') ? message || 'Invalid HUSH address' : undefined;

const grlcAddress = (message?: string) => (value: string) =>
    !walletValidator.validate(value, 'GRLC', 'both') ? message || 'Invalid GRLC address' : undefined;

const frcAddress = (message?: string) => (value: string) =>
    !walletValidator.validate(value, 'FRC', 'both') ? message || 'Invalid FRC address' : undefined;

const dogeAddress = (message?: string) => (value: string) =>
    !walletValidator.validate(value, 'DOGE', 'both') ? message || 'Invalid DOGE address' : undefined;

const dgbAddress = (message?: string) => (value: string) =>
    !walletValidator.validate(value, 'DGB', 'both') ? message || 'Invalid DGB address' : undefined;

const dcrAddress = (message?: string) => (value: string) =>
    !walletValidator.validate(value, 'DCR', 'both') ? message || 'Invalid DCR address' : undefined;

const cloAddress = (message?: string) => (value: string) =>
    !walletValidator.validate(value, 'CLO', 'both') ? message || 'Invalid CLO address' : undefined;

const btgAddress = (message?: string) => (value: string) =>
    !walletValidator.validate(value, 'BTG', 'both') ? message || 'Invalid BTG address' : undefined;

const bchAddress = (message?: string) => (value: string) =>
    !walletValidator.validate(value, 'BCH', 'both') ? message || 'Invalid BCH address' : undefined;

const bioAddress = (message?: string) => (value: string) =>
    !walletValidator.validate(value, 'BIO', 'both') ? message || 'Invalid BIO address' : undefined;

const bvcAddress = (message?: string) => (value: string) =>
    !walletValidator.validate(value, 'BVC', 'both') ? message || 'Invalid BVC address' : undefined;

const bkxAddress = (message?: string) => (value: string) =>
    !walletValidator.validate(value, 'BKX', 'both') ? message || 'Invalid BKX address' : undefined;

const aurAddress = (message?: string) => (value: string) =>
    !walletValidator.validate(value, 'AUR', 'both') ? message || 'Invalid AUR address' : undefined;

const bnbAddress = (message?: string) => (value: string) => {
    const reg = new RegExp('^(t)?(bnb)([a-z0-9]{39})$'); // t(for testnet) bnb + 39 a-z0-9
    if (!reg.test(value)) {
        return message || 'Invalid BNB address';
    }
    return undefined;
};

const zilAddress = (message?: string) => (value: string) => {
    if (!validation.isBech32(value)) {
        return message || 'Invalid ZIL address';
    }
    return undefined;
};
// the same as ETH
const tomoAddress = (message?: string) => (value: string) =>
    !walletValidator.validate(value, 'ETH', 'both') ? message || 'Invalid TOMO address' : undefined;

// /**
//  *
//  * image/png, image/jpg, image/jpeg,...
//  */
// const fileTypes = (typeList, { message } = {}) => (value) => {
//   if (!value) return;

//   const fileType = value?.type;
//   const found = typeList.find((type) => {
//     if (!type) return false;
//     const pattern = new RegExp(`${type}$`, 'i');
//     return pattern.test(fileType);
//   });
//   return !found
//     ? messageHanlder(message, value, typeList) ??
//         `Please use a valid type (${typeList?.join(', ')})`
//     : undefined;
// };

// const maxFileSize = (sizeInKBytes, { message } = {}) => (value) => {
//   if (!value) return;
//   const fileSize = Math.ceil(Number(value?.size / 1024) || 0);

//   if (fileSize <= 0) {
//     return 'Invalid file, please choose another file';
//   }

//   return fileSize > sizeInKBytes
//     ? messageHanlder(message, value, sizeInKBytes) ??
//         `Please use a file smaller than ${sizeInKBytes}kb`
//     : undefined;
// };

const combinedAmount = [required, number, largerThan(0, 'Please enter an amount greater than 0')];

const combinedNanoAmount = [required, isInteger, number, minValue(1, 'Please enter an amount greater than 1.')];

const combinedIncognitoAddress = [required, incognitoAddress()];
const combinedETHAddress = [required, ethAddress()];
const combinedTOMOAddress = [required, tomoAddress()];
const combinedBTCAddress = [required, btcAddress()];
const combinedNEOAddress = [required, neoAddress()];
// const combinedXMRAddress = [required, xmrAddress()];
const combinedBNBAddress = [required, bnbAddress()];
const combinedZenAddress = [required, zenAddress()];
const combinedZCLAddress = [required, zclAddress()];
const combinedZECAddress = [required, zecAddress()];
const combinedVOTAddress = [required, votAddress()];
const combinedVTCAddress = [required, vtcAddress()];
const combinedSNGAddress = [required, sngAddress()];
const combinedXRPAddress = [required, xrpAddress()];
const combinedXRBAddress = [required, xrbAddress()];
const combinedQTUMAddress = [required, qtumAddress()];
const combinedPTSAddress = [required, ptsAddress()];
const combinedPPCAddress = [required, ppcAddress()];
const combinedGASAddress = [required, gasAddress()];
const combinedNMCAddress = [required, nmcAddress()];
const combinedMECAddress = [required, mecAddress()];
const combinedLTCAddress = [required, ltcAddress()];
const combinedKMDAddress = [required, kmdAddress()];
const combinedHUSHAddress = [required, hushAddress()];
const combinedGRLCAddress = [required, grlcAddress()];
const combinedFRCAddress = [required, frcAddress()];
const combinedDOGEAddress = [required, dogeAddress()];
const combinedDGBAddress = [required, dgbAddress()];
const combinedDCRAddress = [required, dcrAddress()];
const combinedCLOAddress = [required, cloAddress()];
const combinedBTGAddress = [required, btgAddress()];
const combinedBCHAddress = [required, bchAddress()];
const combinedBIOAddress = [required, bioAddress()];
const combinedBVCAddress = [required, bvcAddress()];
const combinedBKXAddress = [required, bkxAddress()];
const combinedAURAddress = [required, aurAddress()];
const combinedZILAddress = [required, zilAddress()];
const combinedUnknownAddress = [required, minLength(15)];
// const combinedTokenName = [
//   required(),
//   minLength(3),
//   maxLength(50),
//   regexp(/\w+$/i, {
//     message: 'Please use a valid coin name (Ex: "My Coin, Coin-1,..").',
//   }),
// ];
// const combinedTokenSymbol = [
//   required(),
//   minLength(2),
//   maxLength(10),
//   regexp(/^[A-Z]+$/, {
//     message: 'Please use a valid coin ticker (Ex: "SYM").',
//   }),
// ];
const combinedAccountName = [
    required,
    minLength(1),
    maxLength(50),
    regexp(/\w+$/i, 'Please use a valid account name (Ex: "Cat, Account-1,..").'),
];
// t(for testnet) bnb + 39 a-z0-9
const isBNBAddress = (address: string) => new RegExp('^(t)?(bnb)([a-z0-9]{39})$').test(address);

const isZILAddress = (address: string) => validation.isBech32(address);

const address = () => {
    return 'Invalid address';
};

const combineInvalidAddress = [required, address];

const NAME_PATTERN = /^[A-Za-z0-9]*$/;

const validateAlphaNumericText = (message?: string) => (value: any) => {
    return !NAME_PATTERN.test(value) ? message : undefined;
};

const validator = {
    validateAlphaNumericText,
    minLength,
    required,
    maxValue,
    minValue,
    address,
    combinedAmount,
    combinedAccountName,
    combinedNanoAmount,
    combineInvalidAddress,
    combinedIncognitoAddress,
    combinedETHAddress,
    combinedTOMOAddress,
    combinedBTCAddress,
    combinedBNBAddress,
    combinedNEOAddress,
    combinedZenAddress,
    combinedZCLAddress,
    combinedZECAddress,
    combinedVOTAddress,
    combinedVTCAddress,
    combinedSNGAddress,
    combinedXRBAddress,
    combinedXRPAddress,
    combinedQTUMAddress,
    combinedPTSAddress,
    combinedPPCAddress,
    combinedGASAddress,
    combinedNMCAddress,
    combinedMECAddress,
    combinedLTCAddress,
    combinedKMDAddress,
    combinedHUSHAddress,
    combinedGRLCAddress,
    combinedFRCAddress,
    combinedDOGEAddress,
    combinedDGBAddress,
    combinedDCRAddress,
    combinedCLOAddress,
    combinedBTGAddress,
    combinedBCHAddress,
    combinedBIOAddress,
    combinedBVCAddress,
    combinedBKXAddress,
    combinedAURAddress,
    combinedZILAddress,
    combinedUnknownAddress,
    email,
    isBNBAddress,
    isZILAddress,
};

export default validator;
