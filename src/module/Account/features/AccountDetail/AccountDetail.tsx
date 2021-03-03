import { AccountInstance } from 'incognito-js/build/web/browser';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toNumber from 'lodash/toNumber';
import { IAccountLanguage, IGeneralLanguage } from 'src/i18n';
import { translateByFieldSelector } from 'src/module/Configs';
import styled from 'styled-components';
import { Header, SmallButton, actionToggleToast, TOAST_CONFIGS } from 'src/components';
import { actionFetchRemoveAccount, removeAccountSelector } from 'src/module/Account';
import { sendExtensionMessage } from 'src/utils/sendMessage';
import APP_CONSTANT from 'src/constants/app';
import { actionClearAllModal, actionToggleModal } from 'src/components/Modal';
import { walletIdSelector } from 'src/module/Wallet';
import Item from './Detail';

interface IProps {
    account: AccountInstance;
    canRemove: boolean;
}

const Styled = styled.div`
    .header-title {
        max-width: 120px;
    }
`;

const AccountDetails = (props: IProps) => {
    const translate: IAccountLanguage = useSelector(translateByFieldSelector)('account');
    const translateAccountDetail = translate.accountDetail;
    const walletId: number = useSelector(walletIdSelector);
    const { removed, keys }: IGeneralLanguage = useSelector(translateByFieldSelector)('general');
    const { account, canRemove } = props;
    const {
        paymentAddressKeySerialized,
        privateKeySerialized,
        publicKeyCheckEncode,
        validatorKey,
        viewingKeySerialized,
        paymentAddress,
    } = account.key.keySet;
    const dispatch = useDispatch();
    const shard = useMemo(() => {
        const { publicKeyBytes } = paymentAddress;
        const lastByte = publicKeyBytes[publicKeyBytes.length - 1];

        return (toNumber(lastByte) % 8).toString();
    }, [paymentAddress]);

    const index = useMemo(() => {
        return account.getIndex();
    }, [account]);
    const factories = [
        {
            title: translateAccountDetail.title1,
            desc: paymentAddressKeySerialized,
        },
        {
            title: translateAccountDetail.title2,
            desc: privateKeySerialized,
        },
        {
            title: translateAccountDetail.title3,
            desc: publicKeyCheckEncode,
        },
        { title: translateAccountDetail.title4, desc: viewingKeySerialized },
        { title: translateAccountDetail.title5, desc: validatorKey },
        { title: translateAccountDetail.index, desc: index },
        { title: translateAccountDetail.shard, desc: shard },
    ];
    const removeKeychain: boolean = useSelector(removeAccountSelector);
    const handleRemoveKeychain = async (account: AccountInstance) => {
        try {
            const accountName = account.name;
            sendExtensionMessage(APP_CONSTANT.BACKGROUND_LISTEN.REMOVE_ACCOUNT, { accountName });
            await dispatch(actionFetchRemoveAccount(accountName, walletId));
            dispatch(actionClearAllModal());
            dispatch(
                actionToggleToast({
                    toggle: true,
                    value: `${removed} ${accountName}`,
                    type: TOAST_CONFIGS.success,
                }),
            );
        } catch (error) {
            dispatch(
                actionToggleToast({
                    toggle: true,
                    value: error,
                    type: TOAST_CONFIGS.error,
                }),
            );
        }
    };

    return (
        <Styled>
            <Header
                title={`${account.name} ${keys}`}
                rightHeader={
                    canRemove && (
                        <SmallButton
                            title={`${translate.accountDetail.removeKey}${removeKeychain ? '...' : ''}`}
                            onClick={() => handleRemoveKeychain(account)}
                        />
                    )
                }
                onGoBack={() => dispatch(actionToggleModal({}))}
            />
            <div className="scroll-view">
                {factories.map((item) => (
                    <Item key={item.title} {...item} />
                ))}
            </div>
        </Styled>
    );
};

export default AccountDetails;
