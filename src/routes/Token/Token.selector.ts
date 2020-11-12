import { createSelector } from 'reselect';
import { IRootState } from 'src/redux/interface';
import { IPToken } from './Token.interface';
import { ITokenReducer } from './Token.reducer';

export const tokenSelector = createSelector(
  (state: IRootState) => state.token,
  (token: ITokenReducer) => token
);

export const pTokensSelector = createSelector(
  tokenSelector,
  (token) => token.pTokens
);

export const findPTokenBySymbolSelector = createSelector(
  pTokensSelector,
  (pTokens: IPToken[]) => (symbol: string) =>
    pTokens.find((token) => token.symbol === symbol)
);
