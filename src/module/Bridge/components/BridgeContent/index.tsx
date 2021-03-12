import React from 'react';
import { Tab } from 'src/module/Bridge/components';
import { BridgeShield } from 'src/module/Bridge';
import { Wrapper } from './styled';

const BridgeContent = React.memo(() => {
    return (
        <Wrapper>
            <Tab />
            <BridgeShield />
        </Wrapper>
    );
});

export default BridgeContent;
