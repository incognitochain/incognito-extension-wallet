import styled from 'styled-components';
import { FieldBorderBox } from 'src/module/Bridge/components/Box';
import { ITheme } from 'src/styles';

export const Styled = styled(FieldBorderBox)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 14px;
    > div {
        display: flex;
    }
`;

export const Text = styled.p<{ isEmpty: boolean }>`
    color: ${({ theme, isEmpty }: { theme: ITheme; isEmpty: boolean }) => (isEmpty ? theme.subText : theme.text)};
`;
