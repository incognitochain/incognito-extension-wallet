import { FONT_SIZES } from 'src/styles';
import styled from 'styled-components';

export const Styled = styled.div`
  margin-bottom: 30px;
  label.title {
    font-weight: 500;
    font-size: ${FONT_SIZES.medium}px;
    line-height: ${FONT_SIZES.medium + 5}px;
    margin-bottom: 15px;
  }
  .item {
    font-size: ${FONT_SIZES.regular}px;
    line-height: ${FONT_SIZES.regular + 5}px;
    font-weight: 200;
  }
  .toggle-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;
