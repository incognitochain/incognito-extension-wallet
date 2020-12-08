export const MAINNET_FULLNODE = 'https://lb-fullnode.incognito.org/fullnode';
export const TESTNET_FULLNODE = 'https://testnet.incognito.org/fullnode';
export const TESTNET1_FULLNODE = 'http://51.83.36.184:20002/fullnode';
export const PRODUCTION_API = 'https://api-service.incognito.org';
export const STAGING_API = 'https://staging-api-service.incognito.org';
export interface IServer {
  id: string;
  default?: boolean;
  address: string;
  name: string;
  chainURL?: string;
  apiURL?: string;
  exploreChainURL?: string;
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
  exploreChainURL: 'https://mainnet.incognito.org',
};

export const TESTNET_SERVER: IServer = {
  id: 'testnet',
  default: false,
  address: TESTNET_FULLNODE,
  name: 'Testnet',
  chainURL: TESTNET_FULLNODE,
  apiURL: STAGING_API,
  exploreChainURL: 'https://testnet.incognito.org',
};

export const LOCAL_SERVER = {
  id: 'local',
  default: false,
  address: 'http://localhost:9334',
  name: 'Local',
};

export const TEST_NET_1_SERVER = {
  id: 'testnet1',
  default: false,
  address: TESTNET1_FULLNODE,
  name: 'Testnet 1',
};

export const DEFAULT_LIST_SERVER = [
  LOCAL_SERVER,
  MAINNET_SERVER,
  TESTNET_SERVER,
  // TEST_NODE_SERVER,
  // TEST_NET_1_SERVER,
];
