import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, AddCircleIcon } from 'src/components';
import { modalTranslateSelector, translateByFieldSelector } from 'src/module/Configs';
import { withLayout } from 'src/components/Layout';
import styled from 'styled-components';
import { walletDataSelector } from 'src/module/Wallet';
import { IKeychainLanguage } from 'src/i18n';
import { actionToggleModal } from 'src/components/Modal';
import CreateAccount from 'src/module/Account/features/CreateAccount';

export const Styled = styled.div`
    .disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    .add-keychain-title {
    }
    .add-keychain-desc {
    }
    .add-master-key-title {
    }
    .create-master-key {
    }
    .import-master-key {
    }
`;

const AddKeys = React.memo(() => {
    const wallet = useSelector(walletDataSelector);
    const translateKeychain: IKeychainLanguage = useSelector(translateByFieldSelector)('keychain');
    const modalTranslate = useSelector(modalTranslateSelector);
    const dictionary = translateKeychain.addKeys;
    const dispatch = useDispatch();

    const handleAddKeyChain = () => {
        dispatch(
            actionToggleModal({
                data: <CreateAccount />,
                title: modalTranslate.createKeyModal,
                closeable: true,
            }),
        );
    };

    return (
        <Styled>
            <div>
                <div className="add-keychain-title m-b-30">{dictionary.addKeychain}</div>
                <div className="p-l-15 m-b-30">
                    <div className="add-keychain-desc m-b-30">{dictionary.addKeyChainDesc}</div>
                    <Row className="p-l-15 m-b-30">
                        <div className="master-key">{wallet.name}</div>
                        <AddCircleIcon onClick={handleAddKeyChain} />
                    </Row>
                </div>
            </div>
            <div className="add-master-key m-t-50 disabled">
                <div className="m-b-30">{dictionary.addMasterKey}</div>
                <div className="p-l-15">
                    <div className="create-master-key m-b-30">{dictionary.createMasterKey}</div>
                    <div className="import-master-key m-b-30">{dictionary.importMasterKey}</div>
                </div>
            </div>
        </Styled>
    );
});

export default withLayout(AddKeys);
