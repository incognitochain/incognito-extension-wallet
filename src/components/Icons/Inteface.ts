// wrapStyle, iconStyle

import React from 'react';
import styled from 'styled-components';

export interface IPathSvg {
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
}

export const Wrapper = styled.div``;

export default interface IConProps {
    svgStyle?: IPathSvg;
    wrapStyle?: React.HTMLAttributes<HTMLDivElement> & any;
}
