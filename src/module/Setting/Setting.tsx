import React from 'react';
import styled from 'styled-components';
import withSetting, { IMergeProps } from 'src/module/Setting/Setting.enhance';
import { SettingItem, ISettingItem } from './features/SettingItem';

const Styled = styled.div``;

const Setting = (props: IMergeProps & any) => {
    const { settingFactories }: IMergeProps = props;
    return (
        <Styled className="scroll-view">
            {settingFactories.map((item: ISettingItem) => (
                <SettingItem key={item.title} {...item} />
            ))}
        </Styled>
    );
};

export default withSetting(React.memo(Setting));
