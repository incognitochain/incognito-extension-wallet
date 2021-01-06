import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddCircleIcon, Header } from 'src/components';
import { modalTranslateSelector, translateByFieldSelector } from 'src/module/Configs';
import { IKeychainLanguage } from 'src/i18n';
import { withLayout } from 'src/components/Layout';
import { Styled } from './Keychain.styled';
import KeychainList from './features/KeychainList';
import { actionToggleModal } from '../../components/Modal';
import AddKeys from './features/AddKeys';

const Keychain = React.memo(() => {
    const dispatch = useDispatch();
    const translateKeychain: IKeychainLanguage = useSelector(translateByFieldSelector)('keychain');
    const modalTranslate = useSelector(modalTranslateSelector);
    const handleAdd = () => {
        dispatch(
            actionToggleModal({
                data: <AddKeys />,
                title: modalTranslate.addKeysModal,
                closeable: true,
            }),
        );
    };

    return (
        <Styled>
            <Header title={translateKeychain.headerTitle} rightHeader={<AddCircleIcon onClick={handleAdd} />} />
            <KeychainList />
        </Styled>
    );
});

export default withLayout(Keychain);
