// import walletValidator from 'wallet-address-validator';
// import formatUtils from 'src/utils/format';
// import { validation } from '@zilliqa-js/util';
// import convert from 'src/utils/convert';
// import { CONSTANT_COMMONS } from 'src/constants';
import isEmpty from 'lodash/isEmpty';

// const isSafeInteger = (number: number) => {
//   return Math.abs(number) <= Number.MAX_SAFE_INTEGER;
// };

// const required = ({ message } = {}) => (value) => {
//   if (value !== undefined && value !== null) {
//     if (typeof value === 'string' && String(value).trim() === '') {
//       return messageHanlder(message, value) ?? 'Required';
//     }
//     return undefined;
//   }

//   return messageHanlder(message, value) ?? 'Required';
// };

export const required = (value: any) =>
  isEmpty(value) ? 'Required' : undefined;

const maxLength = (max: number) => (value: string) =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const minLength = (min: number) => (value: string) =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;

// const maxLength = (max, { message } = {}) => (value) =>
//   value && value.length > max
//     ? messageHanlder(message, value, max) ?? `Must be ${max} characters or less`
//     : undefined;

// const minLength = (min, { message } = {}) => (value) =>
//   value && value.length < min
//     ? messageHanlder(message, value, min) ??
//       `Must be at least ${min} characters`
//     : undefined;

// const isInteger = ({ message } = {}) => (value) =>
//   value && !Number.isInteger(convert.toNumber(value))
//     ? messageHanlder(message, value) ?? 'Must be a integer number'
//     : undefined;

// const number = ({ message } = {}) => (value) => {
//   const number = convert.toNumber(value);
//   if (value && isNaN(number)) {
//     return messageHanlder(message, value) ?? 'Must be a number';
//   }

//   if (value && !isSafeInteger(number)) {
//     return messageHanlder(message, value) ?? 'This number is too large!';
//   }

//   return undefined;
// };

// const minValue = (min, { message } = {}) => (value) =>
//   value && convert.toNumber(value) < min
//     ? messageHanlder(message, value, min) ??
//       `Must be at least ${formatUtils.number(min)}`
//     : undefined;

// const maxValue = (max, { message } = {}) => (value) =>
//   value && convert.toNumber(value) > max
//     ? messageHanlder(message, value, max) ??
//       `Must be less than or equal ${formatUtils.number(max)}`
//     : undefined;

// const largerThan = (min, { message } = {}) => (value) =>
//   value && value <= min
//     ? messageHanlder(message, value, min) ??
//       `Must be larger than ${formatUtils.number(min)}`
//     : undefined;

// const email = ({ message } = {}) => (value) =>
//   value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
//     ? messageHanlder(message, value) ?? 'Invalid email address'
//     : undefined;

// const notInList = (list, { message } = {}) => (value) =>
//   list?.includes(value)
//     ? messageHanlder(message, value, list) ?? 'Please use another value'
//     : undefined;

const regexp = (pattern: RegExp, message = 'Invalid data') => (value: string) =>
  pattern && !pattern.test(value) ? message : undefined;

// const maxBytes = (max, { message } = {}) => (value) =>
//   value && new Blob([String(value)])?.size > max
//     ? messageHanlder(message, value, max) ??
//       `Must be less than or equal ${formatUtils.number(max)} bytes`
//     : undefined;

// const incognitoAddress = (value, { message } = {}) => (value) =>
//   value && value?.length < 15
//     ? 'Invalid address'
//     : value && !accountService.checkPaymentAddress(value)
//     ? messageHanlder(message, value) ?? 'Use Unshield to exit Incognito'
//     : undefined;

// const ethAddress = (value, { message } = {}) => (value) =>
//   !walletValidator.validate(value, 'ETH', 'both')
//     ? messageHanlder(message, value) ?? 'Invalid ETH address'
//     : undefined;

// const btcAddress = (value, { message } = {}) => (value) =>
//   !walletValidator.validate(value, 'BTC', 'both')
//     ? messageHanlder(message, value) ?? 'Invalid BTC address'
//     : undefined;

// const neoAddress = (value, { message } = {}) => (value) =>
//   !walletValidator.validate(value, 'NEO', 'both')
//     ? messageHanlder(message, value) ?? 'Invalid NEO address'
//     : undefined;

// const xmrAddress = (value, { message } = {}) => (value) =>
//   !walletValidator.validate(value, 'XMR', 'both')
//     ? messageHanlder(message, value) ?? 'Invalid Monero address'
//     : undefined;

// const zenAddress = (value, { message } = {}) => (value) =>
//   !walletValidator.validate(value, 'ZEN', 'both')
//     ? messageHanlder(message, value) ?? 'Invalid Zen address'
//     : undefined;

// const zclAddress = (value, { message } = {}) => (value) =>
//   !walletValidator.validate(value, 'ZCL', 'both')
//     ? messageHanlder(message, value) ?? 'Invalid ZCL address'
//     : undefined;

// const zecAddress = (value, { message } = {}) => (value) =>
//   !walletValidator.validate(value, 'ZEC', 'both')
//     ? messageHanlder(message, value) ?? 'Invalid ZEC address'
//     : undefined;

// const votAddress = (value, { message } = {}) => (value) =>
//   !walletValidator.validate(value, 'VOT', 'both')
//     ? messageHanlder(message, value) ?? 'Invalid VOT address'
//     : undefined;

// const vtcAddress = (value, { message } = {}) => (value) =>
//   !walletValidator.validate(value, 'VTC', 'both')
//     ? messageHanlder(message, value) ?? 'Invalid VTC address'
//     : undefined;

// const sngAddress = (value, { message } = {}) => (value) =>
//   !walletValidator.validate(value, 'SNG', 'both')
//     ? messageHanlder(message, value) ?? 'Invalid SNG address'
//     : undefined;

// const xrpAddress = (value, { message } = {}) => (value) =>
//   !walletValidator.validate(value, 'XRP', 'both')
//     ? messageHanlder(message, value) ?? 'Invalid XRP address'
//     : undefined;

// const xrbAddress = (value, { message } = {}) => (value) =>
//   !walletValidator.validate(value, 'XRB', 'both')
//     ? messageHanlder(message, value) ?? 'Invalid XRB address'
//     : undefined;

// const qtumAddress = (value, { message } = {}) => (value) =>
//   !walletValidator.validate(value, 'QTUM', 'both')
//     ? messageHanlder(message, value) ?? 'Invalid QTUM address'
//     : undefined;

// const ptsAddress = (value, { message } = {}) => (value) =>
//   !walletValidator.validate(value, 'PTS', 'both')
//     ? messageHanlder(message, value) ?? 'Invalid protoshares address'
//     : undefined;

// const ppcAddress = (value, { message } = {}) => (value) =>
//   !walletValidator.validate(value, 'PPC', 'both')
//     ? messageHanlder(message, value) ?? 'Invalid PPC address'
//     : undefined;

// const gasAddress = (value, { message } = {}) => (value) =>
//   !walletValidator.validate(value, 'GAS', 'both')
//     ? messageHanlder(message, value) ?? 'Invalid GAS address'
//     : undefined;

// const nmcAddress = (value, { message } = {}) => (value) =>
//   !walletValidator.validate(value, 'NMC', 'both')
//     ? messageHanlder(message, value) ?? 'Invalid NMC address'
//     : undefined;

// const mecAddress = (value, { message } = {}) => (value) =>
//   !walletValidator.validate(value, 'MEC', 'both')
//     ? messageHanlder(message, value) ?? 'Invalid MEC address'
//     : undefined;

// const ltcAddress = (value, { message } = {}) => (value) =>
//   !walletValidator.validate(value, 'LTC', 'both')
//     ? messageHanlder(message, value) ?? 'Invalid LTC address'
//     : undefined;

// const kmdAddress = (value, { message } = {}) => (value) =>
//   !walletValidator.validate(value, 'KMD', 'both')
//     ? messageHanlder(message, value) ?? 'Invalid KMD address'
//     : undefined;

// const hushAddress = (value, { message } = {}) => (value) =>
//   !walletValidator.validate(value, 'HUSH', 'both')
//     ? messageHanlder(message, value) ?? 'Invalid HUSH address'
//     : undefined;

// const grlcAddress = (value, { message } = {}) => (value) =>
//   !walletValidator.validate(value, 'GRLC', 'both')
//     ? messageHanlder(message, value) ?? 'Invalid GRLC address'
//     : undefined;

// const frcAddress = (value, { message } = {}) => (value) =>
//   !walletValidator.validate(value, 'FRC', 'both')
//     ? messageHanlder(message, value) ?? 'Invalid FRC address'
//     : undefined;

// const dogeAddress = (value, { message } = {}) => (value) =>
//   !walletValidator.validate(value, 'DOGE', 'both')
//     ? messageHanlder(message, value) ?? 'Invalid DOGE address'
//     : undefined;

// const dgbAddress = (value, { message } = {}) => (value) =>
//   !walletValidator.validate(value, 'DGB', 'both')
//     ? messageHanlder(message, value) ?? 'Invalid DGB address'
//     : undefined;

// const dcrAddress = (value, { message } = {}) => (value) =>
//   !walletValidator.validate(value, 'DCR', 'both')
//     ? messageHanlder(message, value) ?? 'Invalid DCR address'
//     : undefined;

// const cloAddress = (value, { message } = {}) => (value) =>
//   !walletValidator.validate(value, 'CLO', 'both')
//     ? messageHanlder(message, value) ?? 'Invalid CLO address'
//     : undefined;

// const btgAddress = (value, { message } = {}) => (value) =>
//   !walletValidator.validate(value, 'BTG', 'both')
//     ? messageHanlder(message, value) ?? 'Invalid BTG address'
//     : undefined;

// const bchAddress = (value, { message } = {}) => (value) =>
//   !walletValidator.validate(value, 'BCH', 'both')
//     ? messageHanlder(message, value) ?? 'Invalid BCH address'
//     : undefined;

// const bioAddress = (value, { message } = {}) => (value) =>
//   !walletValidator.validate(value, 'BIO', 'both')
//     ? messageHanlder(message, value) ?? 'Invalid BIO address'
//     : undefined;

// const bvcAddress = (value, { message } = {}) => (value) =>
//   !walletValidator.validate(value, 'BVC', 'both')
//     ? messageHanlder(message, value) ?? 'Invalid BVC address'
//     : undefined;

// const bkxAddress = (value, { message } = {}) => (value) =>
//   !walletValidator.validate(value, 'BKX', 'both')
//     ? messageHanlder(message, value) ?? 'Invalid BKX address'
//     : undefined;

// const aurAddress = (value, { message } = {}) => (value) =>
//   !walletValidator.validate(value, 'AUR', 'both')
//     ? messageHanlder(message, value) ?? 'Invalid AUR address'
//     : undefined;

// const bnbAddress = (value, { message } = {}) => (value) => {
//   const regexp = new RegExp('^(t)?(bnb)([a-z0-9]{39})$'); // t(for testnet) bnb + 39 a-z0-9
//   if (!regexp.test(value)) {
//     return messageHanlder(message, value) ?? 'Invalid BNB address';
//   }
//   return undefined;
// };

// const zilAddress = (value, { message } = {}) => (value) => {
//   if (!validation.isBech32(value)) {
//     return messageHanlder(message, value) ?? 'Invalid ZIL address';
//   }
//   return undefined;
// };
// // the same as ETH
// const tomoAddress = (value, { message } = {}) => (value) =>
//   !walletValidator.validate(value, 'ETH', 'both')
//     ? messageHanlder(message, value) ?? 'Invalid TOMO address'
//     : undefined;

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

// const isUnShieldAddress = ({
//   address,
//   externalSymbol,
//   isErc20Token,
//   isBep2Token,
// }) => {
//   if (isBep2Token || externalSymbol === CONSTANT_COMMONS.CRYPTO_SYMBOL.BNB) {
//     const regexp = new RegExp('^(t)?(bnb)([a-z0-9]{39})$'); // t(for testnet) bnb + 39 a-z0-9
//     return regexp.test(address);
//   }
//   if (isErc20Token || CONSTANT_COMMONS.CRYPTO_SYMBOL.TOMO === externalSymbol) {
//     return walletValidator.validate(
//       address,
//       CONSTANT_COMMONS.CRYPTO_SYMBOL.ETH,
//       'both'
//     );
//   }
//   if (externalSymbol === CONSTANT_COMMONS.CRYPTO_SYMBOL.ZIL) {
//     return validation.isBech32(address);
//   }
//   if (address) {
//     return walletValidator.validate(address, externalSymbol, 'both');
//   }
//   return false;
// };

// const combinedAmount = [
//   required(),
//   number(),
//   largerThan(0, { message: 'Please enter an amount greater than 0' }),
// ];

// const combinedNanoAmount = [
//   required(),
//   isInteger(),
//   number(),
//   minValue(1, { message: 'Please enter an amount greater than 1.' }),
// ];

// const combinedIncognitoAddress = [required(), incognitoAddress()];
// const combinedETHAddress = [required(), ethAddress()];
// const combinedTOMOAddress = [required(), tomoAddress()];
// const combinedBTCAddress = [required(), btcAddress()];
// const combinedNEOAddress = [required(), neoAddress()];
// // const combinedXMRAddress = [required(), xmrAddress()];
// const combinedBNBAddress = [required(), bnbAddress()];

// const combinedZenAddress = [required(), zenAddress()];
// const combinedZCLAddress = [required(), zclAddress()];
// const combinedZECAddress = [required(), zecAddress()];
// const combinedVOTAddress = [required(), votAddress()];
// const combinedVTCAddress = [required(), vtcAddress()];
// const combinedSNGAddress = [required(), sngAddress()];
// const combinedXRPAddress = [required(), xrpAddress()];
// const combinedXRBAddress = [required(), xrbAddress()];
// const combinedQTUMAddress = [required(), qtumAddress()];
// const combinedPTSAddress = [required(), ptsAddress()];
// const combinedPPCAddress = [required(), ppcAddress()];
// const combinedGASAddress = [required(), gasAddress()];
// const combinedNMCAddress = [required(), nmcAddress()];
// const combinedMECAddress = [required(), mecAddress()];
// const combinedLTCAddress = [required(), ltcAddress()];
// const combinedKMDAddress = [required(), kmdAddress()];
// const combinedHUSHAddress = [required(), hushAddress()];
// const combinedGRLCAddress = [required(), grlcAddress()];
// const combinedFRCAddress = [required(), frcAddress()];
// const combinedDOGEAddress = [required(), dogeAddress()];
// const combinedDGBAddress = [required(), dgbAddress()];
// const combinedDCRAddress = [required(), dcrAddress()];
// const combinedCLOAddress = [required(), cloAddress()];
// const combinedBTGAddress = [required(), btgAddress()];
// const combinedBCHAddress = [required(), bchAddress()];
// const combinedBIOAddress = [required(), bioAddress()];
// const combinedBVCAddress = [required(), bvcAddress()];
// const combinedBKXAddress = [required(), bkxAddress()];
// const combinedAURAddress = [required(), aurAddress()];
// const combinedZILAddress = [required(), zilAddress()];
// const combinedUnknownAddress = [required(), minLength(15)];
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
export const combinedAccountName = [
  required,
  minLength(1),
  maxLength(50),
  regexp(/\w+$/i, 'Please use a valid account name (Ex: "Cat, Account-1,..").'),
];

// const isBNBAddress = (address) => {
//   const regexp = new RegExp('^(t)?(bnb)([a-z0-9]{39})$'); // t(for testnet) bnb + 39 a-z0-9
//   return regexp.test(address);
// };

// const isZILAddress = (address) => validation.isBech32(address);

// const invalidAddress = (message = '') => () =>
//   message ? message : 'Invalid address';
