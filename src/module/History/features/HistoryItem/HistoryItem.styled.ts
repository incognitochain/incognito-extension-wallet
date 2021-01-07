import styled from 'styled-components';

export const Styled = styled.div`
    .confirm-tx-item {
        display: flex;
        flex-direction: row;
        align-items: 'center';
        margin-bottom: 15px;
        justify-content: space-between;
    }
    .confirm-tx-item label {
        flex-basis: 30%;
    }
    .confirm-tx-item .hook {
        position: relative;
        flex-basis: 65%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .confirm-tx-item .hook span {
        max-width: 135px;
    }
    .toggle-message {
        cursor: pointer;
    }
    .toggle-message .icon {
        height: 10px;
    }
    .message {
        margin-bottom: 15px;
    }
    .arrow-icon {
        right: 0;
    }
    .confirm-tx-item .shield-hook {
        justify-content: unset;
    }
    .shield-hook .btn-retry-shield {
        width: unset;
        margin: 0 5px;
        padding: 0 5px;
        height: 20px;
        line-height: 20px;
        border-radius: 4px;
    }
`;
