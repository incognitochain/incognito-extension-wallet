import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Header } from 'src/components';
import { ILanguage } from 'src/i18n';
import { themeSelector, translateSelector } from 'src/module/Configs';
import { IGlobalStyle } from 'src/styles';
import styled from 'styled-components';
import { Amount, Balance, ISelectedPrivacy, selectedPrivacySelector, PerChange } from 'src/module/Token';
import { route as routeTokenInfo } from 'src/module/Token/features/TokenInfo';
import { HistoryList } from 'src/module/History';
import { route as routeSend } from 'src/module/Send';
import { useHistory } from 'react-router-dom';
import { InfoIcon, VerifiedIcon } from 'src/components/Icons';
import { route as routeWallet } from 'src/module/Wallet';
import withDetail, { IMergedProps } from './Detail.enhance';

const Styled = styled.div`
    .token-balance {
        justify-content: center;
        align-items: center;
        display: flex;
        flex-direction: column;
    }
    .token-balance .amount-token {
        margin-bottom: 10px;
    }
    .token-balance .balance-token {
        color: ${(props: IGlobalStyle) => props.theme.text};
    }
    .btn-container {
        margin: 30px 0;
    }
    .hook-container {
        display: flex;
        align-items: flex-start;
    }
    .hook-container > .icon {
        width: 18px;
        height: 18px;
        margin-top: 2px;
        margin-left: unset;
    }
    .hook-container {
        > :first-child {
            margin-right: 5px;
        }
    }
    .hook-container .amount-token {
        max-width: 250px;
    }
    .header-title {
        max-width: 200px;
    }
`;

const TokenBalance = React.memo(() => {
    const selectedPrivacy: ISelectedPrivacy = useSelector(selectedPrivacySelector);
    const { tokenId } = selectedPrivacy;
    return (
        <div className="token-balance">
            <div className="hook-container">
                <Amount tokenId={tokenId} classNameTextCustom="fw-medium fs-avglarge amount-token" showVerifiedToken />
                {selectedPrivacy.isVerified && <VerifiedIcon />}
            </div>
            <div className="hook-container">
                <Balance tokenId={tokenId} classNameTextCustom="balance-token" />
                <PerChange tokenId={tokenId} />
            </div>
        </div>
    );
});

export const GroupButton = React.memo(() => {
    const translate: ILanguage = useSelector(translateSelector);
    const translateDetail = translate.token.detail;
    const history = useHistory();
    const handleSend = () => {
        history.push(routeSend);
    };
    return <Button title={translateDetail.btnSend} onClick={handleSend} />;
});

const Detail = React.memo((props: IMergedProps & any) => {
    const { fetchData }: IMergedProps = props;
    const token = useSelector(selectedPrivacySelector);
    const theme = useSelector(themeSelector);
    const history = useHistory();
    return (
        <Styled theme={theme}>
            <Header
                onGoBack={() => history.push(routeWallet)}
                title={token.name}
                customHeader={<InfoIcon onClick={() => history.push(routeTokenInfo)} />}
                refreshPage
                handleRefreshPage={fetchData}
            />
            <TokenBalance />
            <GroupButton />
            <HistoryList />
        </Styled>
    );
});

export default withDetail(Detail);
