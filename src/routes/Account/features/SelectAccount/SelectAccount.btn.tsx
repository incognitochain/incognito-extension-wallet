import React from 'react';
import { useSelector } from 'react-redux';
import { ILanguage } from 'src/i18n';
import { translateSelector } from 'src/routes/Configs';
import { COLORS, FONT_SIZES } from 'src/styles';
import styled from 'styled-components';
import { defaultAccountNameSelector } from 'src/routes/Account';
import { FaAngleDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { route } from './SelectAccount.route';

interface IProps {}

const CustomLink = styled(Link)`
  background-color: ${COLORS.colorGrey};
  height: 40px;
  border-radius: 40px;
  padding: 0 10px;
  max-width: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  p {
    font-weight: 200;
    font-size: ${FONT_SIZES.regular}px;
    line-height: ${FONT_SIZES.regular + 3}px;
    color: ${COLORS.black};
    margin-right: 5px;
  }
`;

export const BtnSelectAccount = (props: IProps) => {
  const translate: ILanguage = useSelector(translateSelector);
  const defaultName = useSelector(defaultAccountNameSelector);
  return (
    <CustomLink to={route}>
      <p className='ellipsis'>{defaultName}</p>
      <FaAngleDown />
    </CustomLink>
  );
};
