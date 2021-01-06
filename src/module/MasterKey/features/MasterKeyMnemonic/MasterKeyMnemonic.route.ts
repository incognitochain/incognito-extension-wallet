import { lazy } from 'react';
import { IRouteProps } from '../../../index';

export const masterKeyMnemonicRoutePath = '/back-up-mnemonic';

const masterKeyMnemonicRoute: IRouteProps = {
    path: masterKeyMnemonicRoutePath,
    exact: true,
    component: lazy(() => import('./MasterKeyMnemonicRoute')),
    name: 'Back up mnemonic',
    to: masterKeyMnemonicRoutePath,
};

export default masterKeyMnemonicRoute;
