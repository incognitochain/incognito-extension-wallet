import styled from 'styled-components';
import { COLORS, IGlobalStyle } from 'src/styles';

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
        margin-top: 15px;
    }
    .fee-types .fee-type {
        background-color: ${COLORS.colorGreyLight};
        border-radius: 8px;
        color: ${COLORS.black};
        padding-top: 1px;
        min-width: 54px;
        height: 28px;
        &.selected {
            color: ${COLORS.white};
            background-color: ${(props: IGlobalStyle) => props.theme.button};
        }
        :last-child {
            margin-left: 5px;
        }
    }
    .force-balance {
        padding-top: 25px;
        color: ${COLORS.newGrey};
    }
    .origin-url {
        position: absolute;
        top: 35px;
    }
    .error-block {
        margin-top: 10px;
    }
    .fastfee-icon {
        margin-left: 5px;
    }
`;

export const Row = styled.div`
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    .btn-container {
        width: 145px;
        margin: 30px 0;
    }
`;
