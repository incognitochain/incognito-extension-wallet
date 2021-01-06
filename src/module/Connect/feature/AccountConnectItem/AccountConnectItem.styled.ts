import { FONT_SIZES } from 'src/styles';
import styled from 'styled-components';

export const Styled = styled.div`
    &.wrapper {
        margin-top: 30px;
    }
    p.account-name {
        line-height: ${FONT_SIZES.superMedium + 1}px;
    }
    p.account-amount {
        flex-basis: 50%;
    }
    p.payment-address {
        flex-basis: 40%;
    }
    div.wrap-content {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        overflow: hidden;
        margin-top: 10px;
    }
`;
