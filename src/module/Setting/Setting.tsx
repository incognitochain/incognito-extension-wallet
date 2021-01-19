import React from 'react';
import styled from 'styled-components';
import { SettingItem, ISettingItem } from './features/SettingItem';
import withSetting from './Setting.enhance';
import { IInner } from './Setting.interface';

const Styled = styled.div`
    padding-bottom: 10px;
    overflow: scroll;
    max-height: 433px;
`;

const Setting = (props: IInner) => {
    const { settingFactories } = props;
    return (
        <Styled>
            {settingFactories.map((item: ISettingItem) => (
                <SettingItem key={item.title} {...item} />
            ))}
        </Styled>
    );
};

export default withSetting(React.memo(Setting));
