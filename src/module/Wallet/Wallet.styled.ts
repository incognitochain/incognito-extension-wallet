import styled from 'styled-components';

export const Styled = styled.div`
    position: relative;
    height: 485px;
    .list-token {
        height: 290px;
        overflow: scroll;
    }
    .list-token .token-container {
        :last-child {
            margin-bottom: 0;
        }
    }
    .total-shield {
        > p {
            :nth-child(2) {
                margin-top: 15px;
            }
        }
        .btn-container {
            margin: 30px 0;
            width: 100%;
        }
    }
    .btn-add-coin {
        position: absolute;
        bottom: 0;
        left: 0;
    }
`;
