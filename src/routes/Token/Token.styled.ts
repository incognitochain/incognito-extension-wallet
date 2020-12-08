import { COLORS, FONT_SIZES } from 'src/styles';
import styled from 'styled-components';

export const Styled = styled.div``;

export const NameStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  .verified-icon {
    margin-left: 10px;
  }
`;

export const TextStyled = styled.p`
  font-weight: 200;
  font-size: ${FONT_SIZES.medium}px;
  line-height: ${FONT_SIZES.medium + 5}px;
  
  &.bold {
    font-weight: 500;
    font-size: ${FONT_SIZES.medium}px;
    line-height: ${FONT_SIZES.medium + 4}px;
   
  }
`;

export const AmountStyled = styled.div``;

export const BalanceStyled = styled.div``;
