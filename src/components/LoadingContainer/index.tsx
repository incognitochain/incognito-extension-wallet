import React from 'react';
import styled from 'styled-components';
import { LoadingIcon } from 'src/components/Icons';

const Styled = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    justify-content: center;
`;

const LoadingContainer = () => {
    return (
        <Styled className="flex">
            <LoadingIcon />
        </Styled>
    );
};

export default LoadingContainer;
