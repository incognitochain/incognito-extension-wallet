import React from 'react';
import Spinner from 'react-bootstrap/esm/Spinner';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.div``;

const LoadingTx = (props: IProps) => {
  return (
    <Styled>
      <Spinner animation='border' />
    </Styled>
  );
};

export default LoadingTx;
