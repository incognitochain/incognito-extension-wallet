import React from 'react';
import styled from 'styled-components';
import { LoadingIcon } from '../Icons';

const Styled = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

const LoadingContainer = () => {
    return (
        <Styled className="flex">
            <LoadingIcon />
        </Styled>
    );
};

export default LoadingContainer;
