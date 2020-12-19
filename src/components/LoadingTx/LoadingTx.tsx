import React from 'react';
import Spinner from 'react-bootstrap/esm/Spinner';
import styled from 'styled-components';

const Styled = styled.div``;

const LoadingTx = () => {
    return (
        <Styled>
            <Spinner animation="border" />
        </Styled>
    );
};

export default React.memo(LoadingTx);
