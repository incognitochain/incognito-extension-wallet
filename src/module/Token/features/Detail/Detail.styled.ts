import styled from 'styled-components';
import { IGlobalStyle } from 'src/styles';

export const Styled = styled.div`
    .token-balance {
        justify-content: center;
        align-items: center;
        display: flex;
        flex-direction: column;
    }
    .token-balance .balance-token {
        color: ${(props: IGlobalStyle) => props.theme.text};
    }
    .btn-container {
        margin: 30px 0;
    }
    .amount-token {
        max-width: 250px;
        height: 40px;
        line-height: 40px;
    }
    .header-title {
        max-width: 200px;
    }
    .balance-token {
        margin-top: 5px;
    }
`;
