import React from 'react';
import styled from 'styled-components';
import withSetting from 'src/module/Setting/Setting.enhance';
import { SettingItem, ISettingItem } from './features/SettingItem';
import { IInner } from './Setting.interface';

const Styled = styled.div``;

const Setting = (props: IInner) => {
    const { settingFactories } = props;
    return (
        <Styled className="scroll-view">
            {settingFactories.map((item: ISettingItem) => (
                <SettingItem key={item.title} {...item} />
            ))}
        </Styled>
    );
};

export default withSetting(React.memo(Setting));
