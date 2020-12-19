import styled from 'styled-components';
import { COLORS } from 'src/styles';

export const Styled = styled.div`
  margin-top: 30px;
  .input-container {
    position: relative;
    height: 40px;
  }
  label {
    margin-bottom: 5px;
  }
  > p {
    margin-top: 10px;
  }
  p.error {
    color: ${COLORS.red};
  }
  p.warning {
    color: ${COLORS.orange};
  }
  .input-container > input {
    position: absolute;
    left: 0;
    top: 0;
    background-color: ${COLORS.colorGreyLight};
    color: ${COLORS.black};
    width: 100%;
    height: 100%;
    border-radius: 8px;
    padding: 0 10px;
    :focus {
      border: solid 1px ${COLORS.black};
    }
  }
  .input-container .sub-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .input-amount {
    > input {
      padding-right: 40px;
    }
    .sub-icon {
      right: 10px;
    }
  }

  .input-address {
    > input {
      padding-right: 70px;
    }
    .sub-icon {
      :nth-child(2) {
        right: 40px;
      }
      :last-child {
        right: 10px;
      }
    }
  }
`;
