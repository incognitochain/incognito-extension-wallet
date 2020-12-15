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
  border-radius: 50px;
  height: 50px;
  margin: auto;
  padding: 0 20px;
  background-color: ${(props: { theme: ITheme }) => props.theme.button};
  color: ${(props: { theme: ITheme }) => props.theme.textButton};
  p.btn-title {
  }
  &.btn-disabled {
    background-color: ${COLORS.colorGreyLight};
  }
`;

const Button = (
  props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { customContent, title, disabled, className, ...rest } = props;
  const theme = useSelector(themeSelector);
  return (
    <Styled
      theme={theme}
      className={`btn-container ${
        disabled ? 'btn-disabled' : ''
      } ${className} fw-bold fs-medium`}
      {...rest}
    >
      {!!customContent ? customContent : title}
    </Styled>
  );
};

export default Button;
