import isEmpty from 'lodash/isEmpty';
import findIndex from 'lodash/findIndex';
import { CONSTANT_KEYS } from 'src/constants';
import { DECIMAL_SEPARATOR } from 'src/utils/separator';

export const KEY_SAVE = {
    USER: CONSTANT_KEYS.USER,
    LIST_DEVICE: CONSTANT_KEYS.LIST_DEVICE,
    LIST_TOKEN: CONSTANT_KEYS.LIST_TOKEN,
    DEX: CONSTANT_KEYS.DEX,
    DEX_HISTORY: CONSTANT_KEYS.DEX_HISTORY,
    UNISWAP_HISTORY: CONSTANT_KEYS.UNISWAP_HISTORY,
    SEEN_DEPOSIT_GUIDE: CONSTANT_KEYS.SEEN_DEPOSIT_GUIDE,
    PIN: CONSTANT_KEYS.PIN,
    DECIMAL_SEPARATOR: '$decimal_separator',
    VERIFY_CODE: '$verify_code',
    ACCOUNT_QRCODE: '$account_qrcode',
    DEVICE_ID: '$device_id',
    WITHDRAWAL_DATA: CONSTANT_KEYS.WITHDRAWAL_DATA,
    BACKUP_STAKE_KEY: CONSTANT_KEYS.BACKUP_STAKE_KEY,
    VIEW_UNISWAP_TOOLTIP: '$uniswap_tooltip',
    UNISWAP_AIRDROP: '$uniswap_airdrop',
    SCREEN_STAKE_GUIDE: CONSTANT_KEYS.SCREEN_STAKE_GUIDE,
    WEBVIEW: '$webview',
    PROVIDE_TXS: CONSTANT_KEYS.PROVIDE_TXS,
    NODECLEARED: '$node_cleared',
    SHIP_ADDRESS: '$ship_address',
    IS_MAINNET: 'IS_MAINNET',
};

export const getItem = (key: string) => localStorage.getItem(key);

export const setItem = (key: string, value: string) => localStorage.setItem(key, value);

export const isMainnetEnv = () => getItem(KEY_SAVE.IS_MAINNET) === 'false';

export const getListDevices = () => {
    const listDevice = getItem(KEY_SAVE.LIST_DEVICE) || '';
    return !isEmpty(listDevice) ? JSON.parse(listDevice) : [];
};

export const saveListDevices = (jsonListDevice: any[]) => {
    const listDevices = JSON.stringify(jsonListDevice);
    setItem(KEY_SAVE.LIST_DEVICE, listDevices);
};

export const removeDevice = (device: any, list: any[]) => {
    let listDevices: any[] = [];
    listDevices = list.filter((item) => item.ProductId !== device.ProductId);
    saveListDevices(listDevices);
};

export const updateDevice = (deviceJson: any) => {
    const list = getListDevices();
    const index = findIndex(list, ['product_name', deviceJson.product_name]);
    if (index >= 0) {
        list[index] = {
            ...list[index],
            ...deviceJson,
        };
    } else {
        list.push(deviceJson);
    }
    saveListDevices(list);
};
/**
 * return {JSON} : deviceInfo
 */
export const getDevice = (productId: string | number) => {
    if (isEmpty(productId)) throw new Error('product_id is empty');
    const list = getListDevices();
    const index = findIndex(list, ['product_id', productId]);
    return list[index];
};

export const getListToken = () => {
    const list = getItem(KEY_SAVE.LIST_TOKEN);
    return JSON.parse(list || '[]');
};

export const saveListToken = (listToken: any[]) => setItem(KEY_SAVE.LIST_TOKEN, JSON.stringify(listToken));

export const saveDeviceKeyInfo = (productId: string | number, keyInfo: any) => {
    if (isEmpty(productId) && isEmpty(keyInfo)) {
        const deviceJSON = getDevice(productId);
        if (deviceJSON) {
            deviceJSON.keyInfo = {
                ...deviceJSON.keyInfo,
                ...keyInfo,
            };
            updateDevice(deviceJSON);
        }
    }
};
export const saveUpdatingFirware = (productId: string | number, isUpdating: boolean) => {
    if (isEmpty(productId)) {
        const deviceJSON = getDevice(productId);
        if (deviceJSON) {
            deviceJSON.minerInfo = {
                ...deviceJSON.minerInfo,
                isUpdating,
            };
            updateDevice(deviceJSON);
        }
    }
};

export const logout = () => {
    localStorage.removeItem(KEY_SAVE.USER);
    localStorage.removeItem(KEY_SAVE.LIST_DEVICE);
};

export const saveUserInfo = (jsonUser: string) => {
    const oldUser = getItem(KEY_SAVE.USER) || '';
    if (jsonUser !== oldUser) {
        const data = { ...JSON.parse(oldUser), ...JSON.parse(jsonUser) };
        setItem(KEY_SAVE.USER, JSON.stringify(data));
    }
};

export const saveDEXInfo = (dexInfo: any) => {
    setItem(KEY_SAVE.DEX, JSON.stringify(dexInfo));
};

export const getDEXInfo = () => {
    const dexString = getItem(KEY_SAVE.DEX) || '';
    return isEmpty(dexString) ? null : JSON.parse(dexString);
};

export const saveDexHistory = (swapHistory: any) => {
    setItem(KEY_SAVE.DEX_HISTORY, JSON.stringify(swapHistory));
};

export const getDexHistory = () => {
    const swapHistory = getItem(KEY_SAVE.DEX_HISTORY) || '';
    return isEmpty(swapHistory) ? [] : JSON.parse(swapHistory);
};

export const saveSeenDepositGuide = (firstTime: any) => {
    setItem(KEY_SAVE.SEEN_DEPOSIT_GUIDE, JSON.stringify(firstTime));
};

export const getSeenDepositGuide = () => {
    const seenDepositGuide = getItem(KEY_SAVE.SEEN_DEPOSIT_GUIDE) || '';
    return isEmpty(seenDepositGuide) ? false : JSON.parse(seenDepositGuide);
};

export const getPIN = () => {
    const pin = getItem(KEY_SAVE.PIN);
    return pin || '';
};

export const savePIN = (newPin: any) => {
    setItem(KEY_SAVE.PIN, newPin);
};

export const saveLocalDecimalSeparator = (separator: string) => {
    return setItem(KEY_SAVE.DECIMAL_SEPARATOR, separator);
};

export const getLocalDecimalSeparator = () => {
    return getItem(KEY_SAVE.DECIMAL_SEPARATOR) || DECIMAL_SEPARATOR;
};

export const saveVerifyCode = (verifyCode: string) => {
    return setItem(KEY_SAVE.VERIFY_CODE, verifyCode);
};

export const getVerifyCode = () => {
    const verifyCode = getItem(KEY_SAVE.VERIFY_CODE);
    return verifyCode;
};

export const saveAccountWithQRCode = (account: any) => {
    return setItem(KEY_SAVE.ACCOUNT_QRCODE, JSON.stringify(account));
};

export const getAccountWithQRCode = () => {
    const verifyCode = getItem(KEY_SAVE.ACCOUNT_QRCODE);
    return verifyCode;
};

export const getSyncReceivers = (keySync: string) => {
    return getItem(keySync);
};

export const setSyncReceivers = (keySync: string, value: any) => {
    return setItem(keySync, JSON.stringify(value));
};

/**
 * @returns {Array<Object>}
 */
export const getWithdrawalData = () => {
    try {
        const jsonData = getItem(KEY_SAVE.WITHDRAWAL_DATA);

        if (!jsonData || isEmpty(jsonData)) {
            return [];
        }

        return JSON.parse(jsonData);
    } catch {
        return [];
    }
};

/**
 * Add withdrawal data
 * @param {Object}data
 * @returns {Promise<void>}
 */
export const addWithdrawalData = (data: any) => {
    const txs = getWithdrawalData();
    txs.push(data);
    return setItem(KEY_SAVE.WITHDRAWAL_DATA, JSON.stringify(txs));
};

/**
 * Remove withdrawal data
 * @param {string} burningTxId
 * @returns {Promise<void>}
 */
export const removeWithdrawalData = (burningTxId: string) => {
    let txs = getWithdrawalData();
    txs = txs.filter((tx: any) => tx.burningTxId !== burningTxId);
    return setItem(KEY_SAVE.WITHDRAWAL_DATA, JSON.stringify(txs));
};

export const saveDeviceId = (deviceId: string) => {
    return setItem(KEY_SAVE.DEVICE_ID, deviceId);
};

export const getDeviceId = () => {
    return getItem(KEY_SAVE.DEVICE_ID) || '';
};

export const saveBackupStakeKey = () => {
    return setItem(KEY_SAVE.BACKUP_STAKE_KEY, JSON.stringify(true));
};

export const getBackupStakeKey = () => {
    return getItem(KEY_SAVE.BACKUP_STAKE_KEY);
};

export const saveViewUniswapTooltip = (type: string) => {
    return setItem(KEY_SAVE.VIEW_UNISWAP_TOOLTIP, type);
};

export const getViewUniswapTooltip = (type: string) => {
    const value = getItem(KEY_SAVE.VIEW_UNISWAP_TOOLTIP);
    saveViewUniswapTooltip(type);
    return value;
};

export const resetViewUniswapTooltip = () => {
    return setItem(KEY_SAVE.VIEW_UNISWAP_TOOLTIP, '');
};

export const resetUniswapAirdrop = () => {
    return setItem(KEY_SAVE.UNISWAP_AIRDROP, '');
};

export const getScreenStakeGuilde = () => {
    return getItem(KEY_SAVE.SCREEN_STAKE_GUIDE);
};

export const saveScreenStakeGuide = () => {
    return setItem(KEY_SAVE.SCREEN_STAKE_GUIDE, JSON.stringify(true));
};

// For webview caching
export const getUriWebviewCommunity = () => {
    return getItem(KEY_SAVE.WEBVIEW);
};

export const setUriWebviewCommunity = (value: string) => {
    return setItem(KEY_SAVE.WEBVIEW, value);
};

export const getProvideTxs = () => {
    const value = getItem(KEY_SAVE.PROVIDE_TXS);
    return value ? JSON.parse(value) : [];
};

export const saveProvideTxs = (txs: any[]) => {
    return setItem(KEY_SAVE.PROVIDE_TXS, JSON.stringify(txs || []));
};

export const getNodeCleared = () => {
    return getItem(KEY_SAVE.NODECLEARED);
};

export const setNodeCleared = (value: string) => {
    return setItem(KEY_SAVE.NODECLEARED, value);
};

export const getShipAddress = () => {
    const value = getItem(KEY_SAVE.SHIP_ADDRESS);
    return JSON.parse(value || '{}');
};

export const setShipAddress = (value: string) => {
    return setItem(KEY_SAVE.SHIP_ADDRESS, JSON.stringify(value || {}));
};
