import React from 'react';
import { useSelector } from 'react-redux';
import { Header } from 'src/components';
import { ILanguage } from 'src/i18n';
import styled from 'styled-components';
import { translateSelector } from 'src/module/Configs/Configs.selector';
import { SettingItem, ISettingItem } from './features/SettingItem';
import withSetting from './Setting.enhance';
import { IInner } from './Setting.interface';

const Styled = styled.div``;

const Setting = (props: IInner) => {
    const translate: ILanguage = useSelector(translateSelector);
    const settingTranslate = translate.setting;
    const { settingFactories } = props;
    return (
        <Styled>
            <Header title={settingTranslate.headerTitle} />
            {settingFactories.map((item: ISettingItem) => (
                <SettingItem key={item.title} {...item} />
            ))}
        </Styled>
    );
};

export default withSetting(React.memo(Setting));
