import React from 'react';
import styled from 'styled-components';

const Styled = styled.div`
    padding: 30px;
    width: 100%;
    height: 100%;
`;

interface IProps {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    return (
        <Styled className="app-container">
            <WrappedComponent {...props} />
        </Styled>
    );
};

export default enhance;
