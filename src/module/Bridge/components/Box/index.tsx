import styled from 'styled-components';
import { ITheme } from 'src/styles';

export const FieldBorderBox = styled.div`
    height: 50px;
    width: 100%;
    border: ${({ theme }: { theme: ITheme }) => `0.5px solid ${theme.inputBorder}`};
    border-radius: 13px;
    cursor: pointer;
`;
