import styled from 'styled-components';
import { COLORS } from 'src/styles';

export const Styled = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  label {
    margin-bottom: 5px;
  }
  span.error {
    color: ${COLORS.red};
  }
  span.warning {
    color: ${COLORS.orange};
  }
  .input-container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .input-container input {
    flex: 1;
  }
  .input-container input.readonly {
    color: ${COLORS.colorGreyBold};
  }
`;
