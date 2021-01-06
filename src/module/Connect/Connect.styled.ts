import { COLORS } from 'src/styles';
import styled from 'styled-components';

export const Styled = styled.div`
    .hook-container {
        margin-bottom: 0px;
        cursor: pointer;
        background-color: red;
    }
    p.original-url {
        margin-bottom: 10px;
        color: ${COLORS.colorGreyBold};
    }
    .check-box-icon {
        width: 18px;
        height: 18px;
        border-radius: 2px;
        border: 1px solid;
        border-color: ${COLORS.newGrey};
    }
    .wrapper-check-box {
        display: flex;
        flex-direction: 'row';
    }
    .account-connect-item {
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
    .checkbox p.fw-medium {
        color: ${COLORS.newGrey};
        font-size: 15px;
        text-align: left;
    }
    .checkbox {
        margin: 30px 0px;
    }
`;
