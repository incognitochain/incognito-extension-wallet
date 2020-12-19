import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Styled = styled.div``;

export const NameStyled = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    .verified-icon {
        margin-left: 5px;
    }
`;

export const TextStyled = styled.p``;

export const AmountStyled = styled.div``;

export const BalanceStyled = styled.div`
    .price {
        display: flex;
    }
    .per-change {
        margin-left: 5px;
    }
`;

export const TokenStyled = styled(Link)`
    margin-bottom: 30px;
    .extra {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .extra .extra-item {
        flex: 1 0 auto;
        width: 100%;
        max-width: 45%;
    }
    .extra .extra-item {
        :last-child {
            .text {
                text-align: right;
            }
        }
    }
    .extra-bottom {
        margin-top: 15px;
    }
`;
