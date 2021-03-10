import React, { useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionHandleSwitchAccount, isAccountSelectedSelector } from 'src/module/Account';
import { IGeneralLanguage } from 'src/i18n';
import styled from 'styled-components';
import { IGlobalStyle } from 'src/styles';
import { AccountInstance } from 'incognito-js/build/web/browser';
import { actionToggleToast, TOAST_CONFIGS } from 'src/components';
import { translateByFieldSelector } from 'src/module/Configs';
import { actionShowTooltip } from 'src/module/Tooltip';

const Styled = styled.div`
    position: relative;
    justify-content: space-between;
    margin-top: 30px;
    padding-left: 15px;
    cursor: pointer;
    :hover {
        color: ${(props: IGlobalStyle) => props.theme.text};
    }
`;

interface IProps {
    walletId: number;
    account: AccountInstance;
}

const AccountItem = React.memo((props: IProps) => {
    const ref: any = useRef();
    const { account, walletId } = props;
    const dispatch = useDispatch();
    const isSelected = useSelector(isAccountSelectedSelector)(account);
    const { paymentAddressKeySerialized: paymentAddress } = account.key.keySet;
    const translate: IGeneralLanguage = useSelector(translateByFieldSelector)('general');
    const displayAddress = useMemo(() => {
        return `...${paymentAddress.substring(paymentAddress.length - 6)}`;
    }, [paymentAddress]);
    const handleSelectAccount = async () => {
        try {
            await dispatch(actionHandleSwitchAccount(account, walletId));
            dispatch(
                actionShowTooltip({
                    ref: ref ? ref?.current : null,
                    text: `${translate.switched} ${account.name}`,
                    timeout: 1,
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
    if (!account || !walletId) {
        return null;
    }
    return (
        <Styled
            onClick={handleSelectAccount}
            className={`account-item flex fs-medium ${isSelected ? 'main-text' : 'sub-text'}`}
        >
            <p ref={ref} className="account-name ellipsis m-r-15">
                {account.name}
            </p>
            <p>{displayAddress}</p>
            <div className="center-abs-hor" ref={ref} />
        </Styled>
    );
});

export default AccountItem;
