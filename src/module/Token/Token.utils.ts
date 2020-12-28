import includes from 'lodash/includes';
import toLower from 'lodash/toLower';
import format from 'src/utils/format';
import BigNumber from 'bignumber.js';
import { IPToken, ISelectedPrivacy } from './Token.interface';

export const handleFilterTokenByKeySearch = ({ tokens, keySearch = '' }: { tokens: any[]; keySearch?: string }) =>
    tokens.filter(
        (token) =>
            includes(toLower(token?.displayName), keySearch) ||
            includes(toLower(token?.name), keySearch) ||
            includes(toLower(token?.symbol), keySearch) ||
            includes(toLower(token?.pSymbol), keySearch) ||
            includes(toLower(token?.networkName), keySearch),
    ) || tokens;

export const getPrice = ({ token, tokenUSDT }: { token: ISelectedPrivacy; tokenUSDT: IPToken | any }) => {
    const defaultValue = {
        pricePrv: 0,
        change: '0',
        priceUsd: 0,
    };
    if (!tokenUSDT) {
        return defaultValue;
    }
    const { pricePrv, priceUsd } = tokenUSDT;
    if (token?.isNativeToken) {
        return {
            change: '0',
            pricePrv: 1,
            priceUsd: priceUsd / pricePrv || 0,
        };
    }
    return {
        change: token?.change || defaultValue.change,
        pricePrv: token?.pricePrv !== 0 ? token?.pricePrv : 0,
        priceUsd: token?.priceUsd !== 0 ? token?.priceUsd : 0,
    };
};

interface IGetFormatAmountByUSD {
    amount: number;
    priceUsd: number;
    tokenDecimals: number;
    decimalDigits: boolean;
    clipAmount: boolean;
}

// eslint-disable-next-line no-unused-vars
export const getFormatAmountByUSD: (payload: IGetFormatAmountByUSD) => string = (payload: IGetFormatAmountByUSD) => {
    const { amount, priceUsd, decimalDigits, tokenDecimals, clipAmount } = payload;
    let formatAmount = '0';
    try {
        const bnHumanAmount = new BigNumber(amount).multipliedBy(priceUsd).toNumber();
        formatAmount = format.formatAmount({
            humanAmount: bnHumanAmount,
            decimals: tokenDecimals,
            decimalDigits,
            clipAmount,
        });
    } catch (error) {
        formatAmount = '0';
        throw error;
    }
    return formatAmount;
};
