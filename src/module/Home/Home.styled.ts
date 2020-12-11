import { COLORS, FONT_SIZES } from 'src/styles';
import styled from 'styled-components';

export const Styled = styled.div`
  &.home-container > .title {
    font-weight: 500;
    font-size: ${FONT_SIZES.superMedium}px;
    line-height: ${FONT_SIZES.superMedium + 9}px;
  }
  .category {
    margin: 30px 0;
  }
  .category > .title {
    font-weight: 200;
    font-size: ${FONT_SIZES.medium}px;
    line-height: ${FONT_SIZES.medium + 9}px;
  }
  .category-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 15px;
    cursor: pointer;
    :hover {
      background-image: linear-gradient(
        to right,
        ${COLORS.colorGreyLight},
        ${COLORS.colorGreyMedium}
      );
    }
  }
  .category-item .left .icon {
    width: 60px;
    height: 60px;
    margin-right: 15px;
  }
  .category-item .right > {
    .title {
      font-size: ${FONT_SIZES.regular}px;
      line-height: ${FONT_SIZES.regular + 9}px;
    }
    .desc {
      font-size: ${FONT_SIZES.regular}px;
      line-height: ${FONT_SIZES.regular + 9}px;
    }
  }
`;
