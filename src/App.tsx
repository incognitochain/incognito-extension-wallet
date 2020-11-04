import React from 'react';
import styled from 'styled-components';
import withApp from './App.enhance';
import Header from './components/Header/index';
import './reset.css';

interface IProps {}

const Styled = styled.div``;

const App: React.FunctionComponent<IProps> = (props) => {
  return (
    <Styled>
      <div>
        <Header />
      </div>
    </Styled>
  );
};

export default withApp(App);
