import React, { useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionSwitchAccount, defaultAccountSelector } from 'src/module/Account';
import { IAccountItem } from 'src/module/Keychain/Keychain.interface';
import { actionShowTooltip } from 'src/module/Tooltip';
import { IGeneralLanguage } from 'src/i18n';
import { translateByFieldSelector } from 'src/module/Configs';

const AccountItem = React.memo((props: IAccountItem) => {
    const ref: any = useRef();
    const { account } = props;
    const dispatch = useDispatch();
    const defaultAccount = useSelector(defaultAccountSelector);
    const isSelected = defaultAccount?.name === account?.name;
    const { paymentAddressKeySerialized: paymentAddress } = account.key.keySet;
    const translate: IGeneralLanguage = useSelector(translateByFieldSelector)('general');

    const displayAddress = useMemo(() => {
        return `...${paymentAddress.substring(paymentAddress.length - 6)}`;
    }, [paymentAddress]);

    const handleSelectAccount = () => {
        dispatch(actionSwitchAccount(account.name));
        dispatch(
            actionShowTooltip({
                text: translate.switched,
                ref: ref ? ref.current : null,
            }),
        );
    };
    return (
        <div
            onClick={handleSelectAccount}
            className={`account-item fs-medium ${isSelected ? 'selected' : ''}`}
            ref={ref}
        >
            <p className="account-name ellipsis">{account.name}</p>
            <p>{displayAddress}</p>
        </div>
    );
});

export default AccountItem;
