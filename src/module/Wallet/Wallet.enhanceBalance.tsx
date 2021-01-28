import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WalletInstance } from 'incognito-js/build/web/browser';
import { walletDataSelector } from 'src/module/Wallet/Wallet.selector';
import { actionToggleToast, TOAST_CONFIGS } from 'src/components';
import { actionGetAccountBalance, defaultAccountNameSelector, switchAccountSelector } from 'src/module/Account';
import {
    actionFetchPCustomTokenList,
    actionFetchPTokenList,
    actionGetPrivacyTokensBalance,
    actionSetFollowedTokens,
} from 'src/module/Token';
import { IEnhanceBalanceProps } from 'src/module/Account/Acount.enhanceBalance';
import {
    actionRetryLastRawWithdrawTxsCentralized,
    actionRetryLastRawWithdrawTxsDecentralized,
    actionRetryLastWithdrawTxs,
} from 'src/module/Send/features/UnShield';

interface IProps {}
export interface IMergeProps extends IEnhanceBalanceProps, IProps {}

const withWalletBalance = (WrappedComponent: React.FunctionComponent) => (props: IMergeProps & any) => {
    const { loadBalance } = props;
    const dispatch = useDispatch();
    const [loadedBalance, setLoadedBalance] = useState(false);
    const defaultAccount: string = useSelector(defaultAccountNameSelector);
    const wallet: WalletInstance = useSelector(walletDataSelector);
    const switchAccount = useSelector(switchAccountSelector);
    const handleLoadWallet = async (reload = false) => {
        try {
            const account = wallet.masterAccount.getAccountByName(defaultAccount);
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
            dispatch(actionRetryLastWithdrawTxs());
            dispatch(actionRetryLastRawWithdrawTxsDecentralized());
            dispatch(actionRetryLastRawWithdrawTxsCentralized());
            setLoadedBalance(true);
        }
    };
    React.useEffect(() => {
        if (!switchAccount) {
            handleLoadWallet();
        }
    }, [wallet, defaultAccount, switchAccount]);

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

export default withWalletBalance;
