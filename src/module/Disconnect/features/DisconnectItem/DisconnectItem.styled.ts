import { COLORS, FONT_SIZES, IGlobalStyle } from 'src/styles';
import styled from 'styled-components';

export const Styled = styled.div`
    &.wrapper {
        margin-top: 30px;
    }
    p.bottom-status {
        font-size: ${FONT_SIZES.superSmall}px;
        color: ${COLORS.green};
    }
`;

export const Row = styled.div`
    & {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 25px;
        width: 100%;
        &.margin-top {
            margin-top: 10px;
        }
        &.space-between {
            justify-content: space-between;
        }
        &.margin-left {
            margin-left: 5px;
        }
        &.force-height {
            height: 30px;
        }
    }
    p.status {
        padding: 3px 5px;
        background-color: ${(props: IGlobalStyle) => props.theme.button};
        font-size: ${FONT_SIZES.superSmall + 1}px;
        color: ${(props: IGlobalStyle) => props.theme.inverseText};
        border-radius: 5px;
        cursor: pointer;
    }
    p.payment-address {
        max-width: 80px;
    }
`;
