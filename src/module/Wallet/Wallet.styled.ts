import styled from 'styled-components';

export const Styled = styled.div`
    position: relative;
    height: 485px;
    .list-token {
        height: 262px;
        overflow: scroll;
    }
    .list-token .token-container {
        :last-child {
            margin-bottom: 0;
        }
    }
    .total-shield .btn-container {
        margin: 30px 0;
        width: 100%;
    }
    .total-shield .total-shield-sub {
        justify-content: center;
        margin-top: 5px;
    }
    .btn-add-coin {
        position: absolute;
        bottom: 0;
        left: 0;
    }
`;
