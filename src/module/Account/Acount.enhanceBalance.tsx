import { AccountInstance } from 'incognito-js/build/web/browser';
import React from 'react';
import { useSelector } from 'react-redux';
import { compose } from 'recompose';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { COINS } from 'src/constants';
import APP_CONSTANT from 'src/constants/app';
import { sendExtensionMessage } from 'src/utils/sendMessage';
import { isDev } from 'src/configs';
import { bridgeTokensSelector, chainTokensSelector, getPrivacyDataByTokenIDSelector } from '../Token';
import { defaultAccountSelector, paymentAddressSelector } from './Account.selector';

export interface IEnhanceBalanceProps {
    loadBalance: () => void;
    account: AccountInstance;
}

interface IProps {}

const enhanceBalance = (WrappedComponent: React.FunctionComponent) => (props: IEnhanceBalanceProps & any) => {
    const account: AccountInstance = useSelector(defaultAccountSelector);
    const brideTokens = useSelector(bridgeTokensSelector);
    const chainTokens = useSelector(chainTokensSelector);
    const getPrivacyData = useSelector(getPrivacyDataByTokenIDSelector);
    const paymentAddress: string = useSelector(paymentAddressSelector);
    const handleLoadBalanceTokens = async () => {
        const followed: string[] = [COINS.PRV.id, ...account.privacyTokenIds];
        const promise = followed.map(async (tokenId: string) => {
            let token;
            let amount;
            let privacyData = getPrivacyData(tokenId);
            if (tokenId === COINS.PRV.id) {
                amount = await account.nativeToken.getTotalBalance();
            } else {
                token = await account.getPrivacyTokenById(tokenId, brideTokens, chainTokens);
                amount = await token.getTotalBalance(tokenId);
            }
            return { ...privacyData, amount };
        });
        const tokens = await Promise.all(promise);
        if (isDev) return tokens;
        const formatAccount = {
            name: account.name,
            paymentAddress,
            tokens,
        };
        sendExtensionMessage(APP_CONSTANT.BACKGROUND_LISTEN.LOADED_FOLLOWED_BALANCE, {
            account: formatAccount,
        });
        return tokens;
    };

    return (
        <ErrorBoundary>
            <WrappedComponent {...{ ...props, loadBalance: handleLoadBalanceTokens, account }} />
        </ErrorBoundary>
    );
};

export default compose<IProps, any>(enhanceBalance);
