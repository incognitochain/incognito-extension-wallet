import styled from 'styled-components';
import { ITheme, COLORS } from 'src/styles';

export const Wrapper = styled.div`
    max-width: 289px;
    .title1 {
        margin-top: 30px;
        color: ${({ theme }: { theme: ITheme }) => theme.text};
    }
    .title2 {
        margin-top: 15px;
        color: ${({ theme }: { theme: ITheme }) => theme.text};
    }
    .title3 {
        margin-top: 15px;
        color: ${COLORS.lightGrey23};
    }
`;

export const Button = styled.button<{ marginTop: string }>`
    text-decoration: underline;
    margin-top: ${(props: { marginTop: string }) => props.marginTop};
    ::selection {
        background: none;
    }
`;
