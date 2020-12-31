import styled from 'styled-components';

export const Styled = styled.div`
    .extra .info-item {
        justify-content: space-between;
        margin-bottom: 15px;
        > :first-child {
            flex-basis: 20%;
            min-width: 100px;
        }
        > :last-child {
            flex-basis: 75%;
            width: 200px;

            > :first-child {
                flex: 1;
            }
        }
    }
    .icon {
        margin-left: 5px;
    }
    .extra .verified-container {
        margin-bottom: 15px;
    }
    .extra .extra-item {
        max-width: 100%;
        p {
            :first-child {
                max-width: calc(100% - 20px);
            }
        }
    }
`;
