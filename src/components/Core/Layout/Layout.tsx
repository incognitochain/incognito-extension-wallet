import React from 'react';
import styled from 'styled-components';
import Header from '../../Header';

interface IProps {
    children: any;
    header?: string;
}

const Styled = styled.div``;

const Layout = (props: IProps) => {
    const { children, header } = props;

    return (
        <Styled className="layout-container">
            {!!header && <Header title={header} />}
            {children}
        </Styled>
    );
};

export default Layout;
