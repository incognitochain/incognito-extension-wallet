import styled from 'styled-components';
import { IGlobalStyle } from 'src/styles';

export const Styled = styled.div`
    .token-balance {
        justify-content: center;
        align-items: center;
        display: flex;
        flex-direction: column;
    }
    .token-balance .amount-token {
        margin-bottom: 10px;
    }
    .token-balance .balance-token {
        color: ${(props: IGlobalStyle) => props.theme.text};
    }
    .btn-container {
        margin: 30px 0;
    }
    .hook-container {
        display: flex;
        align-items: flex-start;
    }
    .hook-container > .icon {
        width: 18px;
        height: 18px;
        margin-top: 2px;
        margin-left: unset;
    }
    .hook-container {
        height: 43px;
        > :first-child {
            margin-right: 5px;
        }
    }
    .hook-container .amount-token {
        max-width: 250px;
    }
    .header-title {
        max-width: 200px;
    }
`;
