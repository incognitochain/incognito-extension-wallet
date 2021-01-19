import React from 'react';
import { compose } from 'recompose';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { withLayout } from 'src/components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { ISettingLanguage } from 'src/i18n/interface';
import { translateByFieldSelector } from 'src/module/Configs';
import { route as addressBookRoute } from 'src/module/AddressBook';
import { route as keychainRoute } from 'src/module/Keychain';
import { chainURLSelector } from 'src/module/Preload';
import { actionLogout } from 'src/module/Password';
import { actionToggleDecimalDigits, actionToggleHomeConfigs } from 'src/module/Setting/Setting.actions';
import styled from 'styled-components';
import { Header, SettingIcon } from 'src/components';
import { IInner } from './Setting.interface';
import { ISettingItem } from './features/SettingItem';
import { devSettingSelector, settingSelector } from './Setting.selector';
import { route as networkRoute } from './features/Network';

const WrapSetting = styled.div`
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 24px;
    > a {
        cursor: default;
    }
`;

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
    const translate: ISettingLanguage = useSelector(translateByFieldSelector)('setting');
    const dispatch = useDispatch();
    const handleToggleHomeConfigs = () => dispatch(actionToggleHomeConfigs());
    const chainURL = useSelector(chainURLSelector);
    const { decimalDigits } = useSelector(settingSelector);
    const { stagingHomeConfigs } = useSelector(devSettingSelector);
    const settingFactories: ISettingItem[] = [
        {
            title: translate.keychain.title,
            child: [{ desc: translate.keychain.desc, link: keychainRoute }],
        },
        {
            title: translate.network.title,
            child: [{ desc: chainURL, link: networkRoute }],
        },
        {
            title: translate.dev.title,
            child: [
                {
                    desc: translate.dev.homeConfigs,
                    toggle: true,
                    onClick: handleToggleHomeConfigs,
                    toggleValue: stagingHomeConfigs,
                },
            ],
        },
        {
            title: translate.addressBook.title,
            child: [{ desc: translate.addressBook.desc, link: addressBookRoute }],
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
            title: translate.logout.title,
            button: true,
            onClick: () => dispatch(actionLogout()),
        },
    ];
    const renderSettingIcon = () => (
        <WrapSetting>
            <SettingIcon />
        </WrapSetting>
    );
    return (
        <ErrorBoundary>
            {renderSettingIcon()}
            <Header title={translate.headerTitle} />
            <WrappedComponent {...{ ...props, settingFactories }} />
        </ErrorBoundary>
    );
};

export default compose<IInner, any>(enhance);
