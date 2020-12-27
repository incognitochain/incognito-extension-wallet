export const MAINNET_FULLNODE = 'https://lb-fullnode.incognito.org/fullnode';
export const TESTNET_FULLNODE = 'https://testnet.incognito.org/fullnode';
export const TESTNET1_FULLNODE = 'http://51.83.36.184:20002/fullnode';
export const PRODUCTION_API = 'https://api-service.incognito.org';
export const STAGING_API = 'https://staging-api-service.incognito.org';
export const PRODUCTION_API_2 = 'https://device-network.incognito.org';
export const STAGING_API_2 = 'https://device-network-staging.incognito.org';

export interface IServer {
    id: string;
    default?: boolean;
    address: string;
    name: string;
    chainURL: string;
    apiURL: string;
    exploreChainURL: string;
    api2URL: string;
    exploreBinanceURL: string;
    etherscanURL: string;
}

export const TEST_NODE_SERVER = {
    id: 'testnode',
    default: false,
    address: 'http://51.161.117.88:6354',
    name: 'Test Node',
};

export const MAINNET_SERVER: IServer = {
    id: 'mainnet',
    default: true,
    address: MAINNET_FULLNODE,
    name: 'Mainnet',
    chainURL: MAINNET_FULLNODE,
    apiURL: PRODUCTION_API,
    api2URL: PRODUCTION_API_2,
    exploreChainURL: 'https://mainnet.incognito.org',
    exploreBinanceURL: 'https://explorer.binance.org',
    etherscanURL: 'https://etherscan.io',
};

export const TESTNET_SERVER: IServer = {
    id: 'testnet',
    default: false,
    address: TESTNET_FULLNODE,
    name: 'Testnet',
    chainURL: TESTNET_FULLNODE,
    apiURL: STAGING_API,
    api2URL: STAGING_API_2,
    exploreChainURL: 'https://testnet.incognito.org',
    exploreBinanceURL: 'https://testnet-explorer.binance.org',
    etherscanURL: 'https://kovan.etherscan.io',
};

export const LOCAL_SERVER: IServer = {
    id: 'local',
    default: false,
    address: 'http://localhost:9334',
    name: 'Local',
    chainURL: '',
    apiURL: '',
    api2URL: '',
    exploreChainURL: '',
    exploreBinanceURL: '',
    etherscanURL: '',
};

export const TEST_NET_1_SERVER = {
    id: 'testnet1',
    default: false,
    address: TESTNET1_FULLNODE,
    name: 'Testnet 1',
};

export const DEFAULT_LIST_SERVER = [
    // LOCAL_SERVER,
    MAINNET_SERVER,
    TESTNET_SERVER,
];
