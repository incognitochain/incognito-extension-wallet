import React from 'react';
import styled from 'styled-components';
import { Row } from 'src/components';
import CompanyName from 'src/components/Icons/CompanyName';

const WrapHeader = styled.div`
    position: relative;
    display: flex;
    width: 100vw;
    height: fit-content;
    margin-bottom: 50px;
    .logo {
        margin-top: 36px;
        cursor: pointer;
    }
`;

const Header = React.memo(() => {
    return (
        <WrapHeader>
            <CompanyName
                wrapStyle={{
                    className: 'logo',
                }}
            />
            <Row />
        </WrapHeader>
    );
});

export default Header;
