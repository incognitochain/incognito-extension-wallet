import React from 'react';
import { compose } from 'recompose';
import styled from 'styled-components';

const Styled = styled.div`
  padding: 25px;
`;

interface IProps {}

const enhance = (WrappedComponent: React.FunctionComponent) => (
  props: IProps & any
) => {
  return (
    <Styled>
      <WrappedComponent {...props} />
    </Styled>
  );
};

export default compose<IProps & any, any>(enhance);
