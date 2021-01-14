import React from 'react';
import styled from 'styled-components';

const Styled = styled.div`
    width: 50px;
    height: 50px;
    background-color: #000;
    border-radius: 50%;
    margin-bottom: 30px;
`;

const AppIcon = () => {
    return <Styled className="layout-container" />;
};

export default AppIcon;
