import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { route as routeImportMasterKey } from 'src/module/HDWallet/features/ImportMasterKey';
import { actionToggleToast, Button, Header, TOAST_CONFIGS } from 'src/components';
import { IAccountLanguage } from 'src/i18n';
import { translateByFieldSelector } from 'src/module/Configs/Configs.selector';
import styled from 'styled-components';
import { masterlessIdSelector } from 'src/module/Wallet/Wallet.selector';
import { actionFetchImportAccount } from 'src/module/Account/Account.actions';

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
    const history = useHistory();
    const dispatch = useDispatch();
    const handleImportMasterKey = () => history.push(routeImportMasterKey);
    const handleImportKeychainOnly = async () => {
        try {
            await dispatch(
                actionFetchImportAccount({
                    accountName,
                    privateKey,
                    walletId: masterlessId,
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
            <Header title={title} onGoBack={onGoBack} />
            <div className="main scroll-view">
                <p className="main-text">{subAllMethods}</p>
                <div className="group-actions">
                    <Button title={btnImportMasterKey} onClick={handleImportMasterKey} />
                    <Button title={btnImportKeychainOnly} onClick={handleImportKeychainOnly} />
                </div>
            </div>
        </Styled>
    );
};

export default React.memo(AllMethodsImport);
