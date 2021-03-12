import React from 'react';
import styled from 'styled-components';
import CompanyName from 'src/components/Icons/CompanyName';
import { useSelector } from 'react-redux';
import { accountsMetamaskSelector } from 'src/module/Bridge';
import { Connections } from 'src/module/Bridge/components';

const WrapHeader = styled.div`
    position: relative;
    display: flex;
    height: fit-content;
    margin-bottom: 50px;
    margin-right: 157px;
    align-items: center;
    justify-content: space-between;
    .logo {
        margin-top: 36px;
        cursor: pointer;
    }
    .account-row {
        margin-top: 36px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const Header = React.memo(() => {
    const accountsMetamask = useSelector(accountsMetamaskSelector);
    return (
        <WrapHeader>
            <CompanyName wrapStyle={{ className: 'logo' }} />
            <div className="account-row">
                <Connections />
            </div>
        </WrapHeader>
    );
});

export default Header;
