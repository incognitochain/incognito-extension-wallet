import styled from 'styled-components';

export const Styled = styled.div`
    padding-bottom: 30px;
    .item {
        display: flex;
        margin-top: 20px;
        justify-content: space-between;
        cursor: pointer;
    }
    .item :last-child {
        text-align: right;
    }
    .title {
        max-width: 120px;
        margin-bottom: 5px;
    }
`;
