import React, { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddCircleIcon, Header } from 'src/components';
import { modalTranslateSelector, translateByFieldSelector } from 'src/module/Configs';
import { withLayout } from 'src/components/Layout';
import styled from 'styled-components';
import { actionSwitchWallet, masterlessIdSelector, walletIdSelector } from 'src/module/Wallet';
import { IKeychainLanguage } from 'src/i18n';
import { actionToggleModal } from 'src/components/Modal';
import CreateAccount from 'src/module/Account/features/CreateAccount';
import {
    actionSetStepCreateMasterKey,
    route as routeCreateMasterKey,
    STEPS_CREATE,
} from 'src/module/HDWallet/features/CreateMasterKey';
import { route as routeImportMasterKey } from 'src/module/HDWallet/features/ImportMasterKey';
import { Link, useHistory } from 'react-router-dom';
import { actionSetActionType, ACTION_TYPES, listMasterKeyIdsAndNamesSelector } from 'src/module/HDWallet';
import { IGlobalStyle } from 'src/styles';

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
    .item {
        > a:hover {
            color: ${(props: IGlobalStyle) => props.theme.text};
        }
    }
`;

const Item = React.memo(
    (props: {
        title: string;
        onClickItem?: () => any;
        onClickIcon?: () => any;
        classNameItem?: string;
        hasIcon?: boolean;
    }) => {
        const { title, onClickItem, classNameItem, onClickIcon, hasIcon = true } = props;
        return (
            <div className={`item flex-jcb p-l-15 m-b-30 ${classNameItem || ''}`}>
                <Link
                    to="#"
                    onClick={(e: SyntheticEvent) => {
                        e.preventDefault();
                        typeof onClickItem === 'function' ? onClickItem() : null;
                    }}
                >
                    {title}
                </Link>
                {hasIcon && (
                    <AddCircleIcon onClick={() => (typeof onClickIcon === 'function' ? onClickIcon() : null)} />
                )}
            </div>
        );
    },
);

const AddKeys = React.memo(() => {
    const translateKeychain: IKeychainLanguage = useSelector(translateByFieldSelector)('keychain');
    const modalTranslate = useSelector(modalTranslateSelector);
    const dictionary = translateKeychain.addKeys;
    const history = useHistory();
    const dispatch = useDispatch();
    const walletId: number = useSelector(walletIdSelector);
    const masterlessId: number = useSelector(masterlessIdSelector);
    const listMasterKeyIdsAndNames: { name: string; walletId: number }[] = useSelector(
        listMasterKeyIdsAndNamesSelector,
    );
    const handleAddKeyChain = (walletId: number) => {
        dispatch(
            actionToggleModal({
                data: <CreateAccount />,
                title: modalTranslate.createKeyModal,
                closeable: true,
            }),
        );
    };
    const handleSwitchWallet = (walletId: number) => dispatch(actionSwitchWallet(walletId));
    const handleCreateMasterKey = () => {
        dispatch(actionSetActionType(ACTION_TYPES.CREATE));
        dispatch(actionSetStepCreateMasterKey(STEPS_CREATE.createMasterKeyName));
        history.push(routeCreateMasterKey, {
            shouldGoBack: true,
        });
    };
    const handleImportMasterKey = () => {
        dispatch(actionSetActionType(ACTION_TYPES.IMPORT));
        history.push(routeImportMasterKey, {
            shouldGoBack: true,
        });
    };
    return (
        <Styled>
            <Header title={dictionary.title} />
            <div>
                <div className="add-keychain-title m-b-30">{dictionary.addKeychain}</div>
                <div className="p-l-15 m-b-30">
                    <div className="add-keychain-desc m-b-30">{dictionary.addKeyChainDesc}</div>
                    {listMasterKeyIdsAndNames.map((item) => (
                        <Item
                            key={item.walletId}
                            title={item.name}
                            onClickIcon={() => handleAddKeyChain(item.walletId)}
                            onClickItem={() => handleSwitchWallet(item.walletId)}
                            classNameItem={`${item.walletId === walletId ? 'main-text' : 'sub-text'}`}
                            hasIcon={item.walletId !== masterlessId}
                        />
                    ))}
                </div>
            </div>
            <div className="add-master-key m-t-50">
                <div className="m-b-30">{dictionary.addMasterKey}</div>
                <div className="p-l-15">
                    <Item title={dictionary.createMasterKey} onClickIcon={handleCreateMasterKey} />
                    <Item title={dictionary.importMasterKey} onClickIcon={handleImportMasterKey} />
                </div>
            </div>
        </Styled>
    );
});

export default withLayout(AddKeys);
