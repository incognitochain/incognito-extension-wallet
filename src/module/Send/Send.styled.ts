import styled from 'styled-components';
import { COLORS } from 'src/styles';

export const Styled = styled.div`
    form {
        > :first-child {
            margin-top: 10px;
        }
    }
    .btn-container {
        margin-top: 30px;
    }
    .estimate-fee {
        justify-content: space-between;
        margin-top: 10px;
    }
    .fee-types .fee-type {
        background-color: ${COLORS.colorGreyLight};
        border-radius: 4px;
        color: ${COLORS.black};
        padding: 3px 5px;
        &.selected {
            color: ${COLORS.white};
            background-color: ${COLORS.black};
        }
        :last-child {
            margin-left: 5px;
        }
    }
`;
