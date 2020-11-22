import { http } from 'src/http';
import { cachePromise } from 'src/services';
import {
  IPTokenFromApi,
  IPToken,
  IPCustomTokenFromApi,
  IPCustomToken,
} from './Token.interface';

export const apiGetPTokenList = (apiURL: string) =>
  cachePromise('ptoken', () =>
    http.get(`${apiURL}/ptoken/list`).then((res: any) =>
      res.map((token: IPTokenFromApi) => {
        const pairPrv = token.CurrentPrvPool !== 0;
        let _token: IPToken = {
          id: token.ID,
          tokenId: token.TokenID,
          symbol: token.Symbol,
          pSymbol: token.PSymbol,
          decimals: token.Decimals,
          pDecimals: token.PDecimals,
          currencyType: token.CurrencyType,
          type: token.Type,
          name: token.Name,
          contractId: token.ContractID,
          verified: token.Verified,
          pricePrv: token.PricePrv,
          priceUsd: token.PriceUsd,
          pairPrv,
          change: pairPrv ? token?.PercentChangePrv1h : token?.PercentChange1h,
        };
        return _token;
      })
    )
  );

export const apiGetPCustomTokenList = (apiURL: string) =>
  cachePromise('pcustomtoken', () =>
    http.get(`${apiURL}/pcustomtoken/list`).then((res: any) =>
      res.map((token: IPCustomTokenFromApi) => {
        let _token: IPCustomToken = {
          id: token.ID,
          tokenId: token.TokenID,
          symbol: token.Symbol,
          name: token.Name,
          totalSupply: token.Amount,
          verified: token.Verified,
          image: token.Image,
        };
        return _token;
      })
    )
  );
