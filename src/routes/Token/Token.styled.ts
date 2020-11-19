import { COLORS, FONT_SIZES } from 'src/styles';
import styled from 'styled-components';

export const Styled = styled.div``;

export const NameStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const TextStyled = styled.p`
  font-weight: 200;
  font-size: ${FONT_SIZES.medium};
  line-height: ${FONT_SIZES.medium + 5};
  color: ${COLORS.colorGreyBold};
  &.bold {
    font-weight: 500;
    font-size: ${FONT_SIZES.superMedium};
    line-height: ${FONT_SIZES.superMedium + 4};
    color: ${COLORS.black};
  }
`;

export const BalanceStyled = styled.div``;
