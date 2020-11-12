const POPULAR_COIN = {
  BTC: 'b832e5d3b1f01a4f0623f7fe91d6673461e1f5d37d91fe78c5c2e6183ff39696',
  ETH: 'ffd8d42dc40a8d166ea4848baf8b5f6e912ad79875f4373070b59392b1756c8f',
  USDT: '716fd1009e2a1669caacc36891e707bfdf02590f96ebd897548e8963c95ebac0',
  BNB: 'b2655152784e8639fa19521a7035f331eea1f1e911b2f3200a507ebb4554387b',
  XMR: 'c01e7dc1d1aba995c19b257412340b057f8ad1482ccb6a9bb0adce61afbf05d4',
};

const POPULAR_COIN_IDS = [
  POPULAR_COIN.XMR,
  POPULAR_COIN.BNB,
  POPULAR_COIN.USDT,
  POPULAR_COIN.ETH,
  POPULAR_COIN.BTC,
];

const PRV = {
  id: '0000000000000000000000000000000000000000000000000000000000000004',
  name: 'Privacy',
  displayName: 'Privacy',
  symbol: 'PRV',
  pDecimals: 9,
  hasIcon: true,
  originalSymbol: 'PRV',
  isVerified: true,
};

const COIN_CONSTANT = {
  POPULAR_COIN,
  POPULAR_COIN_IDS,
  PRV,
  PRV_ID: PRV.id,
};

export const CRYPTO_SYMBOL = {
  PRV: 'PRV',
  BTC: 'BTC',
  ETH: 'ETH',
  BNB: 'BNB',
  USD: 'USD',
  KCS: 'KCS',
  TOMO: 'TOMO',
  NEO: 'NEO',
  XMR: 'XMR',
  ZEN: 'ZEN',
  ZCL: 'ZCL',
  ZEC: 'ZEC',
  VOT: 'VOT',
  VTC: 'VTC',
  SNG: 'SNG',
  XRP: 'XRP',
  XRB: 'XRB',
  QTUM: 'QTUM',
  PTS: 'PTS',
  PPC: 'PPC',
  GAS: 'GAS',
  NMC: 'NMC',
  MEC: 'MEC',
  LTC: 'LTC',
  KMD: 'KMD',
  HUSH: 'HUSH',
  GRLC: 'GRLC',
  FRC: 'FRC',
  DOGE: 'DOGE',
  DGB: 'DGB',
  DCR: 'DCR',
  CLO: 'CLO',
  BTG: 'BTG',
  BCH: 'BCH',
  BIO: 'BIO',
  BVC: 'BVC',
  BKX: 'BKX',
  AUR: 'AUR',
  ZIL: 'ZIL',
  USDT: 'USDT',
};

export default COIN_CONSTANT;
