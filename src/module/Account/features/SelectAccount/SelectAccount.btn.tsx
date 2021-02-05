import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { defaultAccountNameSelector } from 'src/module/Account/Account.selector';
import { Link } from 'react-router-dom';
import { route } from './SelectAccount.route';

const CustomLink = styled(Link)`
    max-width: 80px;
`;

export const BtnSelectAccount = React.memo(() => {
    const defaultName = useSelector(defaultAccountNameSelector);
    return (
        <CustomLink to={route} className="btn-select-account fw-medium ellipsis">
            {defaultName}
        </CustomLink>
    );
});
