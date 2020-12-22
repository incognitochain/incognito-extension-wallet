import React from 'react';
import { AccountInstance } from 'incognito-js/build/web/browser';
import { IPreloadReducer, preloadSelector } from 'src/module/Preload';
import { IWalletReducer, walletSelector } from 'src/module/Wallet';
import {
    actionFollowDefaultToken,
    actionGetPrivacyTokensBalance,
    IEnvToken,
    ITokenReducer,
    tokenSelector,
} from 'src/module/Token';
import { actionGetAccountBalance, defaultAccountSelector } from 'src/module/Account';
import { actionToggleToast, TOAST_CONFIGS } from 'src/components';
import { useDispatch, useSelector } from 'react-redux';

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
    const dispatch = useDispatch();
    const account: AccountInstance = useSelector(defaultAccountSelector);
    const wallet: IWalletReducer = useSelector(walletSelector);
    const preload: IPreloadReducer = useSelector(preloadSelector);
    const tokenState: ITokenReducer = useSelector(tokenSelector);
    const { mainnet } = preload.configs;
    const field = mainnet ? 'mainnet' : 'testnet';
    const envToken: IEnvToken = tokenState[field];
    const { followedPopularIds } = envToken;
    const handleLoadWallet = async () => {
        try {
            if (!followedPopularIds) {
                await dispatch(actionFollowDefaultToken(account));
            }
            await Promise.all([dispatch(actionGetPrivacyTokensBalance()), dispatch(actionGetAccountBalance())]);
        } catch (error) {
            dispatch(
                actionToggleToast({
                    type: TOAST_CONFIGS.error,
                    toggle: true,
                    value: error,
                }),
            );
        }
    };
    React.useEffect(() => {
        handleLoadWallet();
    }, [wallet, account]);
    return <WrappedComponent {...props} />;
};

export default enhance;
