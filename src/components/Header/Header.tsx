import React from 'react';
import styled from 'styled-components';
import { FONT_SIZES } from 'src/styles';
import { BtnSelectAccount } from 'src/module/Account/features/SelectAccount';
import { ArrowLeftIcon, RefreshIcon, LoadingIcon } from 'src/components/Icons';
import { useSelector } from 'react-redux';
import ConnectStatus from 'src/components/Icons/ConnectStatus';
import withHeader, { IMergeProps } from './Header.enhance';
import { refreshHeaderSelector } from './Header.selector';

const Styled = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 30px 0;
    .left {
        display: flex;
        flex-direction: row;
        align-items: center;
        cursor: pointer;
    }
    .left p.header-title {
        line-height: ${FONT_SIZES.medium + 3}px;
        margin-right: 10px;
    }
    .right {
        margin-left: auto;
    }
    .refresh-container {
        height: 21px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
    }
`;

const Header = (props: IMergeProps & any) => {
    const {
        rightHeader,
        selectAccount,
        handleClick,
        renderHeaderTitle,
        refreshPage,
        connectPage,
        connected,
        onHandleRefreshPage,
        title,
    }: IMergeProps = props;
    const refreshing: boolean = useSelector(refreshHeaderSelector);
    return (
        <Styled className="header">
            {title && (
                <div className="left">
                    <ArrowLeftIcon onClick={handleClick} />
                    {renderHeaderTitle()}
                </div>
            )}
            <div className="right">
                {rightHeader}
                {selectAccount && <BtnSelectAccount />}
            </div>
            {refreshPage && (
                <div className="refresh-container">
                    {connectPage && connected && <ConnectStatus />}
                    {refreshing ? (
                        <LoadingIcon />
                    ) : (
                        <RefreshIcon className="refresh-icon" onClick={onHandleRefreshPage} />
                    )}
                </div>
            )}
        </Styled>
    );
};

export default withHeader(Header);
