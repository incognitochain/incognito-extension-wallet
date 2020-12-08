import { MAINNET_FULLNODE, TESTNET_FULLNODE } from './server';
import { ENVS } from 'src/configs';

export const MAIN_WEBSITE = 'https://we.incognito.org';
const isMainnet = false;
const homeConfig = ENVS.REACT_APP_HOME_CONFIG;
const API_BASE_URL = isMainnet
  ? 'https://api-service.incognito.org'
  : 'https://staging-api-service.incognito.org';
const API_BASE_URL2 = isMainnet
  ? 'https://device-network.incognito.org/'
  : 'https://device-network-staging.incognito.org/';
const ETHERSCAN_URL = isMainnet
  ? 'https://etherscan.io'
  : 'https://kovan.etherscan.io';
const DEX_BINANCE_TOKEN_URL = isMainnet
  ? 'https://dex.binance.org/api/v1/tokens'
  : 'https://testnet-dex.binance.org/api/v1/tokens';
const BINANCE_EXPLORER_URL = isMainnet
  ? 'https://explorer.binance.org'
  : 'https://testnet-explorer.binance.org';
const INCOGNITO_TOKEN_ICON_URL = isMainnet
  ? 'https://storage.googleapis.com/incognito/wallet/tokens/icons'
  : 'https://storage.googleapis.com/incognito/wallet-testnet/tokens/icons';
const BUILD_VERSION = ENVS.REACT_APP_VERSION;
const EXPLORER_CONSTANT_CHAIN_URL = isMainnet
  ? 'https://mainnet.incognito.org'
  : 'https://testnet.incognito.org';
const MASTER_NODE_ADDRESS = isMainnet ? MAINNET_FULLNODE : TESTNET_FULLNODE;
const NODE_URL = 'https://node.incognito.org/node.html';
const USDT_TOKEN_ID = isMainnet
  ? '716fd1009e2a1669caacc36891e707bfdf02590f96ebd897548e8963c95ebac0'
  : '4946b16a08a9d4afbdf416edf52ef15073db0fc4a63e78eb9de80f94f6c0852a';
const TRACK_LOG_URL = 'https://device-network.incognito.org';

const ETH_TOKEN_ID = isMainnet
  ? 'ffd8d42dc40a8d166ea4848baf8b5f6e912ad79875f4373070b59392b1756c8f'
  : 'ffd8d42dc40a8d166ea4848baf8b5f6e9fe0e9c30d60062eb7d44a8df9e00854';

const CRYPTO_ICON_URL =
  'https://s3.amazonaws.com/incognito-org/wallet/cryptocurrency-icons/32@2x/color';

const HOME_CONFIG_DATA =
  homeConfig !== 'staging'
    ? 'https://api-data.incognito.org/v2/home-configs'
    : 'https://api-data-staging.incognito.org/v2/home-configs';

const HOME_CONFIG_EVENT = () => {
  const isStaging = homeConfig !== 'staging';
  const prefix = 'https://';
  const content = `${isStaging ? 'hunt' : 'hunt-staging'}.incognito.org`;
  return {
    title: content,
    url: prefix + content,
  };
};

const APP_VERSION = isMainnet
  ? `https://api-service.incognito.org/system/last-version`
  : `https://staging-api-service.incognito.org/system/last-version`;

const CONSTANT_CONFIGS = {
  CRYPTO_ICON_URL,
  INCOGNITO_TOKEN_ICON_URL,
  API_BASE_URL,
  REACT_APP_PASSWORD_SECRET_KEY: ENVS.REACT_APP_PASSWORD_SECRET_KEY,
  REACT_APP_PASSPHRASE_WALLET_DEFAULT: ENVS.REACT_APP_PASSPHRASE_WALLET_DEFAULT,
  EXPLORER_CONSTANT_CHAIN_URL,
  MASTER_NODE_ADDRESS,
  DEX_BINANCE_TOKEN_URL,
  BUILD_VERSION,
  ETHERSCAN_URL,
  BINANCE_EXPLORER_URL,
  USDT_TOKEN_ID,
  NODE_URL,
  TRACK_LOG_URL,
  MAIN_WEBSITE,
  ETH_TOKEN_ID,
  MAINNET_FULLNODE,
  TESTNET_FULLNODE,
  HOME_CONFIG_DATA,
  API_BASE_URL2,
  APP_VERSION,
  HOME_CONFIG_EVENT,
};

export default CONSTANT_CONFIGS;
