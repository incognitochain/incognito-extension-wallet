import React from 'react';
import { useSelector } from 'react-redux';
import { themeSelector } from 'src/routes/Configs';
import { COLORS, FONT_SIZES, ITheme } from 'src/styles';
import styled from 'styled-components';

interface IProps {
  customContent?: React.ElementType;
  title: string;
  disabled?: boolean;
}

const Styled = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  height: 50px;
  margin: auto;
  padding: 0 20px;
  font-size: ${FONT_SIZES.medium}px;
  line-height: ${FONT_SIZES.medium + 3}px;
  font-weight: 500;
  background-color: ${(props: { theme: ITheme }) => props.theme.button};
  color: ${(props: { theme: ITheme }) => props.theme.text};
  p.btn-title {
  }
  &.btn-disabled {
    background-color: ${COLORS.colorGreyMedium};
  }
`;

const Button = (
  props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { customContent, title, disabled, ...rest } = props;
  const theme = useSelector(themeSelector);
  return (
    <Styled
      theme={theme}
      className={`btn-container ${disabled ? 'btn-disabled' : ''}`}
      {...rest}
    >
      {!!customContent ? customContent : title}
    </Styled>
  );
};

export default Button;
