import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
    isIncognitoAddressExistSelector,
    isExternalAddressExistSelector,
} from 'src/module/AddressBook/AddressBook.selector';
import { Button } from 'src/components';
import { translateByFieldSelector } from 'src/module/Configs';
import { IAddressBookLanguage } from 'src/i18n';
import { useHistory } from 'react-router-dom';
import { ConfirmTxItem } from 'src/module/Send/features/ConfirmTx/ConfirmTx.interface';
import { route as routeAction } from './Action.route';

const Styled = styled.div``;

interface IProps {
    data: ConfirmTxItem;
}

const BtnAction = (props: IProps) => {
    const translate: IAddressBookLanguage = useSelector(translateByFieldSelector)('addressBook');
    const history = useHistory();
    const { data } = props;
    const { paymentAddress: address, isExternalAddress, isIncognitoAddress, addressBookType: type, tokenId } = data;
    const isIncognitoAddressExist = useSelector(isIncognitoAddressExistSelector);
    const isExternalAddressExist = useSelector(isExternalAddressExistSelector);
    const renderBtnAction = () => {
        if (
            !address ||
            (isIncognitoAddress && isIncognitoAddressExist(address)) ||
            (isExternalAddress && isExternalAddressExist(address))
        ) {
            return null;
        }
        return (
            <Styled>
                <Button
                    title={translate.btnSave}
                    onClick={() => {
                        history.push(routeAction, {
                            type,
                            address,
                            tokenId,
                        });
                    }}
                />
            </Styled>
        );
    };
    return renderBtnAction();
};

export default React.memo(BtnAction);
