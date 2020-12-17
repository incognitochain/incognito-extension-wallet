import React from 'react';
import { useSelector } from 'react-redux';
import { themeSelector } from 'src/module/Configs';
import { COLORS, ITheme } from 'src/styles';
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
  border-radius: 20px;
  height: 40px;
  margin: auto;
  padding: 0 11px;
  background-color: ${(props: { theme: ITheme }) => props.theme.button};
  color: ${(props: { theme: ITheme }) => props.theme.textButton};
  width: 100%;
  p.btn-title {
  }
  &.btn-disabled {
    background-color: ${COLORS.colorGreyLight};
  }
`;

const Button = (
  props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { customContent, title, disabled, className = '', ...rest } = props;
  const theme = useSelector(themeSelector);
  return (
    <Styled
      theme={theme}
      className={`${className} btn-container ${
        disabled ? 'btn-disabled' : ''
      } fw-regular fs-regular`}
      {...rest}
    >
      {!!customContent ? customContent : title}
    </Styled>
  );
};

export default Button;
