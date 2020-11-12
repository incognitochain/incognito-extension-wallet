import _ from 'lodash';
export const MAINNET_FULLNODE = 'https://lb-fullnode.incognito.org/fullnode';
export const TESTNET_FULLNODE = 'https://testnet.incognito.org/fullnode';
export const TESTNET1_FULLNODE = 'http://51.83.36.184:20002/fullnode';

let cachedList: any = null;

const TEST_NODE_SERVER = {
  id: 'testnode',
  default: false,
  address: 'http://51.161.117.88:6354',
  username: '',
  password: '',
  name: 'Test Node',
};
const MAIN_NET_SERVER = {
  id: 'mainnet',
  default: true,
  address: MAINNET_FULLNODE,
  username: '',
  password: '',
  name: 'Mainnet',
};
const TEST_NET_SERVER = {
  id: 'testnet',
  default: false,
  address: TESTNET_FULLNODE,
  username: '',
  password: '',
  name: 'Testnet',
};
const LOCAL_SERVER = {
  id: 'local',
  default: false,
  address: 'http://localhost:9334',
  username: '',
  password: '',
  name: 'Local',
};
const TEST_NET_1_SERVER = {
  id: 'testnet1',
  default: false,
  address: TESTNET1_FULLNODE,
  username: '',
  password: '',
  name: 'Testnet 1',
};
const DEFAULT_LIST_SERVER = [
  LOCAL_SERVER,
  TEST_NET_SERVER,
  TEST_NODE_SERVER,
  MAIN_NET_SERVER,
  TEST_NET_1_SERVER,
];

export const KEY = {
  SERVER: '$servers',
  DEFAULT_LIST_SERVER,
};

export default class Server {
  static get() {
    if (cachedList) {
      return Promise.resolve(cachedList);
    }
    const strData: string = localStorage.getItem(KEY.SERVER) || '';
    cachedList = JSON.parse(strData) || [];
    if (!cachedList || cachedList.length === 0) {
      return DEFAULT_LIST_SERVER;
    }
    if (!cachedList.find((item: any) => item.id === TEST_NODE_SERVER.id)) {
      cachedList.push(TEST_NODE_SERVER);
    }
    if (!cachedList.find((item: any) => item.id === TEST_NET_1_SERVER.id)) {
      cachedList.push(TEST_NET_1_SERVER);
    }
    if (
      cachedList.find(
        (item: any) =>
          item.id === TEST_NODE_SERVER.id && !item.address.includes('http')
      )
    ) {
      const item = cachedList.find(
        (item: any) => item.id === TEST_NODE_SERVER.id
      );
      item.address = TEST_NODE_SERVER.address;
    }

    localStorage.setItem(KEY.SERVER, JSON.stringify(cachedList));
    return cachedList;
  }

  static getDefault() {
    return Server.get().then((result: any) => {
      if (result && result.length) {
        for (const s of result) {
          if (s.default) {
            return s;
          }
        }
      }

      this.setDefault(MAIN_NET_SERVER);
      return MAIN_NET_SERVER;
    });
  }

  static async getDefaultIfNullGettingDefaulList() {
    const list =
      (await Server.get().catch(console.log)) || KEY.DEFAULT_LIST_SERVER;
    return list?.find((_: any) => _.default);
  }

  static async setDefault(defaultServer: any) {
    try {
      const servers = await Server.get();
      const newServers = servers.map((server: any) => {
        if (defaultServer.id === server.id) {
          return {
            ...defaultServer,
            default: true,
          };
        }
        return { ...server, default: false };
      });
      Server.set(newServers);

      return newServers;
    } catch (e) {
      throw e;
    }
  }

  static isMainnet(network: any) {
    return _.isEqual(network?.id, 'mainnet');
  }

  static setDefaultList() {
    try {
      cachedList = KEY.DEFAULT_LIST_SERVER;
      const strData = JSON.stringify(cachedList);
      return localStorage.setItem(KEY.SERVER, strData);
    } catch (e) {
      throw e;
    }
  }

  static set(servers: any) {
    cachedList = servers;
    const strData = JSON.stringify(cachedList);
    return localStorage.setItem(KEY.SERVER, strData);
  }
}
