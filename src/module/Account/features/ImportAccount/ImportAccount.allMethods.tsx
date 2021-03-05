import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ImportMasterKey from 'src/module/HDWallet/features/ImportMasterKey';
import { route as routeAddKeys } from 'src/module/Keychain/features/AddKeys';
import { actionToggleToast, Button, Header, TOAST_CONFIGS } from 'src/components';
import { IAccountLanguage } from 'src/i18n';
import { translateByFieldSelector } from 'src/module/Configs/Configs.selector';
import styled from 'styled-components';
import { isInitMasterlessSelector, masterlessIdSelector } from 'src/module/Wallet/Wallet.selector';
import { actionFetchImportAccount } from 'src/module/Account/Account.actions';
import { importAccountSelector } from 'src/module/Account/Account.selector';
import { actionInitMasterless } from 'src/module/Wallet';
import { actionToggleModal } from 'src/components/Modal';

const Styled = styled.div`
    .group-actions {
        .btn-container {
            :first-child {
                margin-top: 30px;
                margin-bottom: 15px;
            }
        }
    }
`;

interface IProps {
    onGoBack: () => any;
    accountName: string;
    privateKey: string;
}

const AllMethodsImport = (props: IProps) => {
    const { onGoBack, privateKey, accountName }: IProps = props;
    const translate: IAccountLanguage = useSelector(translateByFieldSelector)('account');
    const { title, subAllMethods, btnImportKeychainOnly, btnImportMasterKey } = translate.import;
    const masterlessId = useSelector(masterlessIdSelector);
    const isInitMasterless = useSelector(isInitMasterlessSelector);
    const history = useHistory();
    const dispatch = useDispatch();
    const importing = useSelector(importAccountSelector);
    const handleImportMasterKey = () => {
        dispatch(
            actionToggleModal({
                data: (
                    <ImportMasterKey
                        onImportedMasterKey={() => history.push(routeAddKeys)}
                        onGoBack={() => dispatch(actionToggleModal({}))}
                    />
                ),
            }),
        );
    };
    const handleImportKeychainOnly = async () => {
        try {
            let walletId: any = masterlessId;
            if (!isInitMasterless) {
                walletId = await dispatch(actionInitMasterless());
            }
            await dispatch(
                actionFetchImportAccount({
                    accountName,
                    privateKey,
                    walletId,
                }),
            );
            history.goBack();
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
            <Header title={title} onGoBack={onGoBack} />
            <div className="main scroll-view">
                <p className="main-text">{subAllMethods}</p>
                <div className="group-actions">
                    <Button title={btnImportMasterKey} onClick={handleImportMasterKey} />
                    <Button
                        disabled={importing}
                        title={`${btnImportKeychainOnly}${importing ? '...' : ''}`}
                        onClick={handleImportKeychainOnly}
                    />
                </div>
            </div>
        </Styled>
    );
};

export default React.memo(AllMethodsImport);
