import React from 'react';
import { Checkbox } from 'src/components/Core';
import { FONT_SIZES } from 'src/styles';
import styled from 'styled-components';
import ListToken from './Token.list';
import { IAllListTokenInner } from './Token.interface';

const Styled = styled.div`
    .hook {
        flex-direction: 'row';
        align-items: 'center';
        margin-top: 35px;
    }
    .hookText {
        font-weight: 200;
        font-size: ${FONT_SIZES.regular};
        line-height: ${FONT_SIZES.regular + 5};
        margin-left: 5px;
    }
    .checkbox-container {
        margin-bottom: 30px;
    }
    .checkbox-container .checkbox-icon {
        margin-left: unset;
    }
`;

const ListAllToken = (props: IAllListTokenInner) => {
    const { tokensFactories, onToggleUnVerifiedTokens, toggleUnVerified, renderItem, extra } = props;
    return (
        <Styled className="all-list-token scroll-view">
            <ListToken {...tokensFactories[0]} renderItem={renderItem} />
            <Checkbox
                onHandleChecked={() => onToggleUnVerifiedTokens(!toggleUnVerified)}
                checked={toggleUnVerified}
                label="Show unverified coins"
            />
            <ListToken {...tokensFactories[1]} renderItem={renderItem} />
            {extra && extra}
        </Styled>
    );
};

ListAllToken.propTypes = {};

export default React.memo(ListAllToken);
