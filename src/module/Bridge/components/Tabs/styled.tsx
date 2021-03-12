import styled from 'styled-components';
import { COLORS } from 'src/styles';

export const Button = styled.button<{ selected: boolean }>`
    width: 48.5%;
    height: 50px;
    border-radius: 16px;
    background-color: ${({ selected }: { selected: boolean }) => (selected ? COLORS.black : COLORS.colorGreyLight)};
    color: ${({ selected }: { selected: boolean }) => (selected ? COLORS.white : COLORS.lightGrey23)};
`;
