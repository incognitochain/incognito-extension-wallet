import styled from 'styled-components';
import { COLORS } from 'src/styles';

export const Styled = styled.div`
    margin-top: 15px;
    .wrapper {
        display: flex;
        flex-direction: row;
        &.large-margin-top {
            margin-top: 25px;
        }
    }
    .input-wrapper {
        position: relative;
        flex: 1;
        > p {
            margin-top: 10px;
        }
    }
    .input-container {
        position: relative;
        height: 40px;
        display: flex;
        flex: 1;
    }
    .sub-title {
        margin-right: 25px;
        margin-top: 10px;
        width: 41px;
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
        width: 100%;
        height: 100%;
        border-radius: 8px;
        padding: 0 10px;
        background-color: ${COLORS.colorGrey};
        color: ${COLORS.black};
        border: solid 0.5px ${COLORS.colorGreyLight};
        :focus {
            border: solid 1px ${COLORS.black};
        }
    }
    .input-wrap-suffix {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 40px;
        flex: 1;
        border-radius: 8px;
        padding: 0 10px;
        background-color: ${COLORS.colorGrey};
        color: ${COLORS.black};
        border: solid 0.5px ${COLORS.colorGreyLight};
    }
    .input-wrap-suffix > input {
        color: ${COLORS.black};
        background-color: ${COLORS.transparent};
    }
    .input-wrap-suffix > p {
        margin-left: 3px;
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

    .align-right {
        > input {
            text-align: right;
            padding-right: 0px;
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
