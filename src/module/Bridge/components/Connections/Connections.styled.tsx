import styled from 'styled-components';
import { ITheme } from 'src/styles';

export const Wrapper = styled.div`
    display: inline-flex;
`;

const Button = styled.button`
    padding: 5px 13px;
    border-radius: 8px;
    margin-left: 10px;
    min-width: 125px;
    .chain-icon {
        margin-right: 8px;
        margin-left: 0;
    }
`;

export const AccountBox = styled(Button)`
    background-color: ${({ theme }: { theme: ITheme }) => theme.inverseText};
    color: ${({ theme }: { theme: ITheme }) => theme.text};
    border: ${({ theme }: { theme: ITheme }) => `0.5px solid ${theme.inputBorder}`};
    display: flex;
`;
