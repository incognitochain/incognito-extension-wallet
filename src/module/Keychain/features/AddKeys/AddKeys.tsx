import React, { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { actionSwitchWallet } from 'src/module/Wallet';
import { AddCircleIcon, Header } from 'src/components';
import { translateByFieldSelector } from 'src/module/Configs/Configs.selector';
import { masterlessIdSelector, walletIdSelector } from 'src/module/Wallet/Wallet.selector';
import { IKeychainLanguage } from 'src/i18n';
import { route as routeCreateAccount } from 'src/module/Account/features/CreateAccount';
import {
    actionSetStepCreateMasterKey,
    route as routeCreateMasterKey,
    STEPS_CREATE,
} from 'src/module/HDWallet/features/CreateMasterKey';
import { route as routeImportMasterKey } from 'src/module/HDWallet/features/ImportMasterKey';
import { ACTION_TYPES, actionSetActionType, listMasterKeyIdsAndNamesSelector } from 'src/module/HDWallet';
import { IGlobalStyle } from 'src/styles';
import { route as routeImportAccount } from 'src/module/Account/features/ImportAccount';
import { route as routeKeyChain } from 'src/module/Keychain';

export const Styled = styled.div`
    .disabled {
        opacity: 0.5;
        cursor: not-allowed;
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
                    className="fs-medium ellipsis"
                >
                    {title}
                </Link>
                {hasIcon && (
                    <div className="add-icon">
                        <AddCircleIcon onClick={() => (typeof onClickIcon === 'function' ? onClickIcon() : null)} />
                    </div>
                )}
            </div>
        );
    },
);

const BlockAddNewKeychains = React.memo(() => {
    const walletId: number = useSelector(walletIdSelector);
    const masterlessId: number = useSelector(masterlessIdSelector);
    const listMasterKeyIdsAndNames: { name: string; walletId: number }[] = useSelector(
        listMasterKeyIdsAndNamesSelector,
    );
    const translateKeychain: IKeychainLanguage = useSelector(translateByFieldSelector)('keychain');
    const dictionary = translateKeychain.addKeys;
    const dispatch = useDispatch();
    const history = useHistory();
    const handleAddKeyChain = (walletId: number) => {
        dispatch(actionSwitchWallet(walletId));
        history.push(routeCreateAccount, {
            walletId,
        });
    };
    const handleSwitchWallet = (walletId: number) => dispatch(actionSwitchWallet(walletId));
    const onImportPrivateKey = () => {
        history.push(routeImportAccount, {});
    };
    return (
        <div className="block-add">
            <div className="fs-medium fw-medium m-b-30">{dictionary.addKeychain}</div>
            <div className="p-l-15 m-b-30">
                <div className="fs-medium desc m-b-30">{dictionary.addKeyChainDesc}</div>
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
            <Item title={dictionary.importKeyChain} onClickItem={onImportPrivateKey} onClickIcon={onImportPrivateKey} />
        </div>
    );
});

const BlockActions = React.memo(() => {
    const translateKeychain: IKeychainLanguage = useSelector(translateByFieldSelector)('keychain');
    const dictionary = translateKeychain.addKeys;
    const history = useHistory();
    const dispatch = useDispatch();
    const handleCreateMasterKey = () => {
        dispatch(actionSetActionType(ACTION_TYPES.CREATE));
        dispatch(actionSetStepCreateMasterKey(STEPS_CREATE.createMasterKeyName));
        history.push(routeCreateMasterKey, {
            shouldRedirectToKeyChain: true,
            showToast: true,
        });
    };
    const handleImportMasterKey = () => {
        dispatch(actionSetActionType(ACTION_TYPES.IMPORT));
        history.push(routeImportMasterKey, {
            shouldRedirectToKeyChain: true,
            showToast: true,
        });
    };
    return (
        <div className="block-actions m-t-50">
            <div className="fs-medium fw-medium m-b-30">{dictionary.addMasterKey}</div>
            <div className="p-l-15">
                <Item title={dictionary.createMasterKey} onClickIcon={handleCreateMasterKey} />
                <Item title={dictionary.importMasterKey} onClickIcon={handleImportMasterKey} />
            </div>
        </div>
    );
});

const AddKeys = React.memo(() => {
    const translateKeychain: IKeychainLanguage = useSelector(translateByFieldSelector)('keychain');
    const dictionary = translateKeychain.addKeys;
    const history = useHistory();
    return (
        <Styled>
            <Header title={dictionary.title} onGoBack={() => history.push(routeKeyChain)} />
            <div className="main scroll-view">
                <BlockAddNewKeychains />
                <BlockActions />
            </div>
        </Styled>
    );
});

export default AddKeys;
