import React from 'react';
import { ENVS } from 'src/configs';
import styled from 'styled-components';

export interface ILoadingIconProps {
    width?: string;
    height?: string;
    center?: boolean;
}

const Styled: any = styled.div`
    position: relative;
    width: ${(props: ILoadingIconProps) => props.width};
    height: ${(props: ILoadingIconProps) => props.height};
    &.loading-center {
        margin: auto;
    }
    .spinner-border {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
`;

const Loading = (props: ILoadingIconProps) => {
    const { width = '20px', height = '20px', center } = props;
    return (
        <Styled width={width} height={height} className={`loading-icon ${center ? 'loading-center' : ''}`}>
            <img src={`${ENVS.REACT_APP_DOMAIN_URL}/images/icons/loading.gif`} alt="loading" />
        </Styled>
    );
};

export default Loading;
