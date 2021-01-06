import styled from 'styled-components';
import { FONT_SIZES } from 'src/styles';
import { CONSTANT_COLORS } from '../../constants';

export const Styled = styled.div`
    .hook-container {
        margin-bottom: 30px;
    }
    p.title {
        font-weight: 200;
        font-size: ${FONT_SIZES.medium}px;
        line-height: ${FONT_SIZES.medium + 9}px;
        margin-bottom: 10px;
    }
    p.desc {
    }

    .wallet {
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
    }

    .wallet-name {
        font-size: 18px;
        line-height: 24px;
        max-width: 180px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .wallet-reveal {
        border-radius: 5px;
        background-color: ${CONSTANT_COLORS.BLACK};
        color: ${CONSTANT_COLORS.WHITE};
        font-size: 13px;
        padding: 3px 5px;
        cursor: pointer;
    }

    .keychains {
        margin-left: 15px;
    }

    .account-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin: 0;
        cursor: pointer;
        opacity: 0.5;
        p.account-name {
        }
        &.selected {
            opacity: 1;
            font-weight: 500;
        }
        &:not(last-child) {
            margin-bottom: 30px;
        }
    }
    .delete-icon {
        margin-left: 10px;
        margin-top: -2px;
    }
`;
