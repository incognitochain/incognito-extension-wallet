import styled from 'styled-components';
import { COLORS, FONT_SIZES } from 'src/styles';

export const Styled = styled.div`
  .hook-container {
    margin-bottom: 30px;
    cursor: pointer;
  }
  p.title {
    font-weight: 200;
    font-size: ${FONT_SIZES.medium}px;
    line-height: ${FONT_SIZES.medium + 9}px;
    margin-bottom: 10px;
  }
  p.desc {
    color: ${COLORS.colorGreyBold};
  }
  .account-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
    cursor: pointer;
    p.account-name {
    }
    &.selected {
      font-weight: 500;
    }
  }
`;
