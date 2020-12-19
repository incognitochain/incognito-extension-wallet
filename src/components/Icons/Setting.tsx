import React from 'react';
import { Link } from 'react-router-dom';
import { ENVS } from 'src/configs';
import styled from 'styled-components';
import { route as routeSetting } from 'src/module/Setting';

const Styled = styled(Link)`
    width: 24px;
    height: 24px;
`;

const Setting = React.memo(() => {
    return (
        <Styled to={routeSetting}>
            <img src={`${ENVS.REACT_APP_DOMAIN_URL}/images/icons/setting.png`} alt="" />
        </Styled>
    );
});

export default Setting;
