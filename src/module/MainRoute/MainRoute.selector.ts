import { createSelector } from 'reselect';
import { passwordSelector } from 'src/module/Password';
import { walletIdSelector } from 'src/module/Wallet';

export const isAuthenticatedSelector = createSelector(
    passwordSelector,
    walletIdSelector,
    (pass, walletId) => !!pass && walletId >= 0,
);
