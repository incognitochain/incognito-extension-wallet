import React from 'react';
import { WalletInstance } from 'incognito-js/build/web/browser';
import { IPreloadReducer, preloadSelector } from 'src/module/Preload';
import {
    actionFollowDefaultToken,
    actionGetPrivacyTokensBalance,
    actionSetFollowedTokens,
    IEnvToken,
    ITokenReducer,
    tokenSelector,
} from 'src/module/Token';
import { actionGetAccountBalance, defaultAccountNameSelector } from 'src/module/Account';
import { actionToggleToast, TOAST_CONFIGS } from 'src/components';
import { useDispatch, useSelector } from 'react-redux';
import { walletDataSelector } from './Wallet.selector';

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
    const dispatch = useDispatch();
    const defaultAccount: string = useSelector(defaultAccountNameSelector);
    const wallet: WalletInstance = useSelector(walletDataSelector);
    const preload: IPreloadReducer = useSelector(preloadSelector);
    const tokenState: ITokenReducer = useSelector(tokenSelector);
    const { mainnet } = preload.configs;
    const field = mainnet ? 'mainnet' : 'testnet';
    const envToken: IEnvToken = tokenState[field];
    const { followedPopularIds } = envToken;
    const handleLoadWallet = async ({
        accountName,
        walletData,
    }: {
        accountName: string;
        walletData: WalletInstance;
    }) => {
        try {
            const account = walletData.masterAccount.getAccountByName(accountName);
            if (!followedPopularIds) {
                await dispatch(actionFollowDefaultToken(account));
            }
            await dispatch(
                actionSetFollowedTokens({
                    followed: account.privacyTokenIds.map((t) => ({ tokenId: t, amount: 0 })),
                }),
            );
            await Promise.all([
                dispatch(actionGetPrivacyTokensBalance(account)),
                dispatch(actionGetAccountBalance(account)),
            ]);
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
        handleLoadWallet({ accountName: defaultAccount, walletData: wallet });
    }, [wallet, defaultAccount]);
    return <WrappedComponent {...props} />;
};

export default enhance;
