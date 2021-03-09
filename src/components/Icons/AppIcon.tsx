import React from 'react';
import { useSelector } from 'react-redux';
import { themeSelector } from 'src/module/Setting';
import styled from 'styled-components';
import { COLORS } from 'src/styles';

const Styled = styled.div`
    width: 50px;
    height: 50px;
    background-color: ${COLORS.black};
    border-radius: 50%;
    margin-bottom: 30px;
    border: 1px solid ${COLORS.white};
`;

const AppIcon = (props: any) => {
    const theme = useSelector(themeSelector);
    return <Styled theme={theme} className="app-icon" {...props} />;
};

export default React.memo(AppIcon);
