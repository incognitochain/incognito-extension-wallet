import React from 'react';
import { WalletInstance } from 'incognito-js/build/web/browser';
import { IPreloadReducer, preloadSelector } from 'src/module/Preload';
import {
    actionFetchPCustomTokenList,
    actionFetchPTokenList,
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
import { withHeaderApp } from 'src/components/Header';
import { compose } from 'redux';
import { walletDataSelector } from './Wallet.selector';

interface IProps {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    const dispatch = useDispatch();
    const defaultAccount: string = useSelector(defaultAccountNameSelector);
    const wallet: WalletInstance = useSelector(walletDataSelector);
    const preload: IPreloadReducer = useSelector(preloadSelector);
    const tokenState: ITokenReducer = useSelector(tokenSelector);
    const { mainnet } = preload.configs;
    const field = mainnet ? 'mainnet' : 'testnet';
    const envToken: IEnvToken = tokenState[field];
    const { followedPopularIds } = envToken;
    const handleLoadWallet = async (reload = false) => {
        try {
            const account = wallet.masterAccount.getAccountByName(defaultAccount);
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
        } finally {
            if (reload) {
                dispatch(actionFetchPTokenList(true));
                dispatch(actionFetchPCustomTokenList(true));
            }
        }
    };
    React.useEffect(() => {
        handleLoadWallet();
    }, [wallet, defaultAccount]);

    return <WrappedComponent {...{ ...props, handleLoadWallet }} />;
};

export default compose(withHeaderApp, enhance);
