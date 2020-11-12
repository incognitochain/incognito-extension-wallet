const STATUS = {
  INIT: 'INIT',
  READY: 'READY',
  WALLET_IS_NOT_LOADED: 'WALLET_IS_NOT_LOADED',
  ACCOUNT_IS_NOT_LOADED: 'ACCOUNT_IS_NOT_LOADED',
};

const DISABLED = {
  APP: 'app',
  TRADE: 'trade',
  BUY_NODE: 'buynode',
};

const FEATURES_ROUTE_MAP = {
  Wallet: 'wallet',
  Stake: 'pool',
  Dex: 'invest',
  Node: 'node',
};

const FEATURES_TYPE_MAP = {
  'balance-update': 'wallet',
  'reward-node': 'node',
  'deposit-update': 'wallet',
  'withdraw-coin': 'wallet',
  'unstake-success': 'node',
  'withdraw-success': 'wallet',
};

const STATUS_MESSAGE = {
  PENDING: 'Pending',
  COMPLETE: 'Complete',
  FAILED: 'Failed',
  EXPIRED: 'Expired',
};

const APP_CONSTANT = {
  STATUS,
  DISABLED,
  STATUS_MESSAGE,
  FEATURES_ROUTE_MAP,
  FEATURES_TYPE_MAP,
};

export default APP_CONSTANT;
