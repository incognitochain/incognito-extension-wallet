import React from 'react';
import Spinner from 'react-bootstrap/esm/Spinner';
import styled from 'styled-components';

interface IProps {
  animation: 'grow' | 'border';
}

const Styled = styled.div`
  &.spinner-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const SpinnerContainer = (props: IProps) => {
  return (
    <Styled className='spinner-container'>
      <Spinner animation={props?.animation || 'grow'} />
    </Styled>
  );
};

export default SpinnerContainer;
