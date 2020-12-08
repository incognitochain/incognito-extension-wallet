const PROTOCOLS = {
  OX: '0x',
  KYBER: 'Kyber',
  UNISWAP: 'Uniswap',
};

const ERC20_NETWORK = {
  Kyber: 'Kyber',
  Uniswap: 'Uniswap',
  PDex: 'Incognito',
};

let kyberTradeAddress = '';
let uniswapTradeAddress = '';
let kyberFee = 0;
let uniswapFee = 0;

const setDAppAddresses = ({
  Kyber,
  Uniswap,
}: {
  Kyber: string;
  Uniswap: string;
}) => {
  if (Kyber) {
    kyberTradeAddress = Kyber;
  }

  if (Uniswap) {
    uniswapTradeAddress = Uniswap;
  }
};

const getDAppAddresses = () => {
  return {
    Kyber: kyberTradeAddress,
    kyber: kyberTradeAddress,
    Uniswap: uniswapTradeAddress,
    uniswap: uniswapTradeAddress,
  };
};

const getFees = () => {
  return {
    Kyber: kyberFee,
    kyber: kyberFee,
    Uniswap: uniswapFee,
    uniswap: uniswapFee,
  };
};

const setFees = ({ Kyber, Uniswap }: { Kyber: number; Uniswap: number }) => {
  if (Kyber) {
    kyberFee = Kyber;
  }

  if (Uniswap) {
    uniswapFee = Uniswap;
  }
};

const TRADING_CONSTANT = {
  PROTOCOLS,
  ERC20_NETWORK,
  setDAppAddresses,
  getDAppAddresses,
  setFees,
  getFees,
};

export default TRADING_CONSTANT;
