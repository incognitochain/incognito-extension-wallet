import React, { useState } from 'react';
import { WalletInstance } from 'incognito-js/build/web/browser';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { IPreloadReducer } from 'src/module/Preload';
import { preloadSelector } from 'src/module/Preload/Preload.selector';
import {
    actionFetchPCustomTokenList,
    actionFetchPTokenList,
    actionFollowDefaultToken,
    actionGetPrivacyTokensBalance,
    actionSetFollowedTokens,
    actionSetSelectedToken,
    IEnvToken,
    ITokenReducer,
} from 'src/module/Token';
import { tokenSelector } from 'src/module/Token/Token.selector';
import { actionGetAccountBalance } from 'src/module/Account';
import { defaultAccountNameSelector, switchAccountSelector } from 'src/module/Account/Account.selector';
import { actionToggleToast, TOAST_CONFIGS } from 'src/components';
import { withHeaderApp } from 'src/components/Header';
import { actionFreeHistory } from 'src/module/History';
import { walletDataSelector } from './Wallet.selector';
import enhanceDApp from './Wallet.enhanceDApp';
import withBalance, { IEnhanceBalanceProps } from '../Account/Acount.enhanceBalance';

interface IProps {}
interface IMergeProps extends IEnhanceBalanceProps, IProps {}

export const enhance = (WrappedComponent: React.FunctionComponent) => (props: IMergeProps & any) => {
    const { loadBalance } = props;
    const dispatch = useDispatch();
    const [loadedBalance, setLoadedBalance] = useState(false);
    const defaultAccount: string = useSelector(defaultAccountNameSelector);
    const wallet: WalletInstance = useSelector(walletDataSelector);
    const preload: IPreloadReducer = useSelector(preloadSelector);
    const tokenState: ITokenReducer = useSelector(tokenSelector);
    const { mainnet } = preload.configs;
    const field = mainnet ? 'mainnet' : 'testnet';
    const envToken: IEnvToken = tokenState[field];
    const { followedPopularIds } = envToken;
    const switchAccount = useSelector(switchAccountSelector);
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
                loadBalance && loadBalance(),
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
            setLoadedBalance(true);
        }
    };
    const handleInitData = () => {
        dispatch(actionFreeHistory());
        dispatch(actionSetSelectedToken(''));
    };
    React.useEffect(() => {
        if (!switchAccount) {
            handleLoadWallet();
        }
    }, [wallet, defaultAccount, switchAccount]);
    React.useEffect(() => {
        handleInitData();
    }, []);

    return (
        <WrappedComponent
            {...{
                ...props,
                handleRefresh: handleLoadWallet,
                showReloadBalance: true,
                showConnectStatus: true,
                loadedBalance,
            }}
        />
    );
};

export default compose(withBalance, enhance, enhanceDApp, withHeaderApp);
