import React from 'react';
import styled from 'styled-components';

const Styled = styled.div`
    width: 100%;
    height: 100%;
`;

interface IProps {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    return (
        <Styled className="layout-container scroll-view">
            <WrappedComponent {...props} />
        </Styled>
    );
};

export default enhance;
