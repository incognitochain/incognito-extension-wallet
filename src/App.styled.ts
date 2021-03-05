import styled from 'styled-components';
import { ITheme } from 'src/styles';

export const Styled = styled.div`
    .preload-container {
    }
    .lost-network {
        background-color: ${(props: { theme: ITheme }) => props.theme.body};
        color: ${(props: { theme: ITheme }) => props.theme.text};
    }
`;
