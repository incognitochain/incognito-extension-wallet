import React from 'react';
import { useSelector } from 'react-redux';
import { Header, SettingIcon } from 'src/components';
import { ILanguage } from 'src/i18n';
import styled from 'styled-components';
import { translateSelector } from 'src/module/Configs/Configs.selector';
import { SettingItem, ISettingItem } from './features/SettingItem';
import withSetting from './Setting.enhance';
import { IInner } from './Setting.interface';

const Styled = styled.div`
    padding-bottom: 20px;
`;

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

const Setting = (props: IInner) => {
    const translate: ILanguage = useSelector(translateSelector);
    const settingTranslate = translate.setting;
    const { settingFactories } = props;
    const renderSettingIcon = () => (
        <WrapSetting>
            <SettingIcon />
        </WrapSetting>
    );
    return (
        <Styled>
            {renderSettingIcon()}
            <Header title={settingTranslate.headerTitle} removeMarginTop />
            {settingFactories.map((item: ISettingItem) => (
                <SettingItem key={item.title} {...item} />
            ))}
        </Styled>
    );
};

export default withSetting(React.memo(Setting));
