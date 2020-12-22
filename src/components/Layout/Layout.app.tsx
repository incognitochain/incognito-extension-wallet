import React from 'react';
import { compose } from 'recompose';
import styled from 'styled-components';

const Styled = styled.div`
    padding: 30px;
`;

interface IProps {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    return (
        <Styled className="app-container">
            <WrappedComponent {...props} />
        </Styled>
    );
};

export default compose<IProps & any, any>(enhance);
