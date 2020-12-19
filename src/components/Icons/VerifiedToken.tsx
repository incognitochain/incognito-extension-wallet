import React from 'react';
import { ENVS } from 'src/configs';
import styled from 'styled-components';

const Styled = styled.div`
    width: 14px;
    height: 14px;
`;

const VerifiedIcon = () => {
    return (
        <Styled className="icon">
            <img src={`${ENVS.REACT_APP_DOMAIN_URL}/images/icons/verified-token.png`} alt="" />
        </Styled>
    );
};

export default React.memo(VerifiedIcon);
