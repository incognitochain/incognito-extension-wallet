import React from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';
import { defaultAccountNameSelector } from 'src/module/Account';
import { Link } from 'react-router-dom';
import { route } from './SelectAccount.route';

interface IProps {}

const CustomLink = styled(Link)`
  max-width: 80px;
`;

export const BtnSelectAccount = (props: IProps) => {
  const defaultName = useSelector(defaultAccountNameSelector);
  return (
    <CustomLink to={route} className='btn-select-account fw-medium ellipsis'>
      {defaultName}
    </CustomLink>
  );
};
