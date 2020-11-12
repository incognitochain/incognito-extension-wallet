import React from 'react';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.div``;

const Toast = (props: IProps) => {
  return (
    <Styled>
      <p>This is toast</p>
    </Styled>
  );
};

export default Toast;
