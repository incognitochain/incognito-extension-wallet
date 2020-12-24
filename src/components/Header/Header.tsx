import React from 'react';
import styled from 'styled-components';
import { FONT_SIZES } from 'src/styles';
import { BtnSelectAccount } from 'src/module/Account/features/SelectAccount';
import { ArrowLeftIcon, RefreshIcon } from 'src/components/Icons';
import withHeader, { IMergeProps } from './Header.enhance';

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
`;

const Header = (props: IMergeProps & any) => {
    const {
        rightHeader,
        selectAccount,
        handleClick,
        renderHeaderTitle,
        refreshPage,
        handleRefreshPage,
        title,
    }: IMergeProps = props;
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
                {refreshPage && (
                    <RefreshIcon
                        className="refresh-icon"
                        onClick={() => {
                            if (typeof handleRefreshPage === 'function') {
                                handleRefreshPage();
                            }
                        }}
                    />
                )}
            </div>
        </Styled>
    );
};

export default withHeader(Header);
