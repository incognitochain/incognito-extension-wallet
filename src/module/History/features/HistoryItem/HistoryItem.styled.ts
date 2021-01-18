import styled from 'styled-components';
import { ITheme } from 'src/styles';

export const Styled = styled.div`
    .history-tx-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 15px;
        justify-content: space-between;
    }
    .history-tx-item label {
        flex-basis: 30%;
    }
    .history-tx-item .hook {
        position: relative;
        flex-basis: 65%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .history-tx-item .hook span {
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
    .history-tx-item .shield-hook {
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
    .message > a {
        color: ${(props: { theme: ITheme }) => props.theme.text};
        display: inline;
        text-decoration-line: underline;
    }
`;
