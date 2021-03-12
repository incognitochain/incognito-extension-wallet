import React from 'react';
import { ArrowDownIcon } from 'src/components/Icons';
import { Wrapper } from './styled';

const SelectCoins = React.memo(() => {
    return (
        <Wrapper>
            <ArrowDownIcon />
        </Wrapper>
    );
});

export default SelectCoins;
