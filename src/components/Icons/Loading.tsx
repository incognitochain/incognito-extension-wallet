import React from 'react';
import Spinner, { SpinnerProps } from 'react-bootstrap/esm/Spinner';
import styled from 'styled-components';

export interface ILoadingIconProps {
    width?: string;
    height?: string;
    spinnerProps?: SpinnerProps;
}

const Styled: any = styled.div`
    position: relative;
    width: ${(props: ILoadingIconProps) => props.width};
    height: ${(props: ILoadingIconProps) => props.height};
    .spinner-border {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
`;

const Loading = (props: ILoadingIconProps) => {
    const { width = '20px', height = '20px', spinnerProps } = props;
    return (
        <Styled width={width} height={height} className="loading-icon">
            <Spinner animation={spinnerProps?.animation || 'border'} {...spinnerProps} />
        </Styled>
    );
};

export default Loading;
