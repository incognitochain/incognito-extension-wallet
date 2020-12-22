import memoize from 'lodash/memoize';
import isEmpty from 'lodash/isEmpty';
import { createSelector } from 'reselect';
import { COINS } from 'src/constants';
import { IRootState } from 'src/redux/interface';
import uniqBy from 'lodash/uniqBy';
import { preloadSelector } from 'src/module/Preload';
import { format } from 'src/utils';
import convert from 'src/utils/convert';
import { compact, reverse } from 'lodash';
import BigNumber from 'bignumber.js';
import { accountBalanceSelector } from 'src/module/Account/Account.selector';
import { getFormatAmountByUSD, getPrice } from './Token.utils';
import SelectedPrivacy from './Token.model';
import { ITokenReducer } from './Token.reducer';
import {
    IFollowedToken,
    IPCustomToken,
    IPCustomTokenFromApi,
    IPToken,
    IPTokenFromApi,
    ISelectedPrivacy,
} from './Token.interface';

export const tokenSelector = createSelector(
    (state: IRootState) => state.token,
    (token: ITokenReducer) => token,
);

export const pTokensSelector = createSelector(
    tokenSelector,
    (tokenState) =>
        tokenState.pTokens
            .filter((pToken: IPTokenFromApi) => !!pToken?.PSymbol)
            .map((pToken: IPTokenFromApi) => {
                const pairPrv = new BigNumber(pToken.CurrentPrvPool).isGreaterThan(new BigNumber(0));
                const change = pairPrv ? pToken?.PercentChangePrv1h : pToken?.PercentChange1h;
                const token: IPToken = {
                    id: pToken.ID,
                    tokenId: pToken.TokenID,
                    symbol: pToken.Symbol,
                    pSymbol: pToken.PSymbol,
                    decimals: pToken.Decimals,
                    pDecimals: pToken.PDecimals,
                    currencyType: pToken.CurrencyType,
                    type: pToken.Type,
                    name: pToken.Name,
                    contractId: pToken.ContractID,
                    verified: pToken.Verified,
                    pricePrv: pToken.PricePrv,
                    priceUsd: pToken.PriceUsd,
                    pairPrv,
                    change,
                    default: pToken.Default,
                };
                return token;
            }) || [],
);

export const pCustomTokensSelector = createSelector(
    tokenSelector,
    (tokenState) =>
        tokenState.pCustomTokens.map((cToken: IPCustomTokenFromApi) => {
            const token: IPCustomToken = {
                id: cToken.ID,
                tokenId: cToken.TokenID || '',
                symbol: cToken.Symbol,
                name: cToken.Name,
                totalSupply: cToken?.Amount || 0,
                verified: cToken.Verified,
                image: cToken.Image,
                ownerName: cToken.OwnerName,
                ownerAddress: cToken.OwnerAddress,
                ownerEmail: cToken.OwnerEmail,
                ownerWebsite: cToken.OwnerWebsite,
            };
            return token;
        }) || [],
);

export const findPTokenBySymbolSelector = createSelector(pTokensSelector, (pTokens: IPToken[]) => (symbol: string) => {
    const token = pTokens.find((t) => t.symbol === symbol);
    return token?.tokenId;
});

export const followedTokensSelect = createSelector(tokenSelector, (token) => token.followed || []);

export const followedTokensIdsSelector = createSelector(followedTokensSelect, (followed) => (excludePRV = true) => {
    const privacyTokenIds = reverse([...followed].map((t) => t.tokenId));
    return excludePRV ? privacyTokenIds : [COINS.PRV.id, ...privacyTokenIds];
});
export const popularCoinIdsSeletor = createSelector(preloadSelector, (preload) => {
    const { mainnet } = preload.configs;
    let result: { [symbol: string]: any } = {};
    if (mainnet) {
        result = {
            BTC: 'b832e5d3b1f01a4f0623f7fe91d6673461e1f5d37d91fe78c5c2e6183ff39696',
            ETH: 'ffd8d42dc40a8d166ea4848baf8b5f6e912ad79875f4373070b59392b1756c8f',
            USDT: '716fd1009e2a1669caacc36891e707bfdf02590f96ebd897548e8963c95ebac0',
            BNB: 'b2655152784e8639fa19521a7035f331eea1f1e911b2f3200a507ebb4554387b',
            XMR: 'c01e7dc1d1aba995c19b257412340b057f8ad1482ccb6a9bb0adce61afbf05d4',
        };
    } else {
        result = {
            BTC: '4584d5e9b2fc0337dfb17f4b5bb025e5b82c38cfa4f54e8a3d4fcdd03954ff82',
            ETH: 'ffd8d42dc40a8d166ea4848baf8b5f6e9fe0e9c30d60062eb7d44a8df9e00854',
            USDT: '4946b16a08a9d4afbdf416edf52ef15073db0fc4a63e78eb9de80f94f6c0852a',
            BNB: '9fca0a0947f4393994145ef50eecd2da2aa15da2483b310c2c0650301c59b17d',
            XMR: 'c01e7dc1d1aba995c19b257412340b057f8ad1482ccb6a9bb0adce61afbf05d4',
        };
    }
    return result;
});

export const defaultTokensIdsSelector = createSelector(pTokensSelector, (pTokens: IPToken[]) =>
    pTokens.filter((token) => !!token.default).map((token) => token.tokenId),
);

export const getPrivacyDataByTokenIDSelector = createSelector(
    pCustomTokensSelector,
    pTokensSelector,
    followedTokensIdsSelector,
    followedTokensSelect,
    accountBalanceSelector,
    popularCoinIdsSeletor,
    (pCustomTokens, pTokens, followedTokensIds, followed, accountBalance, coins) =>
        memoize((tokenID: string) => {
            const followedIds = followedTokensIds();
            const pTokenData = pTokens?.find((token: IPToken) => token?.tokenId === tokenID);
            const pCustomTokenData = pCustomTokens?.find(
                (token) => token?.tokenId === tokenID && token?.tokenId !== pTokenData?.tokenId,
            );
            if (!pCustomTokenData && !pTokenData && tokenID !== COINS.PRV.id) {
                throw new Error(`Can not find coin with id ${tokenID}`);
            }
            const token = new SelectedPrivacy(pCustomTokenData, pTokenData);
            const amount = token.isNativeToken
                ? accountBalance
                : followed.find((t: IFollowedToken) => t?.tokenId === tokenID)?.amount || 0;
            const isFollowed = followedIds.some((tokenId: string) => tokenId === tokenID);
            const tokenUSDT = pTokens.find((t) => t?.tokenId === coins.USDT);
            const price = getPrice({ token, tokenUSDT });
            const formatAmount = format.formatAmount({
                originalAmount: amount,
                decimals: token.pDecimals,
            });
            const formatPriceByUsd = getFormatAmountByUSD({
                amount: 1,
                priceUsd: price.priceUsd,
                decimals: tokenUSDT?.pDecimals,
            });
            const formatBalanceByUsd = getFormatAmountByUSD({
                amount: convert.toHumanAmount({
                    originalAmount: amount,
                    decimals: token.pDecimals,
                }),
                priceUsd: price.priceUsd,
                decimals: tokenUSDT?.pDecimals,
            });
            const data = {
                ...token,
                ...price,
                isFollowed,
                amount,
                formatAmount,
                formatPriceByUsd,
                formatBalanceByUsd,
            };
            return data;
        }),
);

export const availableTokensSelector = createSelector(
    pTokensSelector,
    pCustomTokensSelector,
    getPrivacyDataByTokenIDSelector,
    (pTokens, pCustomTokens, getPrivacyDataByTokenID) => {
        const pTokensIds = pTokens.map((token: IPToken) => token.tokenId);
        const pCustomTokensIds = pCustomTokens
            .filter((token: IPCustomToken) => !isEmpty(token?.name) && !isEmpty(token?.symbol))
            .filter((token) => !pTokensIds.includes(token?.tokenId))
            .map((token) => token?.tokenId);
        const allTokenIds = [...pTokensIds, ...pCustomTokensIds];
        const tokens: ISelectedPrivacy[] = allTokenIds
            .map((tokenId: string) => getPrivacyDataByTokenID(tokenId))
            .filter((token) => token?.name && token?.symbol && token.tokenId);
        return uniqBy(tokens, 'tokenId') || [];
    },
);

export const pUSDTSelector = createSelector(
    popularCoinIdsSeletor,
    getPrivacyDataByTokenIDSelector,
    (coins, getPrivacyDataByTokenID) => getPrivacyDataByTokenID(coins.USDT),
);

export const selectedTokenIdSelector = createSelector(tokenSelector, (token) => token.selectedTokenId || COINS.PRV.id);

export const selectedPrivacySelector = createSelector(
    getPrivacyDataByTokenIDSelector,
    selectedTokenIdSelector,
    (getPrivacyDataByTokenID, tokenId) => getPrivacyDataByTokenID(tokenId),
);

export const bridgeTokensSelector = createSelector(tokenSelector, (token) => token.pTokens);

export const chainTokensSelector = createSelector(tokenSelector, (token) => token.pCustomTokens);

export const totalShieldedTokensSelector = createSelector(
    getPrivacyDataByTokenIDSelector,
    followedTokensIdsSelector,
    pUSDTSelector,
    (getPrivacyDataByTokenID, followedIds, USDT) => {
        const followed = followedIds(false);
        const tokens = followed.map((tokenId) => getPrivacyDataByTokenID(tokenId));
        const totalShieldedTokens = compact([...tokens]).reduce(
            (
                prevValue: {
                    totalShieldByPRV: number;
                    totalShieldByUSD: number;
                },
                currentValue: ISelectedPrivacy,
            ) => {
                const totalShieldByPRV = new BigNumber(prevValue.totalShieldByPRV);
                const totalShieldByUSD = new BigNumber(prevValue.totalShieldByUSD);
                const pricePrv = new BigNumber(currentValue?.pricePrv || 0);
                const priceUsd = new BigNumber(currentValue?.priceUsd || 0);
                const humanAmount = convert.toHumanAmount({
                    originalAmount: currentValue.amount,
                    decimals: currentValue.pDecimals,
                });
                let currentPrvVal = pricePrv.multipliedBy(humanAmount);
                if (currentPrvVal.isNaN()) {
                    currentPrvVal = totalShieldByPRV;
                }
                let currentUsdVal = priceUsd.multipliedBy(humanAmount);
                if (currentUsdVal.isNaN()) {
                    currentUsdVal = totalShieldByUSD;
                }
                return {
                    totalShieldByPRV: totalShieldByPRV.plus(currentPrvVal).toNumber(),
                    totalShieldByUSD: totalShieldByUSD.plus(currentUsdVal).toNumber(),
                };
            },
            {
                totalShieldByPRV: 0,
                totalShieldByUSD: 0,
            },
        );
        const { totalShieldByPRV, totalShieldByUSD } = totalShieldedTokens;
        const formatTotalAmountPRV = format.formatAmount({
            humanAmount: totalShieldByPRV,
            decimals: COINS.PRV.pDecimals,
        });
        const formatTotalAmountUSD = format.formatAmount({
            humanAmount: totalShieldByUSD,
            decimals: USDT.pDecimals,
        });
        return {
            formatTotalAmountPRV,
            formatTotalAmountUSD,
        };
    },
);

export const isTokenBySymbolSelector = createSelector(popularCoinIdsSeletor, (coins) => (symbol: string) =>
    !!coins[symbol],
);

export const isErc20TokenSelector = createSelector(
    selectedPrivacySelector,
    (selectedPrivacy) => selectedPrivacy.isErc20Token || selectedPrivacy.symbol === COINS.CRYPTO_SYMBOL.ETH,
);

export const gettingBalanceSelector = createSelector(tokenSelector, (token) => token.gettingBalance);

export const isGettingBalanceTokenByIdSelector = createSelector(
    gettingBalanceSelector,
    (gettingBalance: string[]) => (tokenId: string) => gettingBalance.includes(tokenId),
);
