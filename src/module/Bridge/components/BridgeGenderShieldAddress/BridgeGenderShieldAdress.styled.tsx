import styled from 'styled-components';

export const Styled = styled.div`
    p {
        text-align: center;
    }
    .title {
        margin-top: 30px;
    }
    .extra .qrcode-container {
        .label {
            margin-bottom: 15px;
        }
        .copy-wrapper {
            background-color: transparent;
        }
    }
    .extra .hook {
        margin-top: 30px;
        > p {
            margin-bottom: 5px;
        }
    }
    .extra .bottom {
        margin-top: 30px;
        .sub-text {
            margin-bottom: 15px;
        }
    }
    .shield-error {
        .icon {
            margin: auto;
            margin-bottom: 15px;
        }
        .btn-container {
            margin: 30px 0;
        }
    }
    .scroll-view {
        max-height: 420px;
    }
    .loading-icon {
        margin-top: 30px;
    }
`;
