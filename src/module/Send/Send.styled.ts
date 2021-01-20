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
        margin-top: 10px;
    }
    .fee-types .fee-type {
        background-color: ${COLORS.colorGreyLight};
        border-radius: 5px;
        color: ${COLORS.black};
        padding: 3px 5px;
        &.selected {
            color: ${COLORS.white};
            background-color: ${(props: IGlobalStyle) => props.theme.button};
        }
        :last-child {
            margin-left: 5px;
        }
    }
    .force-balance {
        margin-top: 55px;
        color: ${COLORS.newGrey};
    }
    .origin-url {
        position: absolute;
        top: 85px;
    }
    .error-block {
        margin-top: 10px;
    }
    .fastfee-icon {
        margin-right: 5px;
        margin-left: unset;
    }
`;

export const Row = styled.div`
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    .btn-container {
        width: 145px;
        margin: 30px 0px;
        margin-left: inherit;
    }
`;
