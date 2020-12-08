import styled from 'styled-components';
import { COLORS, FONT_SIZES } from 'src/styles';

export const Styled = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  label {
    font-size: ${FONT_SIZES.superMedium}px;
    line-height: ${FONT_SIZES.superMedium + 9}px;
    font-weight: 500;
    margin-bottom: 5px;
  }
  span.error {
    color: ${COLORS.red};
    font-size: ${FONT_SIZES.small}px;
    line-height: ${FONT_SIZES.small + 9}px;
  }
  span.warning {
    color: ${COLORS.orange};
    font-size: ${FONT_SIZES.small}px;
    line-height: ${FONT_SIZES.small + 9}px;
  }
  .input-container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .input-container input {
    font-size: ${FONT_SIZES.superMedium}px;
    line-height: ${FONT_SIZES.superMedium + 9}px;
    font-weight: 200;
    flex: 1;
  }
`;
