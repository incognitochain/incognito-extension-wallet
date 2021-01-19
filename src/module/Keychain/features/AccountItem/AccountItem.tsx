import React, { useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionFetchRemoveAccount, actionSwitchAccount, defaultAccountSelector } from 'src/module/Account';
import { IAccountItem } from 'src/module/Keychain/Keychain.interface';
import { TrashBinIcon, Row } from 'src/components';
import { actionShowTooltip } from '../../../Tooltip';
import { IGeneralLanguage } from '../../../../i18n';
import { translateByFieldSelector } from '../../../Configs';

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

    const handleRemoveKeychain = () => {
        try {
            dispatch(actionFetchRemoveAccount(account.name));
        } catch (error) {
            console.debug(error);
        }
    };

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
            <Row>
                <p>{displayAddress}</p>
                <TrashBinIcon className="delete-icon" onClick={handleRemoveKeychain} />
            </Row>
        </div>
    );
});

export default AccountItem;
