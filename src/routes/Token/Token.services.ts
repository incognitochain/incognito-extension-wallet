import { http } from 'src/http';
import { cachePromise } from 'src/services';
import { IPTokenFromApi, IPToken } from './Token.interface';

export const apiGetPTokenList = () =>
  cachePromise(
    'ptoken',
    http.get('ptoken/list').then((res: any) =>
      res.map((token: IPTokenFromApi) => {
        let _token: IPToken = {
          id: token.ID,
          tokenId: token.TokenID,
          symbol: token.Symbol,
          pSymbol: token.PSymbol,
          decimals: token.Decimals,
          pDecimals: token.PDecimals,
          currencyType: token.CurrencyType,
        };
        return _token;
      })
    )
  );
