import React from 'react';
import { COLORS, FONT_SIZES } from 'src/styles';
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
  background-color: ${COLORS.black};
  height: 50px;
  margin: auto;
  padding: 0 20px;
  margin-top: 50px;
  color: ${COLORS.white};
  font-size: ${FONT_SIZES.medium}px;
  line-height: ${FONT_SIZES.medium + 3}px;
  font-weight: 500;
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
  console.debug(`disabled`,disabled)
  return (
    <Styled className={`btn-container ${disabled ? 'btn-disabled' : ''}`} {...rest}>
      {!!customContent ? customContent : title}
    </Styled>
  );
};

export default Button;
