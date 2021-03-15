import React from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { useDispatch, useSelector } from 'react-redux';
import { ISettingLanguage } from 'src/i18n/interface';
import { translateByFieldSelector } from 'src/module/Configs';
import { route as addressBookRoute } from 'src/module/AddressBook';
import { route as keychainRoute } from 'src/module/Keychain';
import { chainURLSelector } from 'src/module/Preload';
import { actionLogout } from 'src/module/Password';
import { Header } from 'src/components';
import { useHistory } from 'react-router-dom';
import { route as importRoute } from 'src/module/Account/features/ImportAccount';
import { route as profileRoute } from 'src/module/Profile';
import {
    actionToggleDecimalDigits,
    actionToggleHomeConfigs,
    actionToggleModeSaveBurnTx,
    actionToggleModeSaveRawBurnTx,
    actionToggleDarkMode,
} from './Setting.actions';
import { ISettingItem } from './features/SettingItem';
import { devSettingSelector, isDevSelector, settingSelector } from './Setting.selector';
import { route as networkRoute } from './features/Network';

interface IProps {}
interface TInner {
    settingFactories: any[];
}

export interface IMergeProps extends IProps, TInner {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
    const translate: ISettingLanguage = useSelector(translateByFieldSelector)('setting');
    const dispatch = useDispatch();
    const handleToggleHomeConfigs = () => dispatch(actionToggleHomeConfigs());
    const chainURL = useSelector(chainURLSelector);
    const { decimalDigits, darkMode } = useSelector(settingSelector);
    const { stagingHomeConfigs, toggleSaveBurnTx, toggleSaveRawBurnTx } = useSelector(devSettingSelector);
    const history = useHistory();
    const isDev = useSelector(isDevSelector);
    let settingFactories: ISettingItem[] = [
        {
            title: translate.keychain.title,
            child: [{ desc: translate.keychain.desc, link: keychainRoute }],
        },
        {
            title: translate.network.title,
            child: [{ desc: chainURL, link: networkRoute }],
        },

        {
            title: translate.addressBook.title,
            child: [
                {
                    desc: translate.addressBook.desc,
                    onClick: () => history.push(addressBookRoute, { showRemoveItem: true }),
                },
            ],
        },
        {
            title: translate.decimalDigits.title,
            child: [
                {
                    desc: translate.decimalDigits.desc,
                    toggle: true,
                    onClick: () => dispatch(actionToggleDecimalDigits()),
                    toggleValue: decimalDigits,
                },
            ],
        },
        {
            title: translate.darkMode.title,
            child: [
                {
                    desc: translate.darkMode.desc,
                    toggle: true,
                    onClick: () => dispatch(actionToggleDarkMode(!darkMode)),
                    toggleValue: darkMode,
                },
            ],
        },
        {
            title: translate.logout.title,
            button: true,
            onClick: () => dispatch(actionLogout()),
        },
    ];
    if (isDev) {
        settingFactories.push({
            title: translate.dev.title,
            child: [
                {
                    desc: translate.dev.homeConfigs,
                    toggle: true,
                    onClick: handleToggleHomeConfigs,
                    toggleValue: stagingHomeConfigs,
                },
                {
                    desc: 'Import account',
                    onClick: () => history.push(importRoute),
                },
                {
                    desc: 'Toggle save burn tx local',
                    toggle: true,
                    onClick: () => dispatch(actionToggleModeSaveBurnTx()),
                    toggleValue: toggleSaveBurnTx,
                },
                {
                    desc: 'Toggle save burn raw tx local',
                    toggle: true,
                    onClick: () => dispatch(actionToggleModeSaveRawBurnTx()),
                    toggleValue: toggleSaveRawBurnTx,
                },
                {
                    desc: 'User Profile',
                    onClick: () => history.push(profileRoute),
                },
            ],
        });
    }
    return (
        <ErrorBoundary>
            <Header title={translate.headerTitle} onGoBack={() => history.push('/')} />
            <WrappedComponent {...{ ...props, settingFactories }} />
        </ErrorBoundary>
    );
};

export default enhance;
